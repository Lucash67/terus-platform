/**
 * Aplica o tema salvo antes do primeiro paint (evita flash).
 * Dark é o tema padrão da marca; "light" só quando o visitante escolher.
 */
export function ThemeScript() {
  const script = `(function(){try{if(localStorage.getItem("terus-theme")==="light"){document.documentElement.classList.add("light")}}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
