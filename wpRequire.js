// I sorta hate that this has to be done this way, but esbuild is an interesting beast.

/* export default function getModules() {
  let modules = webpackChunkdiscord_app.push([[Symbol()], {}, (e) => e]);
  webpackChunkdiscord_app.pop();
  return modules;
} */

export default webpackChunkdiscord_app.push([[Symbol()], {}, (e) => e]);
webpackChunkdiscord_app.pop();
