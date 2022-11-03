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
    .setName("massrole")
    .setDescription("adds a role to users")
    .addRoleOption((option) => option.setName("target").setDescription("tag a role").setRequired(true))
    .addStringOption((option) => option.setName("users").setDescription("tag all users").setRequired(true)),
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

        let role = interaction.options.getRole("target")
        var roleArray = [role.id]

        if (role.position >= interaction.member.roles.highest.position)
          return interaction.followUp("**The role you are trying to give is above your role!**")

        // console.log(role)

        let regex = /\d{20}|\d{19}|\d{18}/gi
        let usersContent = interaction.options.getString("users")

        var array = usersContent.match(regex)
        console.log(array)

        await interaction.followUp(`Changing roles for ${array.length} users...`).then((sent) => {
          var bar = new Promise((resolve, reject) => {
            array.forEach((i, time) => {
              setTimeout(() => {
                const user = interaction.guild.members.cache.get(i)
                // console.log(user)
                sent.edit(`Trying to change roles for **\`${user.user.username}\`**...`)
                // console.log(user)

                let memberRolesArray = user._roles
                if (memberRolesArray.some((item) => roleArray.includes(item)) === false) {
                  user.roles
                    .add(role)
                    .then(() => {
                      interaction.channel.send({ content: `**\`${role.name}\`** role given to ${user} ` })
                    })
                    .catch((err) => {
                      console.log(err)
                      interaction.channel.send({ content: `Unable to assign **\`${role.name}\`** role to ${user}!` })
                    })
                } else {
                  interaction.channel.send({ content: `**\`${role.name}\`** is already present with ${user}!` })
                }
                amount += 1
                if (amount === array.length) resolve()
              }, 1000 * 1 * time)
            })
          })

          bar.then(() => {
            interaction.channel.send("✅ | Task completed ")
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
