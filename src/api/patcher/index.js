import getPatchFunc from "./getPatchFunc";
import { unpatch, unpatchAll } from "./unpatch";

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
  for (const style of document.querySelectorAll(".CUMCORD_INJECTED_CSS"))
    style.remove();
}

const before = getPatchFunc("before");
const instead = getPatchFunc("instead");
const after = getPatchFunc("after");

export { instead, before, after, unpatchAll, unpatchAllCss, injectCSS };
