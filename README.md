# Cumcord

[![Discord Shield](https://discordapp.com/api/guilds/824921608560181258/widget.png?style=shield)](https://discord.gg/FhHQQrVs7U)

Cumcord is a Discord client mod that focuses on making the Discord plugin development experience easier.

# Features

- Cumcord runs as a plugin for other mods (BetterDiscord, Powercord, GooseMod, Vizality) so you only have to write code once
- Cumcord creates "installation helper" plugins for other mods that make the experience of installing a Cumcord plugin the same as installing one for the end-user's host mod
- Cumcord plugins have no access to NodeJS for better security
- Cumcord plugins are built into a bundle with Rollup and as such are capable of using .jsx and .ts files as well as npm packages (ONES THAT WORK IN BROWSER ONLY) without any configuration from the developer
- Cumcord includes helper functions for Discord tasks that don't already exist in Discord's own webpack modules
- Cumcord includes event handlers that will assist you in proxying multiple things (message creations, message deletions, message edits, profile updates, etc)
- All Cumcord plugins are loaded via HTTP and have no reliance on Git, unlike GooseMod

# Contributing

You can submit patches and development ideas on our [development mailing list](https://lists.sr.ht/~creatable/cumcord-devel).  
You can talk about Cumcord on our [discussion mailing list](https://lists.sr.ht/~creatable/cumcord-discuss).  
Announcements can be found on our [announcements mailing list](https://lists.sr.ht/~creatable/cumcord-announce).
