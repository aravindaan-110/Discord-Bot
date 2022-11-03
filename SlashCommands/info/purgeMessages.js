const { Client, CommandInteraction } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { Permissions } = require("discord.js")
const config = require("../../config.json")

module.exports = {
  ...new SlashCommandBuilder()
    .setName("purge")
    .setDescription("purge messages from a channel")
    .addIntegerOption((option) =>
      option.setName("target").setDescription("number of messages to delete").setRequired(true)
    ),
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
      const amount = interaction.options.getInteger("target")

      const amtParsed = parseInt(amount)
      if (amtParsed > 100) return interaction.followUp("You cannot clear more than 100 messages at a time!")

      interaction.channel
        .bulkDelete(amtParsed, true)
        .then(() => {
          interaction.channel.send({ content: `Purged ${amtParsed} messages!`, ephemeral: true }).then((sent) => {
            setTimeout(() => {
              sent.delete()
            }, 1000 * 2)
          })
        })
        .catch((err) => {
          console.log(err.code)
          if (err.code == 50034)
            return interaction.channel.send({
              content: "You can only bulk delete messages that are under 14 days old",
              ephemeral: true,
            })
          if (err.code == 10008)
            return interaction.channel.send({
              content: "You can only bulk delete messages that are under 14 days old",
              ephemeral: true,
            })
          else interaction.channel.send("Unknown error occurred!")
        })
    } else
      return interaction.followUp({
        embeds: [
          new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("**You are missing the `MANAGE_MESSAGES` permission!**"),
        ],
      })
  },
}
