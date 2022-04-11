const LAMIVUDINE_URL = "https://raw.githubusercontent.com/Cumcord/Lamivudine/master/src/index.js";

const iReallyHateRollupWarningsGod = eval;

function lamivudineHandler(ev) {
  if (ev.shiftKey && ev.altKey && ev.key === "Q") {
    fetch(LAMIVUDINE_URL)
      .then((response) => response.text())
      .then((text) => iReallyHateRollupWarningsGod(text))
      .catch((error) => console.error(error));
    uninitializeLamivudine();
  }
}

export function initializeLamivudine() {
  document.addEventListener("keydown", lamivudineHandler);
}

export function uninitializeLamivudine() {
  document.removeEventListener("keydown", lamivudineHandler);
}
