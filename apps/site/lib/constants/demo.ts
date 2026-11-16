/**
 * Dados 100% FICTÍCIOS para a demonstração interativa do site.
 * Não vêm de nenhum cliente nem de nenhum ERP. Os tipos de alerta e a lógica
 * de priorização por R$ seguem a descrição dos módulos (wiki.terus.tec.br/varejo).
 */

export interface DemoAlert {
  id: string;
  store: "loja-a" | "loja-b";
  type:
    | "Ruptura"
    | "Risco de ruptura"
    | "Sem venda"
    | "Excesso"
    | "Oferta sem destaque";
  product: string;
  section: string;
  /** R$ estimado que a correção recupera (fictício) */
  value: number;
  action: string;
}

export const DEMO_STORES = [
  { id: "loja-a", label: "Loja A (fictícia)" },
  { id: "loja-b", label: "Loja B (fictícia)" },
] as const;

export const DEMO_ALERTS: DemoAlert[] = [
  {
    id: "a1",
    store: "loja-a",
    type: "Ruptura",
    product: "Café torrado 500 g",
    section: "Mercearia",
    value: 420,
    action: "Coletar no depósito e abastecer",
  },
  {
    id: "a2",
    store: "loja-a",
    type: "Oferta sem destaque",
    product: "Sabão em pó 1,6 kg",
    section: "Limpeza",
    value: 310,
    action: "Destacar oferta na gôndola",
  },
  {
    id: "a3",
    store: "loja-a",
    type: "Sem venda",
    product: "Biscoito recheado 140 g",
    section: "Mercearia",
    value: 95,
    action: "Verificar presença e exposição",
  },
  {
    id: "a4",
    store: "loja-a",
    type: "Risco de ruptura",
    product: "Leite UHT 1 L",
    section: "Laticínios",
    value: 680,
    action: "Abastecer antes de zerar",
  },
  {
    id: "a5",
    store: "loja-a",
    type: "Excesso",
    product: "Molho de tomate 340 g",
    section: "Mercearia",
    value: 150,
    action: "Avaliar devolução com contagem cega",
  },
  {
    id: "b1",
    store: "loja-b",
    type: "Ruptura",
    product: "Arroz tipo 1 5 kg",
    section: "Mercearia",
    value: 910,
    action: "Coletar no depósito e abastecer",
  },
  {
    id: "b2",
    store: "loja-b",
    type: "Sem venda",
    product: "Shampoo 350 ml",
    section: "Higiene",
    value: 120,
    action: "Verificar presença e exposição",
  },
  {
    id: "b3",
    store: "loja-b",
    type: "Oferta sem destaque",
    product: "Refrigerante 2 L",
    section: "Bebidas",
    value: 260,
    action: "Destacar oferta na gôndola",
  },
  {
    id: "b4",
    store: "loja-b",
    type: "Risco de ruptura",
    product: "Óleo de soja 900 ml",
    section: "Mercearia",
    value: 540,
    action: "Abastecer antes de zerar",
  },
];

export function priorityOf(value: number): "Alto" | "Médio" | "Baixo" {
  if (value >= 500) return "Alto";
  if (value >= 200) return "Médio";
  return "Baixo";
}
