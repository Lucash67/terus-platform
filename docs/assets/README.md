# Terus Platform — Arquivos Institucionais

> Repositório oficial de registros visuais, vídeos e apresentações da Terus Platform.  
> **Versão baseline:** v0.4.0 — Institutional Layer Complete

Este diretório forma o **histórico permanente** da evolução visual e institucional do projeto. Os arquivos binários (PNG, MP4, PDF, PPTX) são adicionados **manualmente** após cada release — a estrutura de pastas e índices é mantida no repositório.

---

## Estrutura oficial

```
docs/assets/
├── README.md                 ← este arquivo (convenções)
├── screenshots/
│   ├── v0.4.0/
│   │   ├── README.md
│   │   └── INDEX.md          ← catálogo de capturas
│   ├── v0.5.0/               ← futuras versões
│   └── ...
├── videos/
│   ├── v0.4.0/
│   │   ├── README.md
│   │   └── INDEX.md          ← catálogo de vídeos
│   ├── v0.5.0/
│   └── ...
└── presentations/
    ├── README.md
    ├── v0.4.0/               ← decks e slides por versão
    └── ...
```

---

## Convenção por versão

Toda **grande versão** da Terus Platform deve possuir obrigatoriamente:

| Artefato | Localização |
|----------|-------------|
| Documentação técnica | `docs/project-state.md`, `docs/architecture.md` |
| Release notes | `docs/releases/v{version}-*.md` |
| Screenshots oficiais | `docs/assets/screenshots/v{version}/` + `INDEX.md` |
| Vídeos oficiais | `docs/assets/videos/v{version}/` + `INDEX.md` |
| Apresentações utilizadas | `docs/assets/presentations/v{version}/` |
| Changelog | Entrada em [`CHANGELOG.md`](../../CHANGELOG.md) |
| Tag Git | `v{version}` no repositório |
| Release GitHub | Release publicada com notas e links |

Esses registros compõem a **baseline permanente** de cada marco e não devem ser removidos sem aprovação do Tech Lead.

---

## Nomenclatura de arquivos

### Screenshots

```
{ordem}-{contexto}.png
```

Exemplos: `01-home.png`, `06-modulo-order.png`, `12-mobile-home.png`

- Formato: **PNG** (preferencial) ou WebP
- Resolução desktop: **1920×1080** ou viewport completo
- Resolução mobile: **390×844** (iPhone 14 Pro equivalente)
- Capturar sempre a **URL de produção** oficial

### Vídeos

```
{ordem}-{contexto}.mp4
```

Exemplos: `01-overview.mp4`, `04-demo-flow.mp4`

- Formato: **MP4** (H.264)
- Resolução recomendada: **1920×1080**, 30 fps
- Duração orientativa: 1–3 min por vídeo temático
- **Git LFS:** arquivos em `docs/assets/videos/**/*.mp4` (limite GitHub: 100 MB por arquivo)

### Apresentações

```
{data}-{audiencia}-{titulo}.{ext}
```

Exemplos: `2026-07-01-executivo-terus-platform-v0.4.0.pdf`

- Formatos aceitos: **PDF** (preferencial para arquivo), PPTX (editável)
- Incluir versão e data no nome do arquivo

---

## Processo de adição manual

1. Gravar capturas ou vídeos conforme o `INDEX.md` da versão
2. Salvar arquivos na pasta `v{version}/` correspondente
3. Atualizar o `INDEX.md` marcando status de cada item (✅ adicionado / ⏳ pendente)
4. Commit dedicado: `docs(assets): add v{version} screenshots` (ou `videos` / `presentations`)
5. Atualizar [`docs/project-state.md`](../project-state.md) — seção **Version Archives**
6. Criar tag Git e Release GitHub quando todos os artefatos estiverem completos

---

## Versões registradas

| Versão | Screenshots | Vídeos | Apresentações | Tag Git |
|--------|-------------|--------|---------------|---------|
| **v0.4.0** | [`screenshots/v0.4.0/`](screenshots/v0.4.0/) · 51 capturas | [`videos/v0.4.0/`](videos/v0.4.0/) · 1 tour | [`presentations/v0.4.0/`](presentations/v0.4.0/) | ✅ `v0.4.0` |

---

## Referências

| Documento | Conteúdo |
|-----------|----------|
| [`docs/releases/v0.4.0-institutional-layer-complete.md`](../releases/v0.4.0-institutional-layer-complete.md) | Release notes v0.4.0 |
| [`docs/project-state.md`](../project-state.md) | Version Archives |
| [`CHANGELOG.md`](../../CHANGELOG.md) | Changelog oficial |
| [`docs/project-roadmap.md`](../project-roadmap.md) | Histórico de fases |
