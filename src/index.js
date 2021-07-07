import initializeAPI from "./api/initialize";

if (window.cumcord) throw new Error("Cumcord is already injected");

initializeAPI();
