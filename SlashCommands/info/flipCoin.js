const { Client, CommandInteraction } = require("discord.js")
const Discord = require("discord.js")
const config = require("../../config.json")

module.exports = {
  name: "flip",
  description: "returns heads/tails",
  type: "CHAT_INPUT",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max)
    }

    let random = getRandomInt(2)
    console.log(random)

    if (random === 0) {
      const Embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTimestamp()
        .setImage(
          "https://media.discordapp.net/attachments/921388343181340672/931197093048107058/heads.png?width=663&height=663"
        )

      interaction.followUp({ embeds: [Embed] })
    } else if (random === 1) {
      const Embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTimestamp()
        .setImage(
          "https://media.discordapp.net/attachments/921388343181340672/931433861441806346/TAILS.png?width=663&height=663"
        )

      interaction.followUp({ embeds: [Embed] })
    }
  },
}
