const { Client, CommandInteraction } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { Permissions } = require("discord.js")

module.exports = {
  ...new SlashCommandBuilder()
    .setName("category")
    .setDescription("creates channels and roles")
    .addStringOption((option) => option.setName("name").setDescription("enter event name").setRequired(true)),
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
      interaction.followUp("Creating Roles & Channels...")

      const rolename = interaction.options.getString("name")

      await interaction.guild.roles
        .create({
          name: `${rolename}`,
          color: "#00d9ff",
          permissions: [
            "ATTACH_FILES",
            "CONNECT",
            "VIEW_CHANNEL",
            "STREAM",
            "SPEAK",
            "USE_EXTERNAL_EMOJIS",
            "READ_MESSAGE_HISTORY",
            "EMBED_LINKS",
            "ADD_REACTIONS",
            "SEND_MESSAGES",
          ],
          reason: "Role created by bot.",
        })
        .then((role) => {
          interaction.channel.send(`${role} created!`)
          role.setMentionable(false)
          role.setHoist(false)
        })

      await interaction.guild.roles
        .create({
          name: `${rolename} Approved`,
          color: "GREEN",
          permissions: [
            "ATTACH_FILES",
            "CONNECT",
            "VIEW_CHANNEL",
            "STREAM",
            "SPEAK",
            "USE_EXTERNAL_EMOJIS",
            "READ_MESSAGE_HISTORY",
            "EMBED_LINKS",
            "ADD_REACTIONS",
            "SEND_MESSAGES",
          ],
          reason: "Role created by bot.",
        })
        .then((role) => {
          interaction.channel.send(`${role} created!`)
          role.setMentionable(false)
          role.setHoist(false)
        })

      await interaction.guild.roles
        .create({
          name: `${rolename} Admin`,
          color: "#fa8334",
          permissions: [
            "SEND_MESSAGES",
            "READ_MESSAGE_HISTORY",
            "CONNECT",
            "STREAM",
            "SPEAK",
            "MOVE_MEMBERS",
            "MUTE_MEMBERS",
            "ADD_REACTIONS",
            "ATTACH_FILES",
            "EMBED_LINKS",
            "MANAGE_MESSAGES",
          ],
          reason: "Role created by bot.",
        })
        .then((role) => {
          interaction.channel.send(`${role} created!`)
          role.setMentionable(false)
          role.setHoist(false)
        })

      const participantRole = await interaction.guild.roles.cache.find((role) => role.name === rolename)
      const adminRole = await interaction.guild.roles.cache.find((role) => role.name === `${rolename} Admin`)
      const approvedRole = await interaction.guild.roles.cache.find((role) => role.name === `${rolename} Approved`)

      // Creating a new cateogory

      newCategory = await interaction.guild.channels
        .create(rolename, {
          type: "GUILD_CATEGORY",
          permissionOverwrites: [
            {
              id: participantRole.id,
              allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS"],
              deny: ["ADD_REACTIONS"],
            },
            {
              id: approvedRole.id,
              allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS"],
              deny: ["ADD_REACTIONS"],
            },
            {
              id: interaction.guild.roles.everyone,
              deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "ADD_REACTIONS"],
            },
            {
              id: adminRole.id,
              allow: [
                "VIEW_CHANNEL",
                "MANAGE_CHANNELS",
                "CREATE_INSTANT_INVITE",
                "EMBED_LINKS",
                "ATTACH_FILES",
                "MENTION_EVERYONE",
                "READ_MESSAGE_HISTORY",
                "CONNECT",
                "SPEAK",
                "STREAM",
                "MOVE_MEMBERS",
                "MUTE_MEMBERS",
                "DEAFEN_MEMBERS",
                "SEND_MESSAGES",
                "MANAGE_MESSAGES",
                "MANAGE_ROLES",
                "MANAGE_GUILD",
              ],
            },
          ],
        })
        .then(async (createdCategory) => {
          console.log(createdCategory.id)

          let newChannel1 = await interaction.guild.channels
            .create("announcements", {
              type: "GUILD_TEXT",
              parent: createdCategory.id,
              permissionOverwrites: [
                {
                  id: interaction.guild.roles.everyone,
                  allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
                  deny: ["SEND_MESSAGES", "ADD_REACTIONS"],
                },
              ],
            })
            .then((channel) => interaction.channel.send(`${channel} created.`))

          let newChannel2 = await interaction.guild.channels
            .create("get-access", {
              type: "GUILD_TEXT",
              parent: createdCategory.id,
              permissionOverwrites: [
                {
                  id: interaction.guild.roles.everyone,
                  allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
                  deny: ["SEND_MESSAGES", "ADD_REACTIONS"],
                },
              ],
            })
            .then((channel) => interaction.channel.send(`${channel} created.`))

          let newChannel3 = await interaction.guild.channels
            .create("tag-your-team", {
              type: "GUILD_TEXT",
              parent: createdCategory.id,
              permissionOverwrites: [
                {
                  id: participantRole.id,
                  allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "ATTACH_FILES", "EMBED_LINKS", "SEND_MESSAGES"],
                  deny: ["ADD_REACTIONS"],
                },
                {
                  id: approvedRole.id,
                  allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS"],
                  deny: ["ADD_REACTIONS"],
                },
                {
                  id: interaction.guild.roles.everyone,
                  deny: ["VIEW_CHANNEL"],
                },
                {
                  id: adminRole.id,
                  allow: [
                    "VIEW_CHANNEL",
                    "MANAGE_CHANNELS",
                    "CREATE_INSTANT_INVITE",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "MENTION_EVERYONE",
                    "READ_MESSAGE_HISTORY",
                    "CONNECT",
                    "SPEAK",
                    "STREAM",
                    "MOVE_MEMBERS",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "SEND_MESSAGES",
                    "MANAGE_MESSAGES",
                    "MANAGE_ROLES",
                    "MANAGE_GUILD",
                  ],
                },
              ],
            })
            .then((channel) => interaction.channel.send(`${channel} created.`))

          let newChannel4 = await interaction.guild.channels
            .create("stream-schedule", {
              type: "GUILD_TEXT",
              parent: createdCategory.id,
              permissionOverwrites: [
                {
                  id: participantRole.id,
                  allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "ATTACH_FILES", "EMBED_LINKS"],
                  deny: ["ADD_REACTIONS", "SEND_MESSAGES"],
                },
                {
                  id: approvedRole.id,
                  allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "ATTACH_FILES", "EMBED_LINKS"],
                  deny: ["ADD_REACTIONS", "SEND_MESSAGES"],
                },
                {
                  id: interaction.guild.roles.everyone,
                  deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "ADD_REACTIONS"],
                },
                {
                  id: adminRole.id,
                  allow: [
                    "VIEW_CHANNEL",
                    "MANAGE_CHANNELS",
                    "CREATE_INSTANT_INVITE",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "MENTION_EVERYONE",
                    "READ_MESSAGE_HISTORY",
                    "CONNECT",
                    "SPEAK",
                    "STREAM",
                    "MOVE_MEMBERS",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "SEND_MESSAGES",
                    "MANAGE_MESSAGES",
                    "MANAGE_ROLES",
                    "MANAGE_GUILD",
                  ],
                },
              ],
            })
            .then((channel) => interaction.channel.send(`${channel} created.`))

          let newChannel5 = await interaction.guild.channels
            .create("brackets", {
              type: "GUILD_TEXT",
              parent: createdCategory.id,
              permissionOverwrites: [
                {
                  id: participantRole.id,
                  allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "ATTACH_FILES", "EMBED_LINKS"],
                  deny: ["ADD_REACTIONS", "SEND_MESSAGES"],
                },
                {
                  id: approvedRole.id,
                  allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "ATTACH_FILES", "EMBED_LINKS"],
                  deny: ["ADD_REACTIONS", "SEND_MESSAGES"],
                },
                {
                  id: interaction.guild.roles.everyone,
                  deny: ["VIEW_CHANNEL"],
                },
                {
                  id: adminRole.id,
                  allow: [
                    "VIEW_CHANNEL",
                    "MANAGE_CHANNELS",
                    "CREATE_INSTANT_INVITE",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "MENTION_EVERYONE",
                    "READ_MESSAGE_HISTORY",
                    "CONNECT",
                    "SPEAK",
                    "STREAM",
                    "MOVE_MEMBERS",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "SEND_MESSAGES",
                    "MANAGE_MESSAGES",
                    "MANAGE_ROLES",
                    "MANAGE_GUILD",
                  ],
                },
              ],
            })
            .then((channel) => interaction.channel.send(`${channel} created.`))

          let newChannel12 = await interaction.guild.channels
            .create("steam-schedule", {
              type: "GUILD_TEXT",
              parent: createdCategory.id,
              permissionOverwrites: [
                {
                  id: participantRole.id,
                  allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "ATTACH_FILES", "EMBED_LINKS"],
                  deny: ["ADD_REACTIONS", "SEND_MESSAGES"],
                },
                {
                  id: approvedRole.id,
                  allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "ATTACH_FILES", "EMBED_LINKS"],
                  deny: ["ADD_REACTIONS", "SEND_MESSAGES"],
                },
                {
                  id: interaction.guild.roles.everyone,
                  deny: ["VIEW_CHANNEL"],
                },
                {
                  id: adminRole.id,
                  allow: [
                    "VIEW_CHANNEL",
                    "MANAGE_CHANNELS",
                    "CREATE_INSTANT_INVITE",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "MENTION_EVERYONE",
                    "READ_MESSAGE_HISTORY",
                    "CONNECT",
                    "SPEAK",
                    "STREAM",
                    "MOVE_MEMBERS",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "SEND_MESSAGES",
                    "MANAGE_MESSAGES",
                    "MANAGE_ROLES",
                    "MANAGE_GUILD",
                  ],
                },
              ],
            })
            .then((channel) => interaction.channel.send(`${channel} created.`))

          let newChannel6 = await interaction.guild.channels
            .create("queries", {
              type: "GUILD_TEXT",
              parent: createdCategory.id,
              permissionOverwrites: [
                {
                  id: participantRole.id,
                  allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "ATTACH_FILES", "EMBED_LINKS", "SEND_MESSAGES"],
                  deny: ["ADD_REACTIONS"],
                },
                {
                  id: approvedRole.id,
                  allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS"],
                  deny: ["ADD_REACTIONS"],
                },
                {
                  id: interaction.guild.roles.everyone,
                  deny: ["VIEW_CHANNEL"],
                },
                {
                  id: adminRole.id,
                  allow: [
                    "VIEW_CHANNEL",
                    "MANAGE_CHANNELS",
                    "CREATE_INSTANT_INVITE",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "MENTION_EVERYONE",
                    "READ_MESSAGE_HISTORY",
                    "CONNECT",
                    "SPEAK",
                    "STREAM",
                    "MOVE_MEMBERS",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "SEND_MESSAGES",
                    "MANAGE_MESSAGES",
                    "MANAGE_ROLES",
                    "MANAGE_GUILD",
                  ],
                },
              ],
            })
            .then((channel) => interaction.channel.send(`${channel} created.`))

          let newChannel7 = await interaction.guild.channels
            .create("admin-chat", {
              type: "GUILD_TEXT",
              parent: createdCategory.id,
              permissionOverwrites: [
                {
                  id: participantRole.id,
                  deny: ["VIEW_CHANNEL"],
                },
                {
                  id: interaction.guild.roles.everyone,
                  deny: ["VIEW_CHANNEL"],
                },
                {
                  id: adminRole.id,
                  allow: [
                    "VIEW_CHANNEL",
                    "MANAGE_CHANNELS",
                    "CREATE_INSTANT_INVITE",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "MENTION_EVERYONE",
                    "READ_MESSAGE_HISTORY",
                    "CONNECT",
                    "SPEAK",
                    "STREAM",
                    "MOVE_MEMBERS",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "SEND_MESSAGES",
                    "MANAGE_MESSAGES",
                    "MANAGE_ROLES",
                    "MANAGE_GUILD",
                  ],
                },
              ],
            })
            .then((channel) => interaction.channel.send(`${channel} created.`))

          let newChannel8 = await interaction.guild.channels
            .create("post-game-ss", {
              type: "GUILD_TEXT",
              parent: createdCategory.id,
              permissionOverwrites: [
                {
                  id: participantRole.id,
                  deny: ["VIEW_CHANNEL"],
                },
                {
                  id: approvedRole.id,
                  allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS"],
                  deny: ["ADD_REACTIONS"],
                },
                {
                  id: interaction.guild.roles.everyone,
                  deny: ["VIEW_CHANNEL"],
                },
                {
                  id: adminRole.id,
                  allow: [
                    "VIEW_CHANNEL",
                    "MANAGE_CHANNELS",
                    "CREATE_INSTANT_INVITE",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "MENTION_EVERYONE",
                    "READ_MESSAGE_HISTORY",
                    "CONNECT",
                    "SPEAK",
                    "STREAM",
                    "MOVE_MEMBERS",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "SEND_MESSAGES",
                    "MANAGE_MESSAGES",
                    "MANAGE_ROLES",
                    "MANAGE_GUILD",
                  ],
                },
              ],
            })
            .then((channel) => interaction.channel.send(`${channel} created.`))

          let newChannel9 = await interaction.guild.channels
            .create("admin-match-ss", {
              type: "GUILD_TEXT",
              parent: createdCategory.id,
              permissionOverwrites: [
                {
                  id: participantRole.id,
                  deny: ["VIEW_CHANNEL"],
                },
                {
                  id: interaction.guild.roles.everyone,
                  deny: ["VIEW_CHANNEL"],
                },
                {
                  id: adminRole.id,
                  allow: [
                    "VIEW_CHANNEL",
                    "MANAGE_CHANNELS",
                    "CREATE_INSTANT_INVITE",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "MENTION_EVERYONE",
                    "READ_MESSAGE_HISTORY",
                    "CONNECT",
                    "SPEAK",
                    "STREAM",
                    "MOVE_MEMBERS",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "SEND_MESSAGES",
                    "MANAGE_MESSAGES",
                    "MANAGE_ROLES",
                    "MANAGE_GUILD",
                  ],
                },
              ],
            })
            .then((channel) => interaction.channel.send(`${channel} created.`))

          let newChannel10 = await interaction.guild.channels
            .create("Admin Lounge", {
              type: "GUILD_VOICE",
              parent: createdCategory.id,
              permissionOverwrites: [
                {
                  id: participantRole.id,
                  deny: ["VIEW_CHANNEL"],
                },
                {
                  id: approvedRole.id,
                  deny: ["VIEW_CHANNEL"],
                },
                {
                  id: interaction.guild.roles.everyone,
                  deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "ADD_REACTIONS"],
                },
                {
                  id: adminRole.id,
                  allow: [
                    "VIEW_CHANNEL",
                    "MANAGE_CHANNELS",
                    "CREATE_INSTANT_INVITE",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "MENTION_EVERYONE",
                    "READ_MESSAGE_HISTORY",
                    "CONNECT",
                    "SPEAK",
                    "STREAM",
                    "MOVE_MEMBERS",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "SEND_MESSAGES",
                    "MANAGE_MESSAGES",
                    "MANAGE_ROLES",
                    "MANAGE_GUILD",
                  ],
                },
              ],
            })
            .then((channel) => interaction.channel.send(`${channel} created.`))

          let newChannel11 = await interaction.guild.channels
            .create("Players Lounge", {
              type: "GUILD_VOICE",
              parent: createdCategory.id,
              permissionOverwrites: [
                {
                  id: participantRole.id,
                  allow: [
                    "VIEW_CHANNEL",
                    "READ_MESSAGE_HISTORY",
                    "ATTACH_FILES",
                    "EMBED_LINKS",
                    "CONNECT",
                    "SPEAK",
                    "STREAM",
                  ],
                  deny: ["ADD_REACTIONS", "SEND_MESSAGES"],
                },
                {
                  id: approvedRole.id,
                  allow: [
                    "VIEW_CHANNEL",
                    "READ_MESSAGE_HISTORY",
                    "ATTACH_FILES",
                    "EMBED_LINKS",
                    "CONNECT",
                    "SPEAK",
                    "STREAM",
                  ],
                  deny: ["ADD_REACTIONS", "SEND_MESSAGES"],
                },
                {
                  id: interaction.guild.roles.everyone,
                  deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "ADD_REACTIONS"],
                },
                {
                  id: adminRole.id,
                  allow: [
                    "VIEW_CHANNEL",
                    "MANAGE_CHANNELS",
                    "CREATE_INSTANT_INVITE",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "MENTION_EVERYONE",
                    "READ_MESSAGE_HISTORY",
                    "CONNECT",
                    "SPEAK",
                    "STREAM",
                    "MOVE_MEMBERS",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "SEND_MESSAGES",
                    "MANAGE_MESSAGES",
                    "MANAGE_ROLES",
                    "MANAGE_GUILD",
                  ],
                },
              ],
            })
            .then((channel) => interaction.channel.send(`${channel} created.`))
        })
    } else
      return interaction.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription("**You are not authorised to perform this action!**")
            .setColor("RED"),
        ],
        ephemeral: true,
      })
  },
}
