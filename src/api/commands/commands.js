import { findByProps } from "webpackModules";
import { after } from "patcher";
import { logger } from "utils";

const builtIn = findByProps("BUILT_IN_COMMANDS", "BUILT_IN_SECTIONS");
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
  string: {
    val: 3,
    handle: (opt) => opt.text,
  },
  bool: {
    val: 5,
    handle: (opt) => (opt.text == "True" ? true : false),
  },
  user: {
    val: 6,
    handle: (opt) => opt.userId,
  },
  channel: {
    val: 7,
    handle: (opt) => opt.channelId,
  },
  role: {
    val: 8,
    handle(opt) {
      switch (opt.type) {
        case "textMention":
          return opt.text;
        case "roleMention":
          return opt.roleId;
      }
    },
  },
};

function initializeCommands() {
  after("getBuiltInCommands", builtIn, (_, resp) => {
    return [...resp, ...commands];
  });

  after("useApplicationCommandsDiscoveryState", commandDiscovery, (_, resp) => {
    if (
      resp.applicationCommandSections.find((x) => x == cumcordSection) ||
      commands.length == 0
    )
      return;

    const cloneResp = { ...resp };

    cloneResp.discoverySections.push({
      data: commands,
      section: cumcordSection,
      key: applicationId,
    });

    cloneResp.applicationCommandSections.push(cumcordSection);

    return cloneResp;
  });
}

function uninitializeCommands() {
  delete builtIn.BUILT_IN_SECTIONS[applicationId];
}

function addCommand({ name, description, args, handler }) {
  // Add Cumcord section to command list
  if (!builtIn.BUILT_IN_SECTIONS[applicationId])
    builtIn.BUILT_IN_SECTIONS[applicationId] = cumcordSection;

  // Abstraction goes here!
  const commandObj = {
    applicationId,
    type: 0,
    target: 1,
    description,
    name,
    id: `-${Math.random().toString().split(".")[1].substring(0, 5)}`,
  };

  if (args) {
    commandObj.options = args.map((arg) => {
      if (!arg.type) {
        arg.type = "string";
      }

      const newArg = { ...arg };

      newArg.type = typeMap[arg.type].val;
      newArg.required = newArg.required === undefined ? true : newArg.required;
      return newArg;
    });
  }

  (commandObj.execute = (opts, ctx) => {
    if (!handler) return;

    const handledOpts = {};

    if (args) {
      for (const opt of opts) {
        // this finds the argument, figures out what type it is, and handles for it
        handledOpts[opt.name] =
          typeMap[args.find((arg) => arg.name == opt.name).type].handle(opt);
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
          if (typeof resp === "string") {
            sendMessage(ctx.channel.id, { content: resp, validNonShortcutEmojis: [] /* no idea. */ });
          } else {
            sendMessage(ctx.channel.id, resp);
          }
        }
      } catch (err) {
        logger.error(err);
      }
    })()
  }),
    commands.push(commandObj);
  // Abstraction ends here!

  // Function that removes the command
  return () => {
    const index = commands.indexOf(commandObj);

    if (index > -1) commands.splice(index, 1);

    if (commands.length === 0) {
      delete builtIn.BUILT_IN_SECTIONS[applicationId];
    }
  };
}

export { addCommand, initializeCommands, uninitializeCommands };
