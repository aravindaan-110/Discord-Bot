const { Client, CommandInteraction } = require("discord.js")
const config = require("../../config.json")
const Discord = require("discord.js")
const moment = require("moment")
require("moment-duration-format")

module.exports = {
  name: "ping",
  description: "returns websocket ping",
  type: "CHAT_INPUT",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const guild = client.guilds.fetch(interaction.guild.id)
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]")

    const embed = new Discord.MessageEmbed()
      .setTitle(`${client.user.tag} Statistics`)
      .addFields(
        {
          name: "Uptime",
          value: duration,
          inline: true,
        },
        {
          name: "Users",
          value: `${client.users.cache.size.toLocaleString()}`,
          inline: true,
        },
        {
          name: "Servers",
          value: `${client.guilds.cache.size.toLocaleString()}`,
          inline: true,
        },
        {
          name: "Channels",
          value: `${client.channels.cache.size.toLocaleString()}`,
          inline: true,
        },
        {
          name: "Node Version",
          value: `${process.version}`,
          inline: true,
        },
        {
          name: "Discord Js Version",
          value: `v13.2.0`,
          inline: true,
        },
        {
          name: "Latency",
          value: `${Date.now() - interaction.createdTimestamp}ms`,
          inline: true,
        },
        {
          name: "Ping",
          value: `${Math.round(client.ws.ping)}ms`,
          inline: true,
        },
        {
          name: "Guild Owner",
          value: `<@${(await guild).ownerId}>`,
          inline: true,
        }
      )
      .setColor("0x2F3136")

    let serverNames = new Array()
    let counter = 1

    client.guilds.cache.forEach((i) => {
      serverNames.push(`${counter}. ${i.name}`)
      counter += 1
    })

    let embed2 = new Discord.MessageEmbed()
      .setColor("0x2F3136")
      .setDescription(
        `__**Watching ${client.guilds.cache.size} Servers!**__\n\n${serverNames.toLocaleString().split(",").join("\n")}`
      )

    interaction.followUp({
      embeds: [embed2, embed],
      // content:``
    })
  },
}
