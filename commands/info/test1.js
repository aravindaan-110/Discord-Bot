const { Message, Client, DiscordAPIError } = require("discord.js");
const Discord = require('discord.js')
const {MessageActionRow, MessageButton, MessageSelectMenu} = require('discord.js')

module.exports = {
    name: "test1",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.author.id === '540911685582454804') {


            // let vcs = await client.channels.cache.filter(i=>i.type==='GUILD_VOICE')

            // vcs.forEach(async i=>{
            //     i.setRTCRegion('india')
            //     message.channel.send(`${i} region changed to India!`)
            // })

            

            let embed = new Discord.MessageEmbed()
            .setTitle(`FIFA MOBILE COMMUNITY CUP`)
            .setImage('https://media.discordapp.net/attachments/843706177824751656/1031842129447763998/Discord-Announcement.png?width=664&height=664')
            .setFooter({text:'Click below to get access!'})
            .setColor('BLUE')

            const row = new MessageActionRow().addComponents(
                new MessageButton()
                .setCustomId('fifa-mob-scrims')
                .setLabel('Get Role')
                .setStyle('PRIMARY')
            )

            //send embed to channel
            message.channel.send({embeds: [embed], components: [row]})

            // let embed1 = new Discord.MessageEmbed()
            // .setTitle(`SA Qualifier 2`)
            // .setImage('https://media.discordapp.net/attachments/843706177824751656/1028216534788755506/Valorant-logo.png?width=664&height=664')
            // .setFooter({text:'Click below to get access!'})
            // .setColor('BLUE')

            // const row1 = new MessageActionRow().addComponents(
            //     new MessageButton()
            //     .setCustomId('dif-server-qual-2')
            //     .setLabel('Get Role')
            //     .setStyle('PRIMARY')
            // )

            // //send embed to channel
            // message.channel.send({embeds: [embed1], components: [row1]})

            // let embed2 = new Discord.MessageEmbed()
            // .setTitle(`SEA Qualifier`)
            // .setImage('https://media.discordapp.net/attachments/843706177824751656/1028216534788755506/Valorant-logo.png?width=664&height=664')
            // .setFooter({text:'Click below to get access!'})
            // .setColor('BLUE')

            // const row2 = new MessageActionRow().addComponents(
            //     new MessageButton()
            //     .setCustomId('dif-server-qualifiers')
            //     .setLabel('Get Role')
            //     .setStyle('PRIMARY')
            // )

            // //send embed to channel
            // message.channel.send({embeds: [embed2], components: [row2]})

           

            // for(let i=1;i<=args[2];i++){
            //     let newChannel1 = await message.guild.channels.create(`︱Vc ${i}`, {
            //         type: "GUILD_VOICE",
            //         parent: args[0],
            //         userLimit: args[1],
            //         permissionOverwrites: [
            //             {
            //                 id: message.guild.roles.everyone,
            //                 deny: ['VIEW_CHANNEL']
            //             }
            //         ]
            //     }).then(async channel =>  {
            //         await channel.setParent(args[0])
            //         message.channel.send(`${channel} created.`)})
            // }

            

        } else message.react('❌')
    },
};