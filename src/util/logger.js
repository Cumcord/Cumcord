// This may include error logging, etc, later on
const logger = {
  log: (input) => {
    console.log(
      `%cCumcord%c ${input}`,
      "background-color: #7289da; color: white; border-radius: 4px; padding: 0px 6px 0px 6px; font-weight: bold",
      ""
    );
  },
};

export default logger;
