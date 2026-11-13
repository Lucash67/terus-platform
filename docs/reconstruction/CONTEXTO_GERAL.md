# Contexto geral — Terus Digital Experience 2.0

Situação em 13/11/2026. Este documento resume tudo o que foi recebido, criado e publicado, onde
cada coisa está e como retomar o trabalho em qualquer computador ou sessão.

---

## 1. O que foi recebido

| Item | Onde está |
|---|---|
| Pacote "TERUS DIGITAL EXPERIENCE 2.0 — PACOTE COMPLETO" (9 documentos: 00 a 08) | Pasta `pacote-original/` neste ZIP |
| Pedido da fase 1: reconstruir o site institucional e criar o Self Onboarding 2.0 real | Conversa com o Claude (sessão na nuvem) |
| Pedido da fase 2: Draft PR, CI, auditoria da LP, acabamento visual, páginas de soluções, Lighthouse/acessibilidade, prévia, galeria | Conversa com o Claude |

Regras que valeram o tempo todo: não mexer em produção, não fazer merge no `main`, não alterar
bancos ou serviços reais, não contratar nada pago, não apresentar funcionalidade simulada como real.

---

## 2. Onde as coisas estão

### No GitHub (fonte de verdade do código)
| Item | Link / referência |
|---|---|
| Repositório | https://github.com/Lucash67/terus-platform |
| Branch de trabalho | `claude/tender-gauss-ld4sso` |
| Draft PR (não fazer merge) | https://github.com/Lucash67/terus-platform/pull/1 |
| CI | Último run (#104, commit `c8bfae7`) verde: 7 de 7 jobs |
| Comentário no PR | Explica a falha intermitente do build da LP (fontes do Google) |

### Na Vercel
| Item | Situação |
|---|---|
| Projeto `terus-platform-web` (LP, root `apps/web`) | Produção a partir do `main`. **Não foi alterado.** |
| Prévia automática desta branch | https://terus-platform-web-git-claude-tender-a8b745-lucash67s-projects.vercel.app — mostra a **LP** (idêntica ao `main`), não o site novo |
| Prévia do site novo (`apps/site`) | **Não existe ainda.** Depende das autorizações em `docs/reconstruction/PREVIEW.md` |
| Conector Vercel do Claude | Sem acesso ao time `lucash67s-projects` (falta aprovar o link de consentimento) |

### Em claude.ai
| Item | Link |
|---|---|
| Galeria de comparação (site antigo × LP × site novo) | https://claude.ai/artifact/HkmLAhMUZJg5dEks7a9mF8 (privada; cópia offline em `galeria-terus-dx2.html` neste ZIP) |
| Ambiente de nuvem `terus-platform` | Ambiente pessoal com acesso a wiki.terus.tec.br, terustec.com.br, terus.tec.br e terus-platform-web.vercel.app. Fica salvo para as próximas sessões na nuvem |

### Só na sessão na nuvem (some quando ela for encerrada)
- Banco PostgreSQL de teste (dados 100% sintéticos) e os servidores locais de prévia (porta 3002).
- Nada disso precisa ser preservado: tudo se recria com os passos da seção 6.

### No seu computador
- Pasta `terus-site-institucional` adicionada ao Remote Control do Claude Desktop. Aparece para a
  sessão na nuvem, mas marcada como "não disponível" (o recurso ainda não está liberado para a conta).

---

## 3. O que foi criado (11 commits sobre o `main@f5f525d`)

| Commit | O que fez |
|---|---|
| `b2e7e68` | API real (FastAPI + PostgreSQL): conta, sessão segura, organizações, qualificação, solicitações, painel e auditoria |
| `eda1763` | Jornada de cadastro no front: conta, empresa, operação, proposta, portal e painel |
| `f98bcb0` | Site institucional ampliado e testes E2E |
| `f971eb0` | Documentação da fase 1 |
| `6f32eeb` | **Isolamento da LP:** todo o trabalho novo foi para `apps/site`; `apps/web` voltou a ser idêntico ao `main` |
| `0ed1eff` | Páginas de tecnologia (Agent, IAproc, Bond, Portal do Cliente, Task Web, Teams) e atualização de segurança da API |
| `7adb4ee` | Menu sem transbordar entre 1024 e 1279 px, contraste AA, acessibilidade |
| `d813d39` | Documentação da fase 2 (auditoria da LP, comparação visual, QA, prévia, ADR-012) |
| `673775b` | Fontes servidas localmente no site novo |
| `bdecc82` | CI com build separado por app |
| `c8bfae7` | Resultado final do CI na documentação |

Estrutura do monorepo depois do trabalho:

```
apps/web     LP comercial em produção — idêntica ao main (não mexer sem aprovação)
apps/site    Novo site institucional + Self Onboarding 2.0 (porta 3002)
apps/api     API FastAPI + PostgreSQL (porta 8000)
packages/ui/forms                     Textarea e Checkbox (fora do que a LP usa)
packages/schemas/self-onboarding.ts   Validação da jornada
docs/reconstruction/                  Relatórios, auditorias e evidências
docs/decisions/ADR-010, 011, 012      Decisões que aguardam sua aprovação
```

---

## 4. Resultados verificados

| Verificação | Resultado |
|---|---|
| LP preservada | Código idêntico ao `main`; HTML igual; 34 de 34 telas idênticas pixel a pixel |
| CI | 7 de 7 jobs verdes |
| Testes da API | 26 passando; sem vulnerabilidades conhecidas (pip-audit) |
| E2E da jornada de cadastro | 11 de 11 cenários |
| Acessibilidade (axe) | LP: 487 ocorrências; site novo: 15 (decorativas) |
| Lighthouse | Acessibilidade 100 nas páginas novas; performance mobile da home 81 (LP: 88) |

Detalhes: `docs/reconstruction/QA_REPORT.md` e `LP_PRESERVATION_AUDIT.md`.

---

## 5. Decisões e pendências suas

1. **Aprovar os ADRs 010, 011 e 012** (cadastro novo, testes E2E, site isolado em `apps/site`).
2. **Fontes da LP:** o build da LP às vezes falha ao baixar fontes do Google. Pode derrubar um deploy
   de produção. Correção pronta para aplicar se aprovar.
3. **WhatsApp divergente:** terus.tec.br mostra (85) 9629-0044; o `main` usa (85) 99738-4940.
4. **Next.js 14:** tem avisos de segurança resolvidos só na 15.5 (LP e site novo). Migração precisa de ADR.
5. **Home do site novo:** ainda repete o topo da LP. Decidir se terá abertura própria.
6. **Prévia permanente:** aprovar o acesso do conector Vercel, autorizar um projeto separado
   (`terus-site-preview`) e criar contas gratuitas para banco (Neon) e API. Ver `PREVIEW.md`.
7. **Jurídico:** revisar Privacidade e Termos; informar CNPJ, endereço e contato do DPO.
8. **Terus Admin Portal:** a wiki diz que cadastro, onboarding e integrações ficam lá. Definir a integração.
9. **Suporte Anjo:** página própria depende de descrição oficial.

Lista completa: `docs/reconstruction/OPEN_DEPENDENCIES.md`.

---

## 6. Como retomar

### Rodar no seu computador
Pré-requisitos: Node 18+, pnpm 8, Python 3.12+, Poetry, PostgreSQL 16. Use uma pasta **fora do
OneDrive** (ex.: `C:\dev\terus-platform`), porque o build gera dezenas de milhares de arquivos.

```bash
git clone https://github.com/Lucash67/terus-platform.git
cd terus-platform
git checkout claude/tender-gauss-ld4sso
pnpm install

# API (terminal 1)
cd apps/api
poetry install
export DATABASE_URL=postgresql+asyncpg://postgres@127.0.0.1:5432/terus_dev
poetry run alembic upgrade head
TERUS_STAFF_PASSWORD='TroqueEsta123' poetry run python -m app.cli create-staff \
  --email voce@empresa.com --name "Seu nome" --role terus_admin
poetry run uvicorn app.main:app --port 8000

# Site novo (terminal 2)
cd apps/site
NEXT_PUBLIC_ONBOARDING_ENABLED=true API_INTERNAL_URL=http://127.0.0.1:8000 pnpm dev
```

Abra http://localhost:3002 (painel: http://localhost:3002/admin). No Windows, use WSL ou Git Bash
para os comandos acima.

Se usar o código deste ZIP em vez do `git clone`, rode `git init` só se quiser versionar; para
continuar no mesmo PR, prefira clonar do GitHub.

### Retomar com o Claude (qualquer sessão)
Cole esta mensagem numa sessão nova (local ou na nuvem) com o repositório disponível:

> Continue o projeto Terus Digital Experience 2.0. Use o repositório `Lucash67/terus-platform`,
> branch `claude/tender-gauss-ld4sso`, Draft PR #1. Leia primeiro `CLAUDE.md`,
> `docs/reconstruction/CONTEXTO_GERAL.md`, `FINAL_REPORT.md` e `OPEN_DEPENDENCIES.md`.
> Regras: não alterar `apps/web` (LP em produção) sem minha aprovação, não fazer merge no `main`,
> não mexer em produção, bancos ou serviços reais, não apresentar funcionalidade simulada como real.
> Próximo passo: [descreva aqui o que quer fazer].
