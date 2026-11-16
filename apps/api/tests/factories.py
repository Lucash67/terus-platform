import os
import subprocess
import sys
from pathlib import Path
from typing import Any

from httpx import AsyncClient

PASSWORD = "SenhaForte123"


def make_cnpj(base12: str) -> str:
    def dv(base: str, weights: list[int]) -> str:
        r = sum(int(d) * w for d, w in zip(base, weights, strict=True)) % 11
        return "0" if r < 2 else str(11 - r)

    first = dv(base12, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
    return base12 + first + dv(base12 + first, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])


async def register(client: AsyncClient, email: str, **extra: Any) -> dict[str, Any]:
    body = {
        "email": email,
        "full_name": "Pessoa Sintética",
        "password": PASSWORD,
        "accept_terms": True,
        "accept_privacy": True,
        **extra,
    }
    response = await client.post("/v1/auth/register", json=body)
    assert response.status_code == 201, response.text
    return response.json()


def org_body(cnpj: str, name: str = "Rede Sintética Ltda") -> dict[str, Any]:
    return {
        "legal_name": name,
        "trade_name": "Rede Sintética",
        "cnpj": cnpj,
        "segment": "supermercado",
        "size_band": "2-10",
        "city": "Fortaleza",
        "state": "CE",
        "source": {"utm_source": "teste", "cta": "comecar_agora"},
    }


PROFILE = {
    "erp": "consinco",
    "stores_band": "2-10",
    "priorities": ["ruptura", "reposicao"],
    "has_it_contact": True,
    "timeline": "imediato",
}


def create_staff(email: str, role: str = "terus_admin") -> None:
    api_dir = Path(__file__).resolve().parents[1]
    env = {**os.environ, "TERUS_STAFF_PASSWORD": PASSWORD}
    subprocess.run(
        [
            sys.executable,
            "-m",
            "app.cli",
            "create-staff",
            "--email",
            email,
            "--name",
            "Equipe Terus",
            "--role",
            role,
        ],
        cwd=api_dir,
        env=env,
        check=True,
        capture_output=True,
    )
