const { Client, CommandInteraction } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { Permissions } = require("discord.js")
const config = require("../../config.json")
const moment = require("moment")

module.exports = {
  ...new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("display user info")
    .addUserOption((option) => option.setName("target").setDescription("mention an user").setRequired(false)),
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const member = interaction.options.getMember("target") || interaction.member
    console.log(member)
    // console.log(member)

    let roleArray = new Array()

    member._roles.forEach(async (i) => {
      roleArray.push(`<@&${i}>`)
    })

    const uiembed = new Discord.MessageEmbed()
      .setTitle(`${member.displayName}'s Information`)
      .setThumbnail(member.displayAvatarURL({ dynamic: true }))
      .addFields(
        {
          name: "Nickname",
          value: `${member.displayName}`,
          inline: true,
        },
        {
          name: "Tag",
          value: `\`${member.user.tag}\``,
          inline: true,
        },
        {
          name: "ID",
          value: `\`${member.user.id}\``,
          inline: true,
        },
        {
          name: "Bot",
          value: `\`${member.user.bot}\``,
          inline: true,
        },
        {
          name: "Color Role",
          value: `\`${member.displayHexColor}\``,
          inline: true,
        },
        {
          name: "Highest Role",
          value: `${member.roles.highest}`,
          inline: true,
        },
        {
          name: "Joined server on",
          value: `\`${moment(member.joinedTimestamp).format("LLL")}\``,
          inline: true,
        },
        {
          name: "Joined Discord on",
          value: `\`${moment(member.user.createdAt).format("LLL")}\``,
          inline: true,
        },
        {
          name: "Roles",
          value: roleArray.toLocaleString().split(",").join(",  "),
          inline: false,
        }
      )
      .setTimestamp()
      .setColor("0x2F3136")

    interaction.followUp({ embeds: [uiembed] })
  },
}
