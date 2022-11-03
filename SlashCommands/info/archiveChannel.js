const { Client, CommandInteraction } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const config = require("../../config.json")

module.exports = {
  ...new SlashCommandBuilder().setName("archive").setDescription("archives the channel"),
  // .addChannelOption(option =>
  //     option
  //         .setName('target')
  //         .setDescription('mention a user to add')
  //         .setRequired(true)
  // ),

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const allowedRoles = [config.coreBasikID]

    let userRolesArray = interaction.member._roles
    if (
      userRolesArray.some((item) => allowedRoles.includes(item)) === true ||
      interaction.author.id === "540911685582454804"
    ) {
      let archiveCat = await interaction.guild.channels.cache.find(
        (cat) => cat.name === "archives" && cat.type === "GUILD_CATEGORY"
      )

      interaction.channel.setParent(archiveCat.id).then(() => {
        interaction.followUp({ content: `Channel has been archived by **\`${interaction.user.tag}\`**!` })
      })
    } else {
      interaction.followUp("You are not authorised to perform this action!")
    }
  },
}
