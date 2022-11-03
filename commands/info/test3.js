const { Message, Client, DiscordAPIError } = require("discord.js");
const Discord = require('discord.js')
const {MessageActionRow, MessageButton, MessageSelectMenu} = require('discord.js')

module.exports = {
    name: "t3",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.author.id === '540911685582454804') {

            for(let i=1;i<=args[2];i++){
                let newChannel1 = await message.guild.channels.create(`︱Vc ${i}`, {
                    type: "GUILD_VOICE",
                    parent: args[0],
                    userLimit: args[1],
                    permissionOverwrites: [
                        {
                            id: message.guild.roles.everyone,
                            deny: ['VIEW_CHANNEL']
                        }
                    ]
                }).then(async channel =>  {
                    await channel.setParent(args[0])
                    message.channel.send(`${channel} created.`)})
            }

            

        } else message.react('❌')
    },
};