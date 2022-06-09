import { findByProps } from "@webpackModules";
import { channels, constants, FluxDispatcher } from "@commonModules";
import { after, instead } from "@patcher";
import { logger } from "@utils";

const searchManagerModule = findByProps("useSearchManager");
/*const commandsModule = findByProps("getQueryCommands");
const commandDiscovery = findByProps("useApplicationCommandsDiscoveryState");*/
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
  bot: {
    id: applicationId,
    username: "Cumcord",
    avatar: botIconId,
  },
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

const filterSectionPatch =
  (channelId) =>
  ([sid], orig) => {
    if (sid !== cumcordSection.id) return orig(sid);

    FluxDispatcher.dirtyDispatch({
      type: constants.ActionTypes.APPLICATION_COMMAND_SEARCH_MANAGER_UPDATE,
      channelId: channelId,
      commandType: 1,
      state: { filteredSectionId: cumcordSection.id },
    });
    FluxDispatcher.dirtyDispatch({
      type: constants.ActionTypes.APPLICATION_COMMAND_SEARCH_MANAGER_UPDATE,
      channelId: channelId,
      commandType: 1,
      state: { applicationCommands: commands },
    });
  };

export function initializeCommands() {
  // TODO: fix querying in servers with lots of commmands not showing cc commands!

  let unpatchFilterSection;
  after("useSearchManager", searchManagerModule, ([channel], ret) => {
    unpatchFilterSection?.();
    unpatchFilterSection = instead("filterSection", ret, filterSectionPatch(channel.id));

    // dont make duplicates, only show if commands exist
    if (ret.sectionDescriptors.some((s) => s.id === cumcordSection.id) || commands.length === 0)
      return;

    ret.sectionDescriptors.splice(ret.sectionDescriptors.length - 1, 0, cumcordSection);

    // stop if something else is focused
    if (ret.filteredSectionId && ret.filteredSectionId !== cumcordSection.id) return;

    const asBuiltinId = ret.activeSections.findIndex((n) => n.id === "-1");
    const asIndex = asBuiltinId !== -1 ? asBuiltinId : ret.activeSections.length;
    ret.activeSections.splice(asIndex, 0, cumcordSection);

    const cbBuiltinId = ret.commandsByActiveSection.findIndex((n) => n.section.id === "-1");
    const cbIndex = cbBuiltinId !== -1 ? cbBuiltinId : ret.commandsByActiveSection.length;
    ret.commandsByActiveSection.splice(cbIndex, 0, { section: cumcordSection, data: commands });

    ret.commands.push(...commands);
  });
}

export function addCommand({ name, description, args, handler }) {
  // Add Cumcord section to command list

  // Abstraction goes here!
  const commandObj = {
    applicationId,
    type: 3,
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

  commandObj.execute = (opts, ctx) => {
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

          receiveMessage(channels.getChannelId(), msg);
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
  };
  commands.push(commandObj);
  // Abstraction ends here!

  // Function that removes the command
  return () => {
    const index = commands.indexOf(commandObj);

    if (index > -1) commands.splice(index, 1);
  };
}
