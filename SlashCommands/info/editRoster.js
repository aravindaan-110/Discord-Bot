const { Client, CommandInteraction } = require("discord.js")
const config = require("../../config.json")
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const moment = require("moment")
require("moment-duration-format")

const { MessageActionRow, MessageButton } = require("discord.js")

const { Pool } = require("pg")

var crypto = require("crypto")

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
  .then(() => console.log("DB 3 connected!"))
  .catch((err) => console.log("DB 3: ", err.message))

module.exports = {
  ...new SlashCommandBuilder()
    .setName("edit-roster")
    .setDescription("edit your valorant roster")
    .addStringOption((option) => option.setName("teamid").setDescription("team id").setRequired(true))
    .addStringOption((option) => option.setName("passwd").setDescription("password").setRequired(true)),
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    // await interaction.deferReply({ ephemeral: true });

    String.prototype.toProperCase = function () {
      return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    }

    var teamID = interaction.options.getString("teamid")
    var teamPwd = interaction.options.getString("passwd")

    let hashPass = crypto.createHash("sha1").update(teamPwd).digest("hex")

    let query = "select * from teamDetails where teamid=$1 AND teamPwd=$2;"
    let values = [teamID, hashPass]

    sqlDB.query(query, values, async (err, res) => {
      if (err) console.log(err)
      else {
        console.log(res.rows[0])
        if (res.rowCount === 0)
          return interaction.followUp({
            embeds: [
              new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("**❎ | Please register first to edit your roster!**"),
            ],
          })

        let embed = new Discord.MessageEmbed()
          .setColor("ORANGE")
          .setTitle("Edit Roster")
          .addFields(
            {
              name: "0️⃣ Team Name",
              value: `\`${res.rows[0].teamname}\``,
              inline: true,
            },
            {
              name: "1️⃣ Player 1",
              value: `\`${res.rows[0].p1riot}\``,
              inline: true,
            },
            {
              name: "2️⃣ Player 2",
              value: `\`${res.rows[0].p2riot}\``,
              inline: true,
            },
            {
              name: "3️⃣ Player 3",
              value: `\`${res.rows[0].p3riot}\``,
              inline: true,
            },
            {
              name: "4️⃣ Player 4",
              value: `\`${res.rows[0].p4riot}\``,
              inline: true,
            },
            {
              name: "5️⃣ Player 5",
              value: `\`${res.rows[0].p5riot}\``,
              inline: true,
            },
            {
              name: "6️⃣ Player 6",
              value: `\`${res.rows[0].p6riot}\``,
              inline: true,
            },
            {
              name: "7️⃣ Player 7",
              value: `\`${res.rows[0].p7riot}\``,
              inline: true,
            }
          )

        interaction.followUp({ embeds: [embed], ephemeral: true }).then(async (sent) => {
          let xEmoji = await client.emojis.cache.get("923125529475960862")

          await sent.react("0️⃣")
          await sent.react("1️⃣")
          await sent.react("2️⃣")
          await sent.react("3️⃣")
          await sent.react("4️⃣")
          await sent.react("5️⃣")
          await sent.react("6️⃣")
          await sent.react("7️⃣")
          await sent.react(xEmoji)

          const filter = (reaction, user) => {
            return (
              (reaction.emoji.name === "0️⃣" ||
                "1️⃣" ||
                "2️⃣" ||
                "3️⃣" ||
                "4️⃣" ||
                "5️⃣" ||
                "6️⃣" ||
                "7️⃣" ||
                "⏸️" ||
                xEmoji.name) &&
              user.id === interaction.user.id
            )
          }

          const collector2 = sent.createReactionCollector({
            time: 1000 * 60 * 5,
            max: 10,
            filter,
          })

          collector2.on("collect", async (reaction, user) => {
            var questions, flag

            if (reaction.emoji.name === "0️⃣") {
              flag = 0
              questions = ["New Team Name"]
              await takeInput(questions, sent, flag)
            } else if (reaction.emoji.name === "1️⃣") {
              questions = ["New Player 1 Riot ID with Tag", "New Player 1 Discord Tag"]
              flag = 1
              await takeInput(questions, sent, flag)
            } else if (reaction.emoji.name === "2️⃣") {
              questions = ["New Player 2 Riot ID with Tag", "New Player 1 Discord Tag"]
              flag = 2
              await takeInput(questions, sent, flag)
            } else if (reaction.emoji.name === "3️⃣") {
              questions = ["New Player 3 Riot ID with Tag", "New Player 1 Discord Tag"]
              flag = 3
              await takeInput(questions, sent, flag)
            } else if (reaction.emoji.name === "4️⃣") {
              questions = ["New Player 4 Riot ID with Tag", "New Player 1 Discord Tag"]
              flag = 4
              await takeInput(questions, sent, flag)
            } else if (reaction.emoji.name === "5️⃣") {
              questions = ["New Player 5 Riot ID with Tag", "New Player 1 Discord Tag"]
              flag = 5
              await takeInput(questions, sent, flag)
            } else if (reaction.emoji.name === "6️⃣") {
              questions = ["New Player 6 Riot ID with Tag", "New Player 1 Discord Tag"]
              flag = 6
              await takeInput(questions, sent, flag)
            } else if (reaction.emoji.name === "7️⃣") {
              questions = ["New Player 7 Riot ID with Tag", "New Player 1 Discord Tag"]
              flag = 7
              await takeInput(questions, sent, flag)
            } else if (reaction.emoji.name === "⏸️") {
              await sent.delete()
              return collector2.stop()
            }
          })

          async function takeInput(questions, sent, flag) {
            const filter = (m) => m.author.id === interaction.user.id
            let counter = 0

            const collector = sent.channel.createMessageCollector({
              filter,
              time: 1000 * 60 * 5,
              max: questions.length,
            })

            const newEmbed = new Discord.MessageEmbed()
              .setDescription(`${questions[counter++]}`)
              .setColor("#ffffff")
              .setFooter({ text: "Type below to enter new details!" })

            interaction.followUp({
              embeds: [newEmbed],
              ephemeral: true,
            })

            collector.on("collect", (m) => {
              if (m.content.toLowerCase() === "stop") {
                flag = true
                collector.stop()
              } else if (counter < questions.length) {
                const newEmbed = new Discord.MessageEmbed()
                  .setDescription(`${questions[counter++]}`)
                  .setColor("WHITE")
                  .setFooter({ text: "Respond here to enter new details!" })
                interaction.followUp({
                  embeds: [newEmbed],
                  ephemeral: true,
                })
              }
            })

            collector.on("end", async (collected) => {
              let counter2 = 0
              var ans = new Array()
              collected.forEach(async (value) => {
                ans[counter2] = value.content
                counter2 += 1
              })
              console.log(ans)

              if (flag === 0) {
                let query2 = "UPDATE teamdetails SET teamname = $1 WHERE teamid = $2;"
                let values2 = [ans[0], teamID]

                sqlDB.query(query2, values2, async (err, res) => {
                  if (err) console.log(err)
                  else {
                    interaction.followUp({
                      embeds: [new Discord.MessageEmbed().setColor("GREEN").setDescription("✅ | Team Name Updated!")],
                      ephemeral: true,
                    })
                    sent.channel.bulkDelete(1, true)

                    const embed = sent.embeds[0]
                    embed.fields[0] = { name: "Team Name", value: `\`${ans[0].toProperCase()}\``, inline: true }
                    await sent.edit({ embeds: [embed] })
                  }
                })
              } else if (flag === 1 || 2 || 3 || 4 || 5 || 6 || 7) {
                let query2 = `UPDATE teamdetails SET p${flag}riot = $1,p${flag}disc=$2 WHERE teamid = $3;`
                let values2 = [ans[0], ans[1], teamID]

                sqlDB.query(query2, values2, async (err, res) => {
                  if (err) console.log(err)
                  else {
                    interaction.followUp({
                      embeds: [
                        new Discord.MessageEmbed().setColor("GREEN").setDescription("✅ | Player Details Updated!"),
                      ],
                      ephemeral: true,
                    })
                    sent.channel.bulkDelete(2, true)

                    const embed = sent.embeds[0]
                    embed.fields[flag] = { name: `Player ${flag}`, value: `\`${ans[0]}\``, inline: true }
                    await sent.edit({ embeds: [embed] })
                  }
                })
              }
            })
          }
        })
      }
    })
  },
}
