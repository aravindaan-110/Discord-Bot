const { Client, CommandInteraction } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { Permissions } = require("discord.js")
const config = require("../../config.json")

module.exports = {
  ...new SlashCommandBuilder()
    .setName("delete-category")
    .setDescription("delete all the channels of a category")
    .addStringOption((option) => option.setName("target").setDescription("category id").setRequired(true)),
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      interaction.followUp("Running!")

      let targetChannels = await interaction.guild.channels.cache.filter(
        (channel) => channel.parentId === interaction.options.getString("target")
      )

      targetChannels.forEach(async (i) => {
        await i.delete()
      })
    } else
      return interaction.followUp({
        embeds: [
          new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("**You are missing the `ADMINISTRATOR` permission!**"),
        ],
      })
  },
}
