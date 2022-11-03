const { Client, CommandInteraction } = require("discord.js")
const Discord = require("discord.js")
const { default: axios } = require("axios")
const config = require("../../config.json")

module.exports = {
  name: "cat",
  description: "returns a cute cat pic",
  type: "CHAT_INPUT",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    await axios.get("https://api.thecatapi.com/v1/images/search").then((res) => {
      let embed = new Discord.MessageEmbed().setImage(res.data[0].url).setColor("RANDOM")

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
