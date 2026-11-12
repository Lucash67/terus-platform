/**
 * E2E do Self Onboarding 2.0 contra a stack real (Next + FastAPI + PostgreSQL).
 *
 * Uso:  BASE_URL=http://localhost:3000 STAFF_EMAIL=... STAFF_PASSWORD=... \
 *       node e2e/journey.e2e.ts
 *
 * Dados 100% sintéticos (CNPJ gerado, e-mails example.com).
 * Executado com o Node 22 (type stripping) e o Playwright pré-instalado.
 */
import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium, devices } = require("playwright");

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const STAFF_EMAIL = process.env.STAFF_EMAIL ?? "";
const STAFF_PASSWORD = process.env.STAFF_PASSWORD ?? "";
const SHOTS = path.resolve(process.env.SHOTS_DIR ?? "../../docs/reconstruction/screenshots");
mkdirSync(SHOTS, { recursive: true });

const RUN = Date.now().toString().slice(-6);
const PASSWORD = "SenhaForte123";

function cnpj(base12: string): string {
  const dv = (b: string, w: number[]) => {
    const r = w.reduce((s, x, i) => s + Number(b[i]) * x, 0) % 11;
    return r < 2 ? "0" : String(11 - r);
  };
  const a = dv(base12, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return base12 + a + dv(base12 + a, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
}

const results: { name: string; ok: boolean; error?: string }[] = [];
async function step(name: string, fn: () => Promise<void>) {
  try {
    await fn();
    results.push({ name, ok: true });
    console.log(`✔ ${name}`);
  } catch (error) {
    results.push({ name, ok: false, error: String(error) });
    console.error(`✘ ${name}\n  ${String(error).split("\n")[0]}`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- módulo global sem tipos no workspace
type Page = any;

async function shot(page: Page, name: string) {
  await page.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage: true });
}

const browser = await chromium.launch();
const desktop = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, baseURL: BASE };
const userA = { email: `dona.${RUN}@example.com`, cnpj: cnpj(`5${RUN}0001`.padEnd(12, "1").slice(0, 12)) };
const userB = { email: `outra.${RUN}@example.com`, cnpj: cnpj(`6${RUN}0001`.padEnd(12, "2").slice(0, 12)) };
let tenantA = "";

const ctxA = await browser.newContext(desktop);
const page = await ctxA.newPage();

await step("1. Home → módulo → Começar agora", async () => {
  await page.goto("/");
  await shot(page, "01-home-desktop");
  await page.goto("/modulos/alert");
  await page.getByRole("link", { name: /começar agora/i }).first().click();
  await page.waitForURL(/\/(comecar|criar-conta)/);
  if (page.url().includes("/comecar")) {
    await shot(page, "02-comecar-desktop");
    await page.getByRole("link", { name: /criar conta/i }).first().click();
  }
  await page.waitForURL(/\/criar-conta/);
});

await step("9a. Formulário de conta inválido mostra erros claros", async () => {
  if (!page.url().includes("/criar-conta")) await page.goto("/criar-conta");
  await page.getByRole("button", { name: /criar conta e continuar/i }).click();
  await page.getByText("Informe seu nome completo.").waitFor();
  await page.getByText("Aceite os Termos de Uso para continuar.").waitFor();
  await shot(page, "03-conta-erros");
});

await step("2. Criar conta (sessão por cookie HttpOnly)", async () => {
  await page.getByLabel("Nome completo").fill("Dona Sintética");
  await page.getByLabel("E-mail corporativo").fill(userA.email);
  await page.getByLabel("Telefone").fill("85999990000");
  await page.getByLabel("Senha").fill(PASSWORD);
  await page.getByRole("checkbox").nth(0).check();
  await page.getByRole("checkbox").nth(1).check();
  await page.getByRole("button", { name: /criar conta e continuar/i }).click();
  await page.waitForURL(/\/onboarding\/empresa/);
  const cookies = await ctxA.cookies();
  const at = cookies.find((c: { name: string }) => c.name === "terus_at");
  assert.ok(at?.httpOnly, "cookie de acesso deve ser HttpOnly");
});

await step("9b + 3. CNPJ inválido é recusado; empresa cadastrada", async () => {
  await page.getByLabel("Razão social").fill("Rede Sintética E2E Ltda");
  await page.getByLabel("Nome fantasia").fill(`Rede E2E ${RUN}`);
  await page.getByLabel("CNPJ").fill("11222333000100");
  await page.getByLabel("Segmento").selectOption("supermercado");
  await page.getByLabel("Número de lojas / unidades").selectOption("2-10");
  await page.getByRole("button", { name: /salvar e continuar/i }).click();
  await page.getByText("CNPJ inválido. Confira os 14 dígitos.").waitFor();
  await page.getByLabel("CNPJ").fill(userA.cnpj);
  await page.getByLabel("Cidade").fill("Fortaleza");
  await page.getByLabel("UF").selectOption("CE");
  await shot(page, "04-empresa");
  await page.getByRole("button", { name: /salvar e continuar/i }).click();
  await page.waitForURL(/\/onboarding\/perfil/);
});

await step("4. Qualificação (ERP, prioridades, prazo)", async () => {
  await page.getByLabel("ERP usado hoje").selectOption("consinco");
  await page.getByText("Ruptura de gôndola").click();
  await page.getByText("Reposição e pedidos").click();
  await page.getByLabel("Quando quer começar?").selectOption("imediato");
  await page.getByText(/temos uma pessoa de TI/i).click();
  await shot(page, "05-perfil");
  await page.getByRole("button", { name: /ver recomendação/i }).click();
  await page.waitForURL(/\/onboarding\/solicitacao/);
  await page.getByText("Terus Alert").first().waitFor();
  await page.getByText("Terus Order").first().waitFor();
});

await step("5. Solicitação de proposta gravada no servidor", async () => {
  await page.getByLabel("Mensagem para a equipe").fill("Queremos começar por duas lojas (teste E2E).");
  await shot(page, "06-recomendacao");
  await page.getByRole("button", { name: /enviar solicitação/i }).click();
  await page.waitForURL(/\/portal/);
  await page.getByText("Proposta solicitada").first().waitFor();
  await page.getByText(/ainda não configurado/i).first().waitFor();
  const journey = await page.evaluate(async () => {
    const r = await fetch("/api/v1/organizations", { credentials: "same-origin" });
    return r.json();
  });
  tenantA = journey.items[0].organization.id;
  assert.equal(journey.items[0].status, "proposal_requested");
  await shot(page, "07-portal");
});

await step("10. Dependências externas não aparecem como concluídas", async () => {
  const impl = page.locator("section", { hasText: "Implantação (próximas etapas)" });
  await impl.getByText("Não configurado").first().waitFor();
  assert.equal(await impl.getByText("Concluído", { exact: true }).count(), 0);
});

await step("6. Logout → login em outro dispositivo → progresso íntegro", async () => {
  await page.getByRole("button", { name: "Sair" }).click();
  await page.waitForURL(/\/entrar/);
  const revoked = await page.evaluate(async () => (await fetch("/api/v1/organizations")).status);
  assert.equal(revoked, 401);
  const phone = await browser.newContext({ ...devices["iPhone 13"], baseURL: BASE });
  const m = await phone.newPage();
  await m.goto("/entrar");
  await shot(m, "08-entrar-mobile");
  await m.getByLabel("E-mail").fill(userA.email);
  await m.getByLabel("Senha").fill(PASSWORD);
  await m.getByRole("button", { name: "Entrar" }).click();
  await m.waitForURL(/\/portal/);
  await m.getByText("Proposta solicitada").first().waitFor();
  await m.getByText("Consinco").waitFor();
  await shot(m, "09-portal-mobile");
  await phone.close();
});

await step("8. Outra organização não acessa os dados", async () => {
  const ctxB = await browser.newContext(desktop);
  const b = await ctxB.newPage();
  await b.goto("/criar-conta");
  await b.getByLabel("Nome completo").fill("Outra Pessoa");
  await b.getByLabel("E-mail corporativo").fill(userB.email);
  await b.getByLabel("Senha").fill(PASSWORD);
  await b.getByRole("checkbox").nth(0).check();
  await b.getByRole("checkbox").nth(1).check();
  await b.getByRole("button", { name: /criar conta e continuar/i }).click();
  await b.waitForURL(/\/onboarding\/empresa/);
  const probe = await b.evaluate(async (id: string) => {
    const r = await fetch(`/api/v1/organizations/${id}`);
    const admin = await fetch("/api/v1/admin/leads");
    return { org: r.status, admin: admin.status };
  }, tenantA);
  assert.deepEqual(probe, { org: 404, admin: 403 });
  await b.goto("/admin");
  await b.getByText("Área restrita").waitFor();
  await ctxB.close();
});

await step("7. Equipe Terus vê e gerencia a solicitação", async () => {
  assert.ok(STAFF_EMAIL && STAFF_PASSWORD, "STAFF_EMAIL/STAFF_PASSWORD obrigatórios");
  const ctxS = await browser.newContext(desktop);
  const s = await ctxS.newPage();
  await s.goto("/entrar");
  await s.getByLabel("E-mail").fill(STAFF_EMAIL);
  await s.getByLabel("Senha").fill(PASSWORD === STAFF_PASSWORD ? PASSWORD : STAFF_PASSWORD);
  await s.getByRole("button", { name: "Entrar" }).click();
  await s.waitForURL(/\/admin/);
  await s.getByLabel("Buscar").fill(`Rede E2E ${RUN}`);
  await s.getByRole("button", { name: "Buscar" }).click();
  await s.getByText(userA.email).waitFor();
  await shot(s, "10-admin-leads");
  await s.getByText(`Rede E2E ${RUN}`).first().click();
  await s.waitForURL(/\/admin\/leads\//);
  await s.getByText(/score/i).first().waitFor();
  await s.getByLabel("Mover para").selectOption("in_review");
  await s.getByLabel("Nota (visível ao cliente)").fill("Recebemos e estamos analisando.");
  await s.getByRole("button", { name: /confirmar: em análise/i }).click();
  await s.getByText("Recebemos e estamos analisando.").waitFor();
  await shot(s, "11-admin-lead");
  await ctxS.close();
});

await step("Recuperação de acesso informa que o e-mail não está configurado", async () => {
  await page.goto("/recuperar-acesso");
  await page.getByLabel("E-mail da conta").fill(userA.email);
  await page.getByRole("button", { name: /recuperar acesso/i }).click();
  await page.getByText("Envio de e-mail não configurado").waitFor();
});

await browser.close();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} cenários passaram`);
if (failed.length) process.exit(1);
