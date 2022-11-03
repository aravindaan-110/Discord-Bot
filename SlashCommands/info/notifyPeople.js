const { Client, CommandInteraction } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { Permissions } = require("discord.js")
const config = require("../../config.json")
const { stripIndents } = require("common-tags/lib")

module.exports = {
  ...new SlashCommandBuilder()
    .setName("notify")
    .setDescription("notify a team about their match")
    .addStringOption((option) => option.setName("event-name").setDescription("event name").setRequired(true))
    .addStringOption((option) => option.setName("event-time").setDescription("event time").setRequired(true))
    .addStringOption((option) => option.setName("event-date").setDescription("event date").setRequired(true))
    .addStringOption((option) => option.setName("event-users").setDescription("tag all users").setRequired(true)),
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
      let amount = 0

      let embed = new Discord.MessageEmbed()
        .setAuthor({
          name: "The Esports Club",
          iconURL:
            "https://media.discordapp.net/attachments/906055412112035851/920615213164814336/TEC_Color.png?width=794&height=663",
        })
        .setColor("GREEN")
        .setTitle("Reminder from the Admins!")
        .setDescription(
          stripIndents`This is to inform you regarding your match in **${interaction.options.getString(
            "event-name"
          )}** which is scheduled on **${interaction.options.getString(
            "event-date"
          )}**  at ${interaction.options.getString("event-time")}.
            
            For any queries please contact ${interaction.user}/\`${interaction.user.tag}\`
            **Please make sure to be on time!
            Have a good day!**`
        )
        .setTimestamp()
        .setFooter({ text: `Sent by ${interaction.user.tag}` })

      let members = interaction.options.getString("event-users")

      let regex = /\d{20}|\d{19}|\d{18}/gi
      var array = members.match(regex)

      await interaction.followUp(`Trying to DM ${array.length} users...`).then((sent) => {
        var bar = new Promise((resolve, reject) => {
          array.forEach((i, time) => {
            setTimeout(async () => {
              const user = await interaction.guild.members.cache.get(i)
              // console.log(user)
              sent.edit(`Trying to DM **\`${user.user.username}\`**...`)
              // console.log(user)

              user
                .send({ embeds: [embed] })
                .then(() => interaction.channel.send(`✅ | Reminder sent to ${user}`))
                .catch((err) => interaction.channel.send(`❌ | Could not DM ${user}`))

              amount += 1
              if (amount === array.length) {
                resolve()
                sent.delete()
              }
            }, 1000 * 1 * time)
          })
        })

        bar.then(() => {
          interaction.channel.send("✅ | Task completed ")
        })
      })
    } else
      return interaction.followUp({
        embeds: [
          new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("**You are missing the `MANAGE_MESSAGES` permission!**"),
        ],
      })
  },
}
