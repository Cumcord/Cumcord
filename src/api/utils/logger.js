function log(input, color, type) {
  console[type](`%cCumcord%c`, `background-color: ${color}; color: white; border-radius: 4px; padding: 0px 6px 0px 6px; font-weight: bold`, "", ...input);
}

const logger = {
  log: (...input) => {
    log(input, "#7289da", "log")
  },
  error: (...input) => {
    log(input, "red", "error")
  },
  warn: (...input) => {
    log(input, "red", "warn")
  }
};

export default logger;
