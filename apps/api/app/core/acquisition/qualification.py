"""Qualificação explicável e recomendação de módulos.

Regras puras e determinísticas: o score usa apenas o que a pessoa informou.
Nada é inferido sobre a operação (vendas, ruptura, estoque) — esses dados só
existem depois da integração.

Fonte dos ERPs e dos módulos: wiki.terus.tec.br/varejo (espelhada em
apps/web/lib/constants/modules.ts e site-data.ts).
"""

from dataclasses import dataclass
from typing import Literal

RetailErp = Literal["rms", "consinco", "vr_software", "ciss_poder", "rpinfo", "api_rest"]
SupplierErp = Literal["winthor", "sankhya", "vitsis"]
ErpChoice = Literal[
    "rms",
    "consinco",
    "vr_software",
    "ciss_poder",
    "rpinfo",
    "api_rest",
    "winthor",
    "sankhya",
    "vitsis",
    "outro",
]
Priority = Literal[
    "ruptura",
    "excesso",
    "reposicao",
    "execucao_loja",
    "metas",
    "fornecedores",
    "producao",
    "cd_logistica",
    "exposicao",
]
Timeline = Literal["imediato", "ate_3_meses", "explorando"]
StoresBand = Literal["1", "2-10", "11-50", "51+"]

RETAIL_ERPS: dict[str, str] = {
    "rms": "RMS",
    "consinco": "Consinco",
    "vr_software": "VR Software",
    "ciss_poder": "CISS Poder",
    "rpinfo": "RPInfo",
    "api_rest": "API REST",
}
SUPPLIER_ERPS: dict[str, str] = {"winthor": "Winthor", "sankhya": "Sankhya", "vitsis": "VitSis"}


@dataclass(frozen=True)
class ProfileAnswers:
    erp: ErpChoice
    erp_other: str | None
    stores_band: StoresBand
    priorities: list[Priority]
    has_it_contact: bool
    timeline: Timeline


@dataclass(frozen=True)
class Reason:
    factor: str
    points: int
    explanation: str


@dataclass(frozen=True)
class Qualification:
    score: int
    band: Literal["alta", "media", "inicial"]
    reasons: list[Reason]


def qualify(answers: ProfileAnswers) -> Qualification:
    reasons: list[Reason] = []
    if answers.erp in RETAIL_ERPS:
        reasons.append(
            Reason(
                "erp",
                30,
                f"{RETAIL_ERPS[answers.erp]} está entre os ERPs de varejo documentados na wiki.",
            )
        )
    elif answers.erp in SUPPLIER_ERPS:
        reasons.append(
            Reason(
                "erp",
                25,
                f"{SUPPLIER_ERPS[answers.erp]} é ERP de fornecedor que recebe pedidos via Bond.",
            )
        )
    else:
        reasons.append(
            Reason("erp", 5, "ERP não documentado na wiki — exige avaliação técnica da Terus.")
        )

    store_points = {"1": 10, "2-10": 20, "11-50": 25, "51+": 30}[answers.stores_band]
    reasons.append(
        Reason("porte", store_points, f"Rede informada com {answers.stores_band} loja(s).")
    )

    if answers.priorities:
        points = min(20, 5 * len(answers.priorities))
        reasons.append(
            Reason("prioridades", points, f"{len(answers.priorities)} prioridade(s) declarada(s).")
        )

    if answers.has_it_contact:
        reasons.append(Reason("ti", 10, "Há responsável de TI para conduzir a integração."))
    else:
        reasons.append(Reason("ti", 0, "Sem responsável de TI indicado ainda."))

    timeline_points = {"imediato": 10, "ate_3_meses": 5, "explorando": 0}[answers.timeline]
    timeline_label = {
        "imediato": "imediato",
        "ate_3_meses": "até 3 meses",
        "explorando": "explorando",
    }[answers.timeline]
    reasons.append(Reason("prazo", timeline_points, f"Prazo de início: {timeline_label}."))

    score = min(100, sum(r.points for r in reasons))
    band: Literal["alta", "media", "inicial"] = (
        "alta" if score >= 70 else "media" if score >= 40 else "inicial"
    )
    return Qualification(score=score, band=band, reasons=reasons)


@dataclass(frozen=True)
class Recommendation:
    module: str
    name: str
    reason: str


MODULE_NAMES = {
    "alert": "Terus Alert",
    "order": "Terus Order",
    "task": "Terus Task",
    "strategy": "Terus Strategy",
    "unitization": "Terus Unitization",
    "production": "Terus Production",
    "chain": "Terus Chain",
    "vitrine": "Terus Vitrine",
}

PRIORITY_MODULES: dict[str, list[tuple[str, str]]] = {
    "ruptura": [
        ("alert", "Abre alertas de ruptura e risco de ruptura por loja, seção e comprador."),
        ("task", "Leva a correção para a loja, priorizada pelo valor em R$ a recuperar."),
    ],
    "excesso": [
        ("alert", "Sinaliza excesso e produtos sem giro na mesa do comprador."),
        ("strategy", "Ranking de estoque com o excesso caro no topo."),
    ],
    "reposicao": [
        ("order", "Sugere o pedido de reposição por estoque e venda e envia ao fornecedor."),
    ],
    "execucao_loja": [
        ("task", "App da loja com roteiro guiado e foto de evidência."),
    ],
    "metas": [
        ("strategy", "Metas por comprador, seção e loja; vendas vs. ano anterior."),
    ],
    "fornecedores": [
        ("order", "Pedido aprovado pelo fornecedor entra direto no ERP dele."),
        ("chain", "Score de fornecedores e saúde da integração."),
    ],
    "producao": [
        ("production", "Pedidos, planejamento e estoque da produção própria."),
    ],
    "cd_logistica": [
        ("unitization", "Volumes rastreados do CD até a entrada na loja."),
    ],
    "exposicao": [
        ("vitrine", "Mapa de exposição e replicação de layout entre lojas."),
    ],
}


def recommend(priorities: list[Priority]) -> list[Recommendation]:
    seen: dict[str, Recommendation] = {}
    for priority in priorities:
        for module, reason in PRIORITY_MODULES.get(priority, []):
            if module not in seen:
                seen[module] = Recommendation(module, MODULE_NAMES[module], reason)
    if not seen:
        seen["alert"] = Recommendation(
            "alert",
            MODULE_NAMES["alert"],
            "Ponto de partida: mostra o que está tirando venda hoje.",
        )
    return list(seen.values())
