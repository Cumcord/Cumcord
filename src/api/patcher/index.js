export { default as findAndPatch } from "./findAndPatch";
export { instead, before, after, unpatchAll } from "spitroast";

export function injectCSS(css) {
  const style = document.createElement("style");
  style.className = "CUMCORD_INJECTED_CSS";
  style.textContent = css;
  document.head.appendChild(style);

  return (newCss) => {
    if (newCss === undefined) style.remove();
    else style.textContent = newCss;
  };
}

export function unpatchAllCss() {
  for (const style of document.getElementsByClassName("CUMCORD_INJECTED_CSS")) style.remove();
}
