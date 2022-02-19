import { findAsync } from "webpackModules"

export default function (moduleFinder, patchCallback) {
  let unpatch;

  const [modPromise, webpackUnpatch] = findAsync(moduleFinder, false)
  patches.push(unpatch)

  modPromise.then((mod) => {
    unpatch = patchCallback(mod)
  })

  return () => {
    webpackUnpatch?.()
    unpatch?.()
  }
}