import { findByProps } from "webpackModules";
import { after } from "patcher";
import { logger } from "utils";

const commandsModule = findByProps("queryCommands");
const commandDiscovery = findByProps("useApplicationCommandsDiscoveryState");
const { sendMessage } = findByProps("sendMessage");
const { createBotMessage } = findByProps("createBotMessage");
const { receiveMessage } = findByProps("receiveMessage");

const applicationId = "917806991081099275";
const appIconId = "2d179b0c17f137125df3f01949cb0e5f";
const botIconId = "f76f807bfc5692f3f14d1935f063d64b";

const cumcordSection = {
  id: applicationId,
  icon: appIconId,
  name: "Cumcord",
  type: 1,
};

const commands = [];
const typeMap = {
  string: 3,
  int: 4,
  bool: 5,
  user: 6,
  channel: 7,
  role: 8,
};

function initializeCommands() {
  after("queryCommands", commandsModule, (_, resp) => {
    return [...resp, ...commands];
  });

  after("useApplicationCommandsDiscoveryState", commandDiscovery, (_, resp) => {
    if (commands.length > 0) {
      // todo: make the check a function lol
      if (!resp.discoverySections.find((section) => section.id === applicationId)) {
        resp.discoverySections.push({
          data: commands,
          section: cumcordSection,
          key: applicationId,
        });

        resp.sectionsOffset.push(commands.length);

        resp.discoveryCommands = [...resp.discoveryCommands, ...commands];
      }

      if (!resp.applicationCommandSections.find((section) => section.id === applicationId)) {
        resp.applicationCommandSections.push(cumcordSection);
      }
    }
  });
}

function addCommand({ name, description, args, handler }) {
  // Add Cumcord section to command list

  // Abstraction goes here!
  const commandObj = {
    applicationId,
    type: 0,
    target: 1,
    description,
    name,
    id: "CUMCORD_COMMAND",
  };

  if (args) {
    commandObj.options = args.map((arg) => {
      if (!arg.type) {
        arg.type = "string";
      }

      const newArg = { ...arg };

      newArg.type = typeMap[arg.type];
      newArg.required = newArg.required === undefined ? true : newArg.required;
      return newArg;
    });
  }

  (commandObj.execute = (opts, ctx) => {
    if (!handler) return;

    const handledOpts = {};

    if (args) {
      for (const opt of opts) {
        handledOpts[opt.name] = opt.value;
      }
    }

    // We do this like this to prevent the Discord UI from freezing up when an async command takes a while
    (async () => {
      try {
        const resp = await handler({ args: handledOpts, ...ctx }, (input) => {
          let msg = createBotMessage(ctx.channel.id);

          msg.author.username = "Cumcord";
          msg.author.avatar = botIconId;
          msg.author.id = applicationId;

          if (typeof input === "string") {
            msg.content = input;
          } else {
            msg = { ...msg, ...input };
          }

          receiveMessage(msg.channel_id, msg);
        });

        if (resp) {
          switch (typeof resp) {
            case "string":
              sendMessage(ctx.channel.id, {
                content: resp,
                validNonShortcutEmojis: [] /* no idea. */,
              });
              break;
            case "undefined":
              break;
            default:
              sendMessage(ctx.channel.id, resp);
          }
        }
      } catch (err) {
        logger.error(err);
      }
    })();
  }),
    commands.push(commandObj);
  // Abstraction ends here!

  // Function that removes the command
  return () => {
    const index = commands.indexOf(commandObj);

    if (index > -1) commands.splice(index, 1);
  };
}

export { addCommand, initializeCommands };
