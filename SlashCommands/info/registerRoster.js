const { Client, CommandInteraction } = require("discord.js")
const config = require("../../config.json")
const Discord = require("discord.js")
const moment = require("moment")
require("moment-duration-format")
const { MessageActionRow, MessageButton } = require("discord.js")

const { Pool } = require("pg")

var crypto = require("crypto")

var clickedArray = new Array()

const sqlDB = new Pool({
  user: "admin",
  host: process.env.DB_HOST,
  database: "tecbot",
  password: `${process.env.DB_PASS}@$1234`,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
})
sqlDB
  .connect()
  .then(() => console.log("DB 1 connected!"))
  .catch((err) => console.log("DB 1: ", err.message))

module.exports = {
  name: "register-roster",
  description: "returns websocket ping",
  type: "CHAT_INPUT",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    console.log("clickedArray", clickedArray)

    function arrayRemove(arr, value) {
      return arr.filter(function (ele) {
        return ele != value
      })
    }

    String.prototype.toProperCase = function () {
      return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    }

    if (clickedArray.includes(interaction.user.id)) {
      interaction.followUp({
        content: `You already have a registration going on in your DMs!`,
        ephemeral: true,
      })

      return
    }

    let embed1 = new Discord.MessageEmbed()
      .setColor("WHITE")
      .setDescription("**Welcome to TEC Valorant Roster Registration!**")
      .setFooter({ text: "Answer below questions to register." })

    interaction.user
      .send({ embeds: [embed1] })
      .then(async (sent) => {
        clickedArray.push(interaction.user.id)
        console.log("clickedArray inserted", clickedArray)

        interaction.followUp({
          embeds: [
            new Discord.MessageEmbed()
              .setColor("GREEN")
              .setDescription(`**[Click Here](${sent.url})** register your team!`),
          ],
          ephemeral: true,
        })

        const questions = [
          "Team Name?",
          "Player 1 Riot ID with Tag",
          "Player 1 Discord with Tag",
          "Player 2 Riot ID with Tag",
          "Player 2 Discord with Tag",
          "Player 3 Riot ID with Tag",
          "Player 3 Discord with Tag",
          "Player 4 Riot ID with Tag",
          "Player 4 Discord with Tag",
          "Player 5 Riot ID with Tag",
          "Player 5 Discord with Tag",
          "Player 6 Riot ID with Tag",
          "Player 6 Discord with Tag",
          "Player 7 Riot ID with Tag",
          "Player 7 Discord with Tag",
          "Team Password?",
        ]

        const filter = (m) => m.author.id === interaction.user.id
        let counter = 0

        const collector = sent.channel.createMessageCollector({
          filter,
          time: 1000 * 60 * 30,
          max: questions.length,
        })

        const newEmbed = new Discord.MessageEmbed()
          .setDescription(`${questions[counter++]}`)
          .setColor("#ffffff")
          .setFooter({ text: 'Respond here to answer! || Type "stop" to CANCEL your application!' })

        sent.channel.send({
          embeds: [newEmbed],
        })

        collector.on("collect", (m) => {
          if (m.content.toLowerCase() === "stop") {
            flag = true
            collector.stop()
          } else if (counter < questions.length) {
            const newEmbed = new Discord.MessageEmbed()
              .setDescription(`${questions[counter++]}`)
              .setColor("WHITE")
              .setFooter({ text: 'Respond here to answer! || Type "stop" to CANCEL your application!' })
            sent.channel.send({
              embeds: [newEmbed],
            })
          }
        })

        collector.on("end", async (collected) => {
          if (collected.size != questions.length) {
            let embed = new Discord.MessageEmbed().setColor("RED").setTitle("**Registration Cancelled**")

            interaction.user.send({
              embeds: [embed],
            })

            clickedArray = arrayRemove(clickedArray, interaction.user.id)
            console.log("clickedArray stopped", clickedArray)
            return
          }

          let counter2 = 0
          var ans = new Array()
          collected.forEach(async (value) => {
            ans[counter2] = value.content
            counter2 += 1
          })

          clickedArray = arrayRemove(clickedArray, interaction.user.id)
          console.log("clickedArray removed", clickedArray)

          await dbAdd(ans, questions)
        })
      })
      .catch((err) => {
        console.log(err)
        interaction.followUp({
          embeds: [new Discord.MessageEmbed().setColor("RED").setDescription("**Ahem! Your DMs are locked mate!**")],
        })
      })

    async function dbAdd(ans, questions) {
      console.log(ans)

      let hashPass = crypto.createHash("sha1").update(ans[15]).digest("hex")
      let embed2 = new Discord.MessageEmbed().setTitle(ans[0].toProperCase()).setColor("GREEN")

      for (i = 1; i < questions.length; i++) {
        embed2.addField(questions[i], ans[i])
      }

      let row = (boolean) => [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setLabel("REGISTER")
            .setStyle("SUCCESS")
            .setCustomId("register_team_btn")
            .setDisabled(boolean),

          new MessageButton()
            .setStyle("DANGER")
            .setCustomId("cancel_register_btn")
            .setLabel("CANCEL")
            .setDisabled(boolean)
        ),
      ]

      let msg = await interaction.user.send({ embeds: [embed2], components: row(false) }).then((sent) => {
        const filter2 = (i) => i.user.id === interaction.user.id
        const collector2 = sent.channel.createMessageComponentCollector({
          time: 1000 * 60 * 5,
          max: 1,
        })

        collector2.on("collect", async (i) => {
          if (i.user.id != interaction.user.id)
            return i.reply({
              content: `Only ${interaction.user.tag} can use this interaction!`, //customize this with your own message
              ephemeral: true,
            })
          console.log(i.customId)

          if (i.customId === "register_team_btn") {
            await i.deferUpdate()
            sent.edit({
              components: row(true),
            })

            let query =
              "insert into teamDetails(authorID,authorName,teamName,teamPwd,p1Riot,p1Disc,p2Riot,p2Disc,p3Riot,p3Disc,p4Riot,p4Disc,p5Riot,p5Disc,p6Riot,p6Disc,p7Riot,p7Disc) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18);"
            let values = [
              interaction.user.id,
              interaction.user.tag,
              ans[0].toProperCase(),
              hashPass,
              ans[1],
              ans[2],
              ans[3],
              ans[4],
              ans[5],
              ans[6],
              ans[7],
              ans[8],
              ans[9],
              ans[10],
              ans[11],
              ans[12],
              ans[13],
              ans[14],
            ]

            sqlDB.query(query, values, async (err, res) => {
              if (err) {
                console.log(err)
              } else {
                let query2 = "select teamid from teamDetails where teamName=$1;"
                let values2 = [ans[0].toProperCase()]

                sqlDB.query(query2, values2, async (err, res1) => {
                  if (err) {
                    interaction.user.send(`<@540911685582454804> ${err.message}`)
                    console.log(err)
                  } else {
                    console.log(res1.rows)
                    let teamCounter = res1.rows[0].teamid
                    if (teamCounter === null) teamCounter = 1

                    let embed = new Discord.MessageEmbed()
                      .setTitle("Successfully Registered!")
                      .addFields(
                        {
                          name: "Team Name",
                          value: `\`${ans[0].toProperCase()}\``,
                        },
                        {
                          name: "Team ID",
                          value: `\`${teamCounter}\``,
                        },
                        {
                          name: "Password",
                          value: `\`${ans[15]}\``,
                        }
                      )
                      .setColor("GREEN")

                    interaction.user.send({ embeds: [embed] })
                  }
                })
              }
            })
          } else if (i.customId === "cancel_register_btn") {
            msg.edit({
              components: row(true),
            })
            await i.deferUpdate()
            clickedArray = arrayRemove(clickedArray, interaction.user.id)
            interaction.user.send("Registration Cancelled!")
          }
        })
      })
    }
  },
}
