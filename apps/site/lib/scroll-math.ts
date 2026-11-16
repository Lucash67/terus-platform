export const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

export function smoothstep(from: number, to: number, value: number) {
  const t = clamp01((value - from) / (to - from));
  return t * t * (3 - 2 * t);
}

/** Progresso 0→1 de um trilho com filho sticky de 100vh. */
export function stickyTrackProgress(track: HTMLElement) {
  const rect = track.getBoundingClientRect();
  const travel = rect.height - window.innerHeight;
  return travel > 0 ? clamp01(-rect.top / travel) : 0;
}

/** Rola até o meio do passo `index` de um trilho sticky com `steps` passos. */
export function scrollToTrackStep(
  track: HTMLElement,
  index: number,
  steps: number,
) {
  const top = track.getBoundingClientRect().top + window.scrollY;
  const travel = track.offsetHeight - window.innerHeight;
  window.scrollTo({
    top: top + travel * ((index + 0.5) / steps),
    behavior: "smooth",
  });
}
