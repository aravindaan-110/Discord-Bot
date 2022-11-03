const { Client, CommandInteraction } = require("discord.js")
const config = require("../../config.json")
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { Permissions } = require("discord.js")
const moment = require("moment")
require("moment-duration-format")

const allowedRoles = ["606006163120717824", "606006449579229204", "720244395374542940"]
const perfomance = require("perf_hooks")
const { resolve } = require("path")

module.exports = {
  ...new SlashCommandBuilder()
    .setName("clearrole")
    .setDescription("removes all members from a role")
    .addRoleOption((option) => option.setName("target").setDescription("tag a role").setRequired(true)),
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
      try {
        let amount = 0

        let role = await interaction.guild.roles.cache.get(interaction.options.getRole("target").id)

        var roleArray = [role.id]

        if (role.position >= interaction.member.roles.highest.position)
          return interaction.followUp("**The role you are trying to clear is above your role!**")

        interaction.reply(`Trying to remove role from ${role.members.size} members..`)

        role.members.forEach(async (i) => {
          i.roles.remove(role).then(() => {
            interaction.editReply(`Removed role from ${i.user.tag}!`)
          })
        })
      } catch (error) {
        interaction.followUp({
          embeds: [new Discord.MessageEmbed().setColor("RED").setDescription("**Error! Try Again!**")],
        })
      }
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
