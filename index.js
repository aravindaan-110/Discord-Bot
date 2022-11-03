const { Client, Collection } = require("discord.js")
const dotenv = require("dotenv")

dotenv.config({ path: "./config.env" })

const client = new Client({
  intents: 32767,
})
module.exports = client

// Global Variables
client.commands = new Collection()
client.slashCommands = new Collection()
const config = require("./config.json")

// Initializing the project
require("./handler")(client)

client.login(process.env.BOT_TOKEN)
