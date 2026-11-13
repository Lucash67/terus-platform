/**
 * Suporte Anjo: citado no site oficial terustec.com.br (registrado no pacote DX 2.0,
 * doc 03/08). Sem página própria por falta de descrição detalhada na fonte.
 */
export const SUPORTE_ANJO = {
  name: "Suporte Anjo",
  description: "Apoio personalizado, com contato recorrente da equipe Terus.",
} as const;

export const SECURITY_POINTS = [
  {
    title: "Só leitura no ERP da rede",
    description:
      "Nada é gravado, alterado ou apagado no banco do varejo. O usuário de integração tem permissões mínimas.",
  },
  {
    title: "Dados compactados e criptografados",
    description:
      "O Agent compacta e criptografa o resultado das consultas antes de enviá-lo à nuvem da Terus.",
  },
  {
    title: "Sem VPN",
    description:
      "A captura parte de um IP fixo da Terus; o TI libera esse IP no firewall.",
  },
  {
    title: "Credenciais fora do formulário",
    description:
      "O cadastro no site não pede senha nem acesso ao banco. A integração é combinada com o seu TI e a equipe técnica da Terus.",
  },
] as const;
