const { Client, CommandInteraction } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { Permissions } = require("discord.js")
const config = require("../../config.json")
const { stripIndents } = require("common-tags/lib")

module.exports = {
  ...new SlashCommandBuilder()
    .setName("ban-user")
    .setDescription("ban a user with reason")
    .addUserOption((option) => option.setName("target").setDescription("tag a user").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("mention a reason").setRequired(true)),
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const embed1 = new Discord.MessageEmbed()
      .setTitle("Hello from TEC!")
      .setDescription(
        `Hello from TEC!\n'+
        '\n'+
        'You have been banned from the server \`${interaction.guild.name}\`!\n'+
        'Reason: ${interaction.options.getString("reason")}`
      )
      .setTimestamp()
      .setColor("RED")

    String.prototype.toProperCase = function () {
      return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    }

    if (interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      const target = interaction.options.getMember("target")

      let roleArray = new Array()

      target._roles.forEach(async (i) => {
        roleArray.push(`<@&${i}>`)
      })

      await target
        .send({ embeds: [embed1] })
        .then(async (sent) => {
          await target.ban().then(() =>
            interaction.followUp({
              embeds: [
                new Discord.MessageEmbed()
                  .setColor("RED")
                  .setDescription(
                    `**\`${target.user.tag}\`** has been banned by **\`${
                      interaction.user.tag
                    }\`**\nReason: **${interaction.options.getString("reason").toProperCase()}**`
                  ),
              ],
            })
          )

          let logChannel = await client.channels.cache.get("922764203218075678")
          logChannel.send({
            embeds: [
              new Discord.MessageEmbed()
                .setColor("RED")
                .setFooter({
                  text: `ID: ${target.user.id}`,
                })
                .setDescription(
                  stripIndents`👮‍♂️ | **\`${target.user.tag}\`** has been banned by ${
                    interaction.user.tag
                  }!\nReason: ${interaction.options.getString("reason")}\n\n__**Roles:**__\n${roleArray
                    .toLocaleString()
                    .split(",")
                    .join(",  ")}`
                ),
            ],
          })
        })
        .catch(async (err) => {
          target.ban().then(() =>
            interaction
              .followUp({
                embeds: [
                  new Discord.MessageEmbed()
                    .setFooter({ text: "Could not DM" })
                    .setColor("RED")
                    .setDescription(
                      `**\`${target.user.tag}\`** has been banned by **\`${
                        interaction.user.tag
                      }\`**\nReason: **${interaction.options.getString("reason").toProperCase()}**`
                    ),
                ],
              })
              .then((sent) => {
                setTimeout(() => {
                  sent.delete()
                }, 1000 * 3)
              })
          )

          let logChannel = await client.channels.cache.get("922764203218075678")
          logChannel.send({
            embeds: [
              new Discord.MessageEmbed()
                .setColor("RED")
                .setFooter({
                  text: `ID: ${target.user.id}`,
                })
                .setDescription(
                  stripIndents`👮‍♂️ | **\`${target.user.tag}\`** has been banned by ${
                    interaction.user.tag
                  }!\nReason: ${interaction.options.getString("reason")}\n\n__**Roles:**__\n${roleArray
                    .toLocaleString()
                    .split(",")
                    .join(",  ")}`
                ),
            ],
          })
        })
    } else
      return interaction.followUp({
        embeds: [
          new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("**You are missing the `BAN_MEMBERS` permission!**"),
        ],
      })
  },
}
