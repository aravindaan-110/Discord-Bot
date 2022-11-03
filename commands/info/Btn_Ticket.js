const { Message, Client } = require("discord.js");
const Discord = require('discord.js')

const {
    MessageActionRow,
    MessageButton
} = require('discord.js')
const {
    stripIndents
} = require('common-tags')

module.exports = {
    name: "test2",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('ticket_btn')
                .setStyle('PRIMARY')
                .setLabel('Open A Ticket')
        )

        const embed = new Discord.MessageEmbed()
            .setTitle('Hello!')
            .setDescription(stripIndents`**Have questions about The Esports Club and what we do? \nOpen a ticket to ask us!**`)
            .setImage('https://thumbs.gfycat.com/NegligiblePaltryCorydorascatfish-max-1mb.gif')
            .setColor("#00c7ff")

        message.channel.send({
            components: [row],
            embeds: [embed]
        }).then(sent => {
            message.delete()
        })


    },
};