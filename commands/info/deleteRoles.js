const { Message, Client } = require("discord.js");
const {MessageActionRow, MessageButton, MessageSelectMenu} = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    name: "dr",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        let regex = /\d{19}|\d{18}/ig 
        let roles = message.content.match(regex)

        roles.forEach(async i=>{
            let targ = await message.guild.roles.cache.get(i)
            if(!targ) return

            console.log(targ);

            let size = targ.members.size

            targ.delete().then(()=>message.channel.send(`\`${targ.name}\` role with ${size} members deleted.`))
        })
        
    },
};