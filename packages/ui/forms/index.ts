/**
 * Primitivos de formulário do design system (`@terus/ui/forms`).
 * Ficam fora de `src/` de propósito: a LP (apps/web) varre `packages/ui/src` no
 * Tailwind e importa `@terus/ui`; assim estes acréscimos não alteram o build da LP.
 */
export { Textarea, type TextareaProps } from "./textarea";
export { Checkbox, type CheckboxProps } from "./checkbox";
