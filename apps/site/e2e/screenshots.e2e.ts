/**
 * Capturas de evidência das páginas públicas (desktop 1440 e iPhone 13),
 * com verificação de status HTTP, título único, h1 único e rolagem horizontal.
 * Uso: BASE_URL=http://localhost:3000 node e2e/screenshots.e2e.ts
 */
import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium, devices } = require("playwright");
const BASE = process.env.BASE_URL ?? "http://localhost:3002";
const SHOTS = path.resolve(process.env.SHOTS_DIR ?? "../../docs/reconstruction/screenshots");
mkdirSync(SHOTS, { recursive: true });

const PAGES = [
  "/", "/plataforma", "/modulos", "/modulos/alert", "/varejo", "/industria-distribuidores",
  "/integracoes", "/ecossistema", "/cases", "/conteudos", "/sobre", "/contato", "/comecar",
  "/privacidade", "/termos", "/tecnologia", "/tecnologia/agent", "/tecnologia/iaproc",
  "/tecnologia/bond", "/tecnologia/portal-do-cliente", "/tecnologia/task-web", "/tecnologia/teams",
]; // prettier-ignore

const browser = await chromium.launch();
const titles = new Map<string, string>();
const problems: string[] = [];
for (const [label, opts] of [
  ["desktop", { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }],
  ["mobile", { ...devices["iPhone 13"] }],
  ["tablet", { viewport: { width: 1024, height: 768 }, deviceScaleFactor: 1 }],
] as const) {
  const ctx = await browser.newContext({ ...opts, baseURL: BASE, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  for (const route of PAGES) {
    const res = await page.goto(route, { waitUntil: "load" });
    await page.waitForTimeout(600);
    if (res?.status() !== 200) problems.push(`${label} ${route}: HTTP ${res?.status()}`);
    const h1 = await page.locator("h1").count();
    if (h1 !== 1) problems.push(`${label} ${route}: ${h1} h1`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 1) problems.push(`${label} ${route}: rolagem horizontal de ${overflow}px`);
    if (label === "desktop") titles.set(route, await page.title());
    const name = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
    if (label === "tablet") continue; // só verificações (sem captura)
    await page.screenshot({ path: path.join(SHOTS, `pub-${label}-${name}.png`), fullPage: label === "mobile" ? false : true });
  }
  if (label === "tablet") {
    // nada
  } else if (label === "mobile") {
    await page.goto("/");
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await page.getByRole("button", { name: "Soluções" }).click();
    await page.screenshot({ path: path.join(SHOTS, "pub-mobile-menu.png") });
  } else {
    await page.goto("/");
    await page.getByRole("button", { name: "Soluções" }).hover();
    await page.screenshot({ path: path.join(SHOTS, "pub-desktop-menu.png") });
  }
  await ctx.close();
}
await browser.close();
const unique = new Set(titles.values());
if (unique.size !== titles.size) problems.push("títulos duplicados entre páginas");
console.log(problems.length ? problems.join("\n") : `OK: ${PAGES.length} páginas × 3 viewports (1440, 1024, iPhone 13), títulos únicos`);
assert.equal(problems.length, 0);
