const { Client, CommandInteraction } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { Permissions } = require("discord.js")
const config = require("../../config.json")

module.exports = {
  ...new SlashCommandBuilder()
    .setName("inrole")
    .setDescription("lists members in a role")
    .addRoleOption((option) => option.setName("target").setDescription("mention a role").setRequired(true)),
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
      let targetRole = interaction.options.getRole("target")

      if (targetRole.members.size < 100) {
        // console.log(targetRole)

        let map = new Map().set("a", 1).set("b", 2),
          array = Array.from(interaction.guild.roles.cache.get(targetRole.id).members, ([name, value]) => ({
            name,
            value,
          }))

        let memberArray = new Array()
        let counter = 1
        array.forEach((i) => {
          let userID = i.name
          let user = client.users.cache.get(userID)

          memberArray.push(`\`${user.id}\` | ${user.tag}`)
          counter += 1
        })

        try {
          let embed = new Discord.MessageEmbed()
            .setTitle(`Members in "${targetRole.name}" Role - ${targetRole.members.size}`)
            .setDescription(`${memberArray.toLocaleString().split(",").join("\n")}`)
            .setColor("BLURPLE")
            .setFooter({ text: `Requested by ${interaction.user.tag}` })

          interaction.followUp({
            embeds: [embed],
          })
        } catch (error) {
          let logsChannel = client.channels.cache.get(config.logsChannelId)
          logsChannel.send({
            content: `<@${config.DrPsychID}> Error in nameinfo.js\n${error.message}`,
          })
        }
      } else return interaction.followUp("⚠ This role has too many members!")
    } else
      return interaction.followUp({
        embeds: [
          new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("**You are missing the `MANAGE_ROLES` permission!**"),
        ],
      })
  },
}
