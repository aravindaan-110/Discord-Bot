const { Client, CommandInteraction } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { Permissions } = require("discord.js")
const config = require("../../config.json")

module.exports = {
  ...new SlashCommandBuilder()
    .setName("addperson")
    .setDescription("Adds a person to a private channel")
    .addUserOption((option) => option.setName("target").setDescription("mention a user to add").setRequired(true)),

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
      try {
        const member = await interaction.options.getMember("target")
        // console.log(member)

        await interaction.channel.permissionOverwrites.create(member, {
          SEND_MESSAGES: true,
          ADD_REACTIONS: true,
          READ_MESSAGE_HISTORY: true,
          VIEW_CHANNEL: true,
          EMBED_LINKS: true,
          ATTACH_FILES: true,
        })

        let embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(`**\`${member.user.tag}\`** is now added to this channel.`)

        interaction.followUp({ content: `${member}`, embeds: [embed] })
        //     .then(() => {
        //     setTimeout(() => {
        //         message.delete()
        //     }, 1000 * 2);
        // })
      } catch (e) {
        interaction.channel.send(`${e.message}`)
        console.log(e)
      }
    } else
      return interaction.followUp({
        embeds: [
          new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("**You are missing `MANAGE_CHANNELS` permission!**"),
        ],
        ephemeral: true,
      })
  },
}
