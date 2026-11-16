// Copia apps/web/public para apps/site/public (ADR-012: o site reaproveita os assets da LP
// sem duplicá-los no git). Em Node puro para funcionar igual no Windows, Linux e Vercel:
// o comando anterior (`rm -rf public && cp -R ../web/public public`) não existe no shell
// padrão do pnpm no Windows. É chamado explicitamente por dev, build e lint porque o
// pnpm 8 não executa scripts pre*/post* por padrão.
import { cpSync, existsSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.resolve(siteDir, "../web/public");
const target = path.join(siteDir, "public");

if (!existsSync(source)) {
  console.error(`sync-assets: origem não encontrada: ${source}`);
  process.exit(1);
}

rmSync(target, { recursive: true, force: true });
cpSync(source, target, { recursive: true });
console.log(`sync-assets: ${readdirSync(target).length} itens copiados de apps/web/public`);
