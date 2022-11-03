const { Client, CommandInteraction } = require("discord.js")
const Discord = require("discord.js")
const { default: axios } = require("axios")
const config = require("../../config.json")

module.exports = {
  name: "dog",
  description: "returns a cute dog pic",
  type: "CHAT_INPUT",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    await axios.get("https://dog.ceo/api/breeds/image/random").then((res) => {
      let embed = new Discord.MessageEmbed().setImage(res.data.message).setColor("RANDOM")

      interaction
        .followUp({
          embeds: [embed],
        })
        .then((sent) => {
          sent.react("🤩")
          sent.react("😳")
        })
    })
  },
}
