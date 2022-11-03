const { Client, CommandInteraction } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { Permissions } = require("discord.js")
const config = require("../../config.json")
const { stripIndents } = require("common-tags/lib")

module.exports = {
  ...new SlashCommandBuilder()
    .setName("spamkick")
    .setDescription("kick a user for spamming")
    .addUserOption((option) => option.setName("target").setDescription("tag a user").setRequired(true)),
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
        `**⚠ | We have noticed a spam from your account on the TEC server recently!** 
            
            **Your discord account might have been hacked/compromised!**
            
            **Please enable 2FA and feel free to join back! This is just a safety measure taken by TEC.\n https://discord.gg/theesportsclub**`
      )
      .setFooter({ text: "Secure your account ASAP!" })
      .setTimestamp()
      .setColor("RED")

    if (interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      const target = interaction.options.getMember("target")

      let roleArray = new Array()

      target._roles.forEach(async (i) => {
        roleArray.push(`<@&${i}>`)
      })

      await target
        .send({ embeds: [embed1] })
        .then(async (sent) => {
          await target.kick().then(() =>
            interaction
              .followUp({
                embeds: [
                  new Discord.MessageEmbed()
                    .setDescription(
                      `**\`${target.user.tag}\`** has been kicked by **\`${interaction.user.tag}\`** for spamming!`
                    )
                    .setColor("RED"),
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
                  stripIndents`👮‍♂️ | **\`${target.user.tag}\`** has been kicked by ${
                    interaction.user.tag
                  } for spamming!\n\n__**Roles:**__\n${roleArray.toLocaleString().split(",").join(",  ")}`
                ),
            ],
          })
        })
        .catch(async (err) => {
          target.kick().then(() =>
            interaction
              .followUp({
                embeds: [
                  new Discord.MessageEmbed()
                    .setFooter({ text: "Could not DM" })
                    .setDescription(
                      `**\`${target.user.tag}\`** has been kicked by **\`${interaction.user.tag}\`** for spamming!`
                    )
                    .setColor("RED"),
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
                  stripIndents`👮‍♂️ | **\`${target.user.tag}\`** has been kicked by ${
                    interaction.user.tag
                  } for spamming!\n\n__**Roles:**__\n${roleArray.toLocaleString().split(",").join(",  ")}`
                ),
            ],
          })
        })
    } else
      return interaction.followUp({
        embeds: [
          new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("**You are missing the `KICK_MEMBERS` permission!**"),
        ],
      })
  },
}
