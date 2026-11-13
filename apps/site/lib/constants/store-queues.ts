/**
 * As seis filas da tela inicial do Terus Task e o que cada uma pede ao operador.
 * Fonte: wiki.terus.tec.br/varejo/task (manual público do app, versão de referência 2.3.21),
 * lido em 12/11/2026. Texto resumido, sem acrescentar funcionalidade.
 */
export interface StoreQueue {
  id: string;
  title: string;
  short: string;
  /** Sigla da perda que a fila trata (lp.ts → DORES), quando houver */
  tag?: string;
  what: string;
  steps: string[];
}

export const STORE_QUEUES: StoreQueue[] = [
  {
    id: "coletar",
    title: "Coletar Produtos e Abastecer",
    short: "Produtos que chegaram na loja",
    tag: "CAP",
    what: "Separa no depósito o que chegou e leva para a gôndola. A atividade só termina no abastecimento.",
    steps: [
      "Ler o código do produto no depósito (ou marcar como ausente)",
      "Ir para a loja com o que foi coletado",
      "Abastecer: frente montada, rótulo visível, buraco preenchido",
      "Finalizar o abastecimento — o que já foi feito fica registrado",
    ],
  },
  {
    id: "presenca",
    title: "Verificar Presença e Exposição",
    short: "Pararam de vender ou caíram forte",
    tag: "PSV",
    what: "Vai à gôndola dos produtos sem venda no ciclo ou com queda forte, confirma a exposição e corrige.",
    steps: [
      "Ver por que o item está na fila e quanto pode recuperar",
      "Ir à seção e ler o código de barras",
      "Responder cada item: “Já estava OK” ou “Corrigi”",
      "Foto da exposição corrigida — ou “Ausente na gôndola”",
    ],
  },
  {
    id: "destacar",
    title: "Destacar Ofertas",
    short: "Produtos em oferta agora",
    tag: "PO",
    what: "Coloca a sinalização da oferta que está valendo e confirma o preço.",
    steps: [
      "Localizar o produto na gôndola",
      "Aplicar a sinalização de oferta (cartaz ou etiqueta)",
      "Confirmar que o preço de oferta está visível e correto",
      "Foto da gôndola já destacada",
    ],
  },
  {
    id: "retirar",
    title: "Retirar Destaque de Oferta",
    short: "Produtos que saíram de oferta",
    tag: "SO",
    what: "Tira a sinalização da oferta que acabou e deixa o preço regular visível.",
    steps: [
      "Localizar o produto que saiu de oferta",
      "Remover cartaz ou etiqueta",
      "Confirmar que o preço regular está aplicado e visível",
      "Foto ao final",
    ],
  },
  {
    id: "inventario",
    title: "Inventário",
    short: "Não achado na gôndola nem no depósito",
    what: "Conta o que não foi encontrado nem na exposição nem no estoque da loja.",
    steps: ["Contar o que não foi encontrado nem na gôndola nem no depósito"],
  },
  {
    id: "validade",
    title: "Conferir Validade",
    short: "Maior risco de vencimento",
    what: "Confere o fundo da gôndola dos produtos com maior risco de vencimento.",
    steps: [
      "Ir à seção e ler o produto",
      "Conferir os itens da lista",
      "Informar a quantidade vencida encontrada (0 se nenhuma)",
      "Registrar a foto",
    ],
  },
];

export const RETURN_BANDS = [
  {
    band: "Alto R$",
    text: "Os produtos do topo do retorno. É por aqui que o turno deve começar.",
  },
  { band: "Médio R$", text: "O miolo da fila." },
  {
    band: "Baixo R$",
    text: "Itens de menor retorno. Entram depois que o alto foi feito.",
  },
] as const;
