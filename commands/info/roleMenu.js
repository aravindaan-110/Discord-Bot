const { Message, Client } = require("discord.js");
const {MessageActionRow, MessageButton, MessageSelectMenu} = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    name: "getrole",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        
        const row = new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId('get-role-menu').setPlaceholder("Select a role from the menu.").addOptions([
            {
                label: "Zotac Cup - SEA",
                value: "zotac-sea-role-menu"
            },
            {
                label: "Zotac Cup - SA",
                value: "zotac-sa-role-menu"
            },
            {
                label: "EPWA Valorant",
                value: "epwa-valo-role-menu"
            },
            {
                label: "EPWA Pokémon",
                value: "epwa-poke-role-menu"
            }, {
                label: "EPWA Free Fire",
                value: "epwa-ff-role-menu"
            }, {
                label: "ROG Academy Season 4",
                value: "rog-s4-role-menu"
            }
        ]))

        let embed = new Discord.MessageEmbed().setColor('GREEN').setDescription('**Hello!**')

        message.channel.send({embeds: [embed], components: [row]})
    },
};