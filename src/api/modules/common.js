import { findByProps, batchFind } from "./webpack";

export const [
  constants,
  channels,
  Flux,
  FluxDispatcher,
  [, i18n],
  React,
  ReactDOM,
  Redux,
  zustand,
  highlightjs,
] = batchFind(({ findByProps, findByPropsAll, find }) => {
  findByProps("API_HOST");
  findByProps("getVoiceChannelId");
  findByProps("connectStores");
  findByProps("_currentDispatchActionType");
  findByPropsAll("_requestedLocale");
  findByProps("createElement");
  findByProps("hydrate");
  findByProps("createStore");
  find(
    (m) =>
      typeof m == "function" &&
      m.toString().includes("[useStore, api] = create() is deprecated and will be removed in v4"),
  );
  findByProps("initHighlighting");
});

export const uuid = {
  v4: findByProps("v1"),
};
