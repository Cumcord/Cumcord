const getLogFunc =
  (type, color) =>
  (...input) =>
    console[type](
      `%cCumcord%c`,
      `background-color: ${color}; color: white; border-radius: 4px; padding: 0px 6px 0px 6px; font-weight: bold`,
      "",
      ...input,
    );

export const log = getLogFunc("log", "#7289da");
export const warn = getLogFunc("warn", "#debf18");
export const error = getLogFunc("error", "red");
