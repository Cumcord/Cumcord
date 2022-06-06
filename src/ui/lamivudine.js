const LAMIVUDINE_URL = "https://raw.githubusercontent.com/Cumcord/Lamivudine/master/src/index.js";

const iReallyHateRollupWarningsGod = eval;

function lamivudineHandler(ev) {
  if (!ev.shiftKey || !ev.altKey || ev.key !== "Q") return;

  fetch(LAMIVUDINE_URL)
    .then((r) => r.text())
    .then(iReallyHateRollupWarningsGod, console.error);

  uninitializeLamivudine();
}

export const initializeLamivudine = () => document.addEventListener("keydown", lamivudineHandler);

// this can't be an arrow function because it is hoisted to be usable in the handler
export function uninitializeLamivudine() {
  document.removeEventListener("keydown", lamivudineHandler);
}
