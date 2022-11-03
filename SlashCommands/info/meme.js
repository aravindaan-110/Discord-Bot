const { Client, CommandInteraction } = require("discord.js")
const Discord = require("discord.js")
const { default: axios } = require("axios")
const config = require("../../config.json")

module.exports = {
  name: "meme",
  description: "returns a meme",
  type: "CHAT_INPUT",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    await axios.get("http://meme-api.herokuapp.com/gimme").then((res) => {
      let embed = new Discord.MessageEmbed().setImage(res.data.url).setColor("RANDOM")

      interaction
        .followUp({
          embeds: [embed],
        })
        .then((sent) => {
          sent.react("😂")
        })
    })
  },
}
