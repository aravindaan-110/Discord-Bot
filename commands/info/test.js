const { Message, Client } = require("discord.js");

module.exports = {
    name: "test",
    // aliases: ['p'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.author.id === '540911685582454804') {

            // const rolename = ['Clan Members','Guests']

            // rolename.forEach(async i => {

            //     let guild = message.guild
            //     let targetRole = guild.roles.cache.find(role => role.name === i);

            //     if (!targetRole) {

            //         message.channel.send(`Creating a new **\`${i}\`** role!`)
            //         targetRole = await guild.roles.create({
            //                 name: `${i}`,
            //                 color: "WHITE",
            //                 // position:message.guild.roles.cache.size-14,
            //                 permissions: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
            //                 reason: `Role created for ${i}.`
            //             })
            //             .then(role => {
            //                 role.setMentionable(false)
            //                 role.setHoist(false)

            //                 message.channel.send(`Created a new role ${role}`)
            //             })


            //     }

            // })

            let guild = await client.guilds.cache.get(message.guild.id)

            //     let category = guild.channels.cache.find(cat => cat.name === 'COC Clan' && cat.type === 'GUILD_CATEGORY')
            //     console.log(category.name)

            //     let role1 = message.guild.roles.cache.get('913689829030633493')
            //     let role2 = message.guild.roles.cache.get('913690761994833930')
            //     let role3 = message.guild.roles.cache.get('911120180736823306')

            //     category.permissionOverwrites.set([


            //     {
            //         id:role1,
            //         allow:['VIEW_CHANNEL','READ_MESSAGE_HISTORY','SEND_MESSAGES','ADD_REACTIONS','EMBED_LINKS','ATTACH_FILES',
            //         'MENTION_EVERYONE','CONNECT','SPEAK','STREAM','MANAGE_CHANNELS','MANAGE_ROLES','MANAGE_GUILD',
            //     'MUTE_MEMBERS','DEAFEN_MEMBERS','MOVE_MEMBERS']
            //     },
            //     {
            //         id:role2,
            //         allow:['VIEW_CHANNEL','READ_MESSAGE_HISTORY','SEND_MESSAGES','ADD_REACTIONS','EMBED_LINKS','ATTACH_FILES',
            //         'MENTION_EVERYONE','CONNECT','SPEAK','STREAM','MANAGE_CHANNELS','MANAGE_ROLES','MANAGE_GUILD',
            //     'MUTE_MEMBERS','DEAFEN_MEMBERS','MOVE_MEMBERS']
            //     },
            //     {
            //         id:role3,
            //         allow:['VIEW_CHANNEL','READ_MESSAGE_HISTORY','SEND_MESSAGES','ADD_REACTIONS','EMBED_LINKS','ATTACH_FILES','CONNECT','SPEAK','STREAM']
            //     },
            //     {
            //         id:message.guild.roles.everyone,
            //         deny:['VIEW_CHANNEL']
            //     }

            // ])

            /* Setting prefix to all channel names */


            // let channels = await guild.channels.cache.filter(channel => channel.parentId === args[1] )
            // channels.forEach(async i=>{
            //     if(i.name.includes('︱')) return
            //     let chnName = i.name
            //     i.setName(`︱${chnName}`)
            // })

            /* Hiding a category */

            let channels = await guild.channels.cache.filter(channel => channel.parentId === args[1])
            channels.forEach(async i => {

                await i.setParent(args[0])

                // i.permissionOverwrites.set([{
                //     id: message.guild.roles.everyone,
                //     deny: ['VIEW_CHANNEL']
                // }])

            })

        } else return message.reply('You are not allowed to perform this action!')
    },
};