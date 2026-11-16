# Prévia isolada (não produtiva)

## Disponível agora
- **Prévia da sessão:** o novo site (`apps/site`, porta 3002) roda nesta sessão com a API e
  um banco PostgreSQL de teste (`terus_e2e`, dados sintéticos). O app Claude recebe a porta e
  pode abri-la no painel de prévia. Dura enquanto o container da sessão estiver ativo;
  não é um link público.
- **Galeria visual:** https://claude.ai/artifact/HkmLAhMUZJg5dEks7a9mF8

## Prévia persistente proposta (custo zero, sem tocar na LP)
| Peça | Proposta | Por quê |
|---|---|---|
| Site | **Novo projeto Vercel** `terus-site-preview`, Root Directory `apps/site`, só ambiente Preview, com *Deployment Protection* (Vercel Authentication) ligada | Não mexe no projeto `terus-platform-web` (LP) nem no domínio |
| Variáveis do site | `NEXT_PUBLIC_ONBOARDING_ENABLED=true`, `API_INTERNAL_URL=<URL da API de teste>` | Liga a jornada só na prévia |
| Banco | **Neon** plano gratuito (pela Vercel Marketplace ou direto), projeto `terus-preview` | PostgreSQL 16 gerenciado, sem cartão |
| API | Container FastAPI em serviço com plano gratuito (ex.: Render Free) ou Python na Vercel (exige adaptar o pool de conexões para serverless) | Precisa de processo Python com acesso ao banco |
| Segredos | `DATABASE_URL`, `JWT_PRIVATE_KEY`/`JWT_PUBLIC_KEY` (gerados para a prévia), `COOKIE_SECURE=true`, `ENVIRONMENT=preview` | Nenhum segredo de produção |

### O que você precisa autorizar
1. **Conector Vercel → time `lucash67s-projects`:** abrir o link de consentimento que eu gerar
   (vale 10 minutos) e aprovar. Isso só deixa o conector ler e operar no time; não cria nada.
2. **Criação do projeto `terus-site-preview`** na Vercel (eu peço confirmação antes).
   Atenção: o plano Hobby da Vercel é para uso não comercial; se o time estiver no Hobby,
   confirme se aceita usar para a prévia ou se prefere outro plano/conta.
3. **Conta Neon** (gratuita) para o banco de teste e **um serviço para a API**. Os dois exigem
   cadastro seu; nenhum é contratado por mim.
4. **Chaves da prévia:** quando houver API publicada, eu peço as chaves pelo formulário seguro
   do ambiente, nunca pelo chat.

Nada disso altera a LP, o domínio terus.tec.br ou o projeto de produção.
