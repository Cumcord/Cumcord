// I sorta hate that this has to be done this way, but esbuild is an interesting beast.

export default function getModules() {
  let modules;

  webpackChunkdiscord_app.push([
    [Math.random().toString(36)],
    {},
    (e) => {
      modules = e;
    },
  ]);

  // no memory leak lole
  webpackChunkdiscord_app.pop();

  return modules.c;
}