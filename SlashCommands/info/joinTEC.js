const { Client, CommandInteraction } = require("discord.js")
const config = require("../../config.json")
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const moment = require("moment")
require("moment-duration-format")

module.exports = {
  ...new SlashCommandBuilder()
    .setName("jointec")
    .setDescription("how to join TEC")
    .addUserOption((option) => option.setName("target").setDescription("tag a user").setRequired(false)),
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const member = interaction.options.getUser("target") || interaction.user

    let embed = new Discord.MessageEmbed()
      .setTitle(`Hello ${member.tag}`)
      .setDescription(
        `Interested To Join TEC?\nSend In Your CV to **jobs@theesports.club**\n\nYou will get a reply from us if we're interested in you!`
      )
      .setFooter({ text: "Thank you for trying out!" })
      .setColor("GREEN")
      .setTimestamp()

    member
      .send({ embeds: [embed] })
      .then(() => {
        let errEmbed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(`✅ | **\`${member.tag}\`** check your DM!`)

        interaction.followUp({ embeds: [errEmbed] })
      })
      .catch((err) => console.log(err.code))
  },
}
