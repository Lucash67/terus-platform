/**
 * O site institucional abre no tema escuro (a "sala de controle" da operação).
 * Se o visitante escolheu o claro, a escolha é lembrada neste navegador.
 * Roda antes da pintura para não piscar.
 */
export function ThemeScript() {
  const script = `(function(){try{var t=localStorage.getItem("terus-theme");document.documentElement.classList.toggle("light",t==="light")}catch(e){document.documentElement.classList.remove("light")}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
