const { Client, CommandInteraction } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { Permissions } = require("discord.js")
const config = require("../../config.json")
const { stripIndents } = require("common-tags/lib")
const moment = require("moment")

module.exports = {
  ...new SlashCommandBuilder()
    .setName("time-format")
    .setDescription("generate discord timestamp")
    .addStringOption((option) => option.setName("target").setDescription("yyyy-mm-dd hh:mm").setRequired(true)),
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    function epoch(date) {
      return Date.parse(date)
    }

    console.log(interaction.options.getString("target"))

    var someDate = new Date(interaction.options.getString("target"))
    const dateToday = new moment(someDate) // Mon Jun 08 2020 16:47:55 GMT+0800 (China Standard Time)
    const timestamp = epoch(dateToday)
    var day = moment(timestamp).unix()

    console.log(day) // => 1591606075000

    var a = moment(new Date())
    var b = moment(timestamp)

    interaction.followUp({
      content: stripIndents`${moment(dateToday).format("LLLL")}
          
          \`<t:${day}>\` - ${moment(dateToday).format("LLL")}
          \`<t:${day}:f>\` - ${moment(dateToday).format("LLL")}
          \`<t:${day}:F>\` - ${moment(dateToday).format("LLLL")}
          \`<t:${day}:d>\` - ${moment(dateToday).format("MM/DD/YYYY")}
          \`<t:${day}:D>\` - ${moment(dateToday).format("MMMM DD, YYYY")}
          \`<t:${day}:t>\` - ${moment(dateToday).format("LT")}
          \`<t:${day}:T>\` - ${moment(dateToday).format("LTS")}
          \`<t:${day}:R>\` - ${a.to(b)}`,
    })
  },
}
