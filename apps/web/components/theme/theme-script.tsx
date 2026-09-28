/**
 * O site sempre abre no tema claro. O escuro só existe se o visitante
 * alternar na sessão — a próxima carga volta ao claro.
 */
export function ThemeScript() {
  const script = `(function(){document.documentElement.classList.add("light");try{localStorage.setItem("terus-theme","light")}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
