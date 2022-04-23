import findAndPatch from "./findAndPatch";

function injectCSS(css) {
  const style = document.createElement("style");
  style.className = "CUMCORD_INJECTED_CSS";
  style.textContent = css;
  document.head.appendChild(style);

  return (newCss) => {
    if (typeof newCss === "undefined") style.remove();
    else style.textContent = newCss;
  };
}

function unpatchAllCss() {
  for (const style of document.getElementsByClassName("CUMCORD_INJECTED_CSS")) style.remove();
}

export { unpatchAllCss, injectCSS, findAndPatch };
export { instead, before, after, unpatchAll } from "spitroast";
