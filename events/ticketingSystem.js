const client = require('../index');
const Discord = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const config = require('../config.json');

const allowedRoles = [config.coreBasikID];

var moment = require('moment');
require('moment-timezone');

const { Pool } = require('pg');

const { stripIndents } = require('common-tags');

const sqlDB = new Pool({
  user: 'admin',
  host: process.env.DB_HOST,
  database: 'tecbot',
  password: `${process.env.DB_PASS}@$1234`,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});
sqlDB
  .connect()
  .then(() => console.log('DB 2 connected!'))
  .catch((err) => console.log('DB 2: ', err.message));

client.on('interactionCreate', async (interaction) => {
  // console.log(interaction)

  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  if (interaction.isButton()) {
    const guild = interaction.guild;
    const logsChannel = await client.channels.cache.get('921643937725304832');

    if (interaction.customId === 'ticket_btn') {
      let query = 'select * from tickets where authorID = $1';
      let values = [interaction.user.id];

      sqlDB.query(query, values, async (err, res) => {
        if (err) {
          console.log(err.message);
        } else {
          // interaction.deferUpdate()
          var ticketChannel;

          if (res.rowCount === 1 && res.rows[0].ticketstatus === 'OPEN') {
            ticketChannel = await interaction.guild.channels.cache.get(res.rows[0].ticketchannel);

            let embed = new Discord.MessageEmbed()
              .setColor('RED')
              .setDescription(`👮‍♂️ | **You already have a ticket open!**\n\nPlease head over to ${ticketChannel}`);

            interaction.reply({ embeds: [embed], ephemeral: true });
            // .then(sent=>{
            //     setTimeout(() => {
            //         sent.delete()
            //     }, 1000*7);
            // })
            return;
          } else {
            let query2 = 'SELECT MAX(count) FROM tickets;';
            sqlDB.query(query2, async (err, res1) => {
              if (err) {
                logsChannel.send(`<@540911685582454804> ${err.message}`);
                console.log(err);
              } else {
                let ticketCounter = res1.rows[0].max;

                if (ticketCounter === null) ticketCounter = 1;

                const staffRole = await interaction.guild.roles.cache.get('922429787748851753');

                let botRole = await interaction.guild.roles.cache.get('825982805086437416');

                let chnName = `${interaction.user.username}-${ticketCounter}`;

                await interaction.guild.channels
                  .create(chnName, {
                    type: 'GUILD_TEXT',
                    parent: '921643790899503104',

                    permissionOverwrites: [
                      {
                        id: interaction.user.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'EMBED_LINKS'],
                      },
                      {
                        id: interaction.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL'],
                      },
                      {
                        id: staffRole.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                      },
                      {
                        id: botRole.id,
                        allow: [
                          'VIEW_CHANNEL',
                          'SEND_MESSAGES',
                          'READ_MESSAGE_HISTORY',
                          'MANAGE_CHANNELS',
                          'MANAGE_MESSAGES',
                        ],
                      },
                    ],
                  })
                  .then(async (channel) => {
                    let embed = new Discord.MessageEmbed()
                      .setColor('WHITE')
                      .setDescription(
                        `✅ | **You have successfully opened a new support ticket!**\n\nHead over to ${channel}`
                      );

                    await interaction.reply({
                      embeds: [embed],
                      content: `${interaction.member}`,
                      ephemeral: true,
                    });
                    // .then(sent=>{
                    //     setTimeout(() => {
                    //         sent.delete()
                    //     }, 1000*7);
                    // })

                    let row = new MessageActionRow().addComponents(
                      new MessageButton().setCustomId('delete_chnl').setStyle('DANGER').setLabel('Close'),
                      new MessageButton().setCustomId('archive_chnl').setStyle('PRIMARY').setLabel('Archive')
                    );

                    const welcomeEmbed = new Discord.MessageEmbed()
                      .setColor('WHITE')
                      .setDescription(
                        `Hello !\nOne of our moderators will be here to assist u shortly! \n\n**Please drop your query below.**`.toProperCase()
                      )
                      .setThumbnail(interaction.member.user.avatarURL())
                      .setImage(
                        'https://media.discordapp.net/attachments/729683661653278821/736247974832898140/ezgif-1-a2a2e7173d80-1-1_1-1-1.gif'
                      );

                    channel
                      .send({
                        embeds: [welcomeEmbed],
                        content: `${interaction.user} ||<@&922429787748851753>||`, // ||${staffRole}||
                        components: [row],
                      })
                      .then((sent) => {
                        var today = new moment();

                        let query =
                          'insert into tickets(authorID,authorName,messageID,ticketStatus,adminID,adminName,ticketChannel,timestamp) values($1,$2,$3,$4,$5,$6,$7,$8);';
                        let values = [
                          interaction.user.id,
                          interaction.user.tag,
                          sent.id,
                          'OPEN',
                          '-',
                          '-',
                          channel.id,
                          today.tz('Asia/Calcutta').format('Do MMM | LT'),
                        ];

                        sqlDB.query(query, values, (err, res) => {
                          if (err) {
                            logsChannel.send(`<@540911685582454804> ${err.message}`);
                            console.log(err);
                          } else {
                            console.log(`${interaction.user.tag} - Ticket details pushed to DB!`);
                          }
                        });
                      });
                  });
              }
            });
          }
        }
      });
    } else if (interaction.customId === 'delete_chnl') {
      // let userRolesArray = interaction.member._roles
      // if (userRolesArray.some(item => allowedRoles.includes(item)) === true) {

      // let query3 = 'DELETE FROM tickets WHERE messageid=$1;'
      // let values3 = [interaction.message.id]

      // sqlDB.query(query3, values3, (err, res) => {
      //     if (err) {
      //         console.log(err)
      //         interaction.channel.send(`<@540911685582454804> ${err.message}`)
      //     } else {
      //         console.log(`Ticket data has been cleared from DB!'`)
      //     }
      // })

      let query = 'UPDATE tickets SET adminid = $1,adminname=$3,ticketstatus=$4 WHERE messageid = $2;';
      let values = [interaction.user.id, interaction.message.id, interaction.user.tag, 'DELETED'];

      sqlDB.query(query, values, (err, res) => {
        if (err) {
          console.log(err);
          interaction.channel.send(`<@540911685582454804> ${err.message}`);
        } else {
          console.log(`${interaction.user.tag} - Admin ticket details updated!`);
        }
      });

      let query2 = 'select * from tickets WHERE messageid = $1;';
      let values2 = [interaction.message.id];

      sqlDB.query(query2, values2, async (err, res) => {
        if (err) {
          console.log(err);
          interaction.channel.send(`<@540911685582454804> ${err.message}`);
        } else {
          console.log(res.rows[0]);

          let target = await interaction.guild.members.cache.get(res.rows[0].authorid);

          let embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Ticket Resolved!')
            .setTimestamp()
            .setDescription(`Your ticket has been closed by ${interaction.user}.`);

          target.send({ embeds: [embed] }).catch((err) => console.log(err.message));
        }
      });

      let embed = new Discord.MessageEmbed()
        .setDescription(`Thank You for using TEC Support!`)
        .setFooter({ text: 'This channel will be deleted in 2 seconds.' })
        .setColor('GREEN')
        .setTimestamp();

      await interaction.channel.send({ embeds: [embed] });

      try {
        setTimeout(async () => {
          await interaction.channel.delete();
        }, 1000 * 2);
      } catch (error) {
        interaction.channel.send(error.message);
      }

      let logEmbed = new Discord.MessageEmbed()
        .setDescription(`Ticket **\`${interaction.channel.name}\`** deleted by ${interaction.user}`)
        .setTimestamp()
        .setColor('BLURPLE')
        .setTimestamp();

      logsChannel.send({ embeds: [logEmbed] });
      // }
      // else {

      //     let embed = new Discord.MessageEmbed().setDescription(`👮‍♂️ | **Tickets can only be deleted by <@&${
      //         config.coreBasikID
      //     }>!**`).setColor('RED')

      //     await interaction.reply({embeds: [embed], ephemeral: true})
      // }
    } else if (interaction.customId === 'archive_chnl') {
      interaction.deferUpdate();

      let userRolesArray = interaction.member._roles;
      if (userRolesArray.some((item) => allowedRoles.includes(item)) === true) {
        let query = 'UPDATE tickets SET adminid = $1,adminname=$3,ticketstatus=$4 WHERE messageid = $2;';
        let values = [interaction.user.id, interaction.message.id, interaction.user.tag, 'ARCHIVED'];

        sqlDB.query(query, values, (err, res) => {
          if (err) {
            console.log(err);
            interaction.channel.send(`<@540911685582454804> ${err.message}`);
          } else {
            console.log(`${interaction.user.tag} - Admin ticket details updated!`);
          }
        });

        let row2 = new MessageActionRow().addComponents(
          new MessageButton().setCustomId('delete_chnl').setStyle('DANGER').setLabel('Close')
        );

        let archiveCateory = await client.channels.cache.find(
          (c) => c.name === 'Archived Tickets' && c.type === 'GUILD_CATEGORY'
        );

        let embed = new Discord.MessageEmbed()
          .setColor('GREEN')
          .setDescription(`This channel has been archived by **\`${interaction.user.tag}\`**`)
          .setTimestamp();

        try {
          await interaction.channel.setParent(archiveCateory.id);
          // await interaction.channel.setName('archived-ticket')

          await interaction.channel.send({ embeds: [embed], components: [row2] });
        } catch (error) {
          interaction.channel.send(error.message);
        }
      } else {
        let embed = new Discord.MessageEmbed()
          .setDescription(`👮‍♂️ | **Tickets can only be archived by <@&${config.coreBasikID}>!**`)
          .setColor('BLURPLE');

        await interaction.channel.send({ embeds: [embed], ephemeral: true });
      }
    }
  }
});
