const client = require('../index');
const Discord = require('discord.js');
const crypto = require('crypto');

const { Pool } = require('pg');

const { stripIndents } = require('common-tags');

const sqlDB = new Pool({
  user: 'admin',
  host: `${process.env.DB_HOST}`,
  database: 'tecbot',
  password: `${process.env.DB_PASS}@$1234`,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});
sqlDB
  .connect()
  .then(() => console.log('DB 4 connected!'))
  .catch((err) => console.log('DB 4: ', err.message));

const gameRolesID = [
  'valo-user-role-btn',
  'csgo-user-role-btn',
  'pubg-user-role-btn',
  'siege-user-role-btn',
  'codm-user-role-btn',
  'ff-user-role-btn',
  'bgmi-user-role-btn',
];

// let q1 = 'select * from globdata where amount=1;'
// sqlDB.query(q1,(err,res)=>{
//     if(err){
//         console.log(err);
//     }else{
//         global.eventRolesID=res.rows[0].btnids
//     }
// })

const eventRolesID = [
  'comm-r6-cup-btn',
  'pro-spring-r6-q1-role',
  'pro-spring-r6-q2-role',
  'skyweaver-indigg-week4',
  'comm-valo-cup-btn',
  'tec-valo-tourney',
  'tec-valo-tourney-2',
  'amzn-prime-day',
  'apex-mob-btn',
  'r6-pro-fall',
  'fifa-mob-scrims',
  'chal-series-sa',
  'chal-series-sea',
  'comm-cup-pubg-pc',
  'dif-server-qual-1',
  'dif-server-qual-2',
  'dif-server-qualifiers',
  'south-asia-national',
];

client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
    let logChannel = client.channels.cache.get('606141551722102807');

    let embed = new Discord.MessageEmbed()
      .setColor('BLURPLE')
      .setDescription(
        `**\`${interaction.user.tag}\` | \`${interaction.customId}\` | [Message](${interaction.message.url})**`
      )
      .setFooter({ text: `ID: ${interaction.user.id}` });

    logChannel.send({ embeds: [embed] });

    if (gameRolesID.includes(interaction.customId)) {
      var role;

      if (interaction.customId === 'valo-user-role-btn')
        role = await interaction.guild.roles.cache.find((r) => r.name === 'Valorant');
      if (interaction.customId === 'csgo-user-role-btn')
        role = await interaction.guild.roles.cache.find((r) => r.name === 'CS:GO');
      if (interaction.customId === 'pubg-user-role-btn')
        role = await interaction.guild.roles.cache.find((r) => r.name === 'PUBG');
      if (interaction.customId === 'siege-user-role-btn')
        role = await interaction.guild.roles.cache.find((r) => r.name === 'Rainbow Six Siege');
      if (interaction.customId === 'codm-user-role-btn')
        role = await interaction.guild.roles.cache.find((r) => r.name === 'CoDM');
      if (interaction.customId === 'ff-user-role-btn')
        role = await interaction.guild.roles.cache.find((r) => r.id === '702803176222621706');
      if (interaction.customId === 'bgmi-user-role-btn')
        role = await interaction.guild.roles.cache.find((r) => r.id === '923534202668974100');

      let embed = new Discord.MessageEmbed()
        .setDescription(`✅ | Welcome to the **\`TEC ${role.name}\`** Community!`)
        .setColor('GREEN');

      let embed2 = new Discord.MessageEmbed()
        .setColor('RED')
        .setDescription(`😿 | You have now left the **\`${role.name}\`** Community. We hope to see you return!`);

      if (interaction.member._roles.includes(role.id)) {
        interaction.member.roles.remove(role).then(() => {
          interaction.reply({ embeds: [embed2], ephemeral: true });
        });
      } else {
        interaction.member.roles.add(role).then(() => {
          interaction.reply({ embeds: [embed], ephemeral: true });
        });
      }
    } else if (eventRolesID.includes(interaction.customId)) {
      var role;

      if (interaction.customId === 'comm-r6-cup-btn')
        role = await interaction.guild.roles.cache.find((r) => r.id === '1002597468317425745');
      if (interaction.customId === 'comm-valo-cup-btn')
        role = await interaction.guild.roles.cache.find((r) => r.id === '982591037983838248');
      if (interaction.customId === 'pro-spring-r6-q1-role')
        role = await interaction.guild.roles.cache.find((r) => r.id === '970937046552174624');
      if (interaction.customId === 'pro-spring-r6-q2-role')
        role = await interaction.guild.roles.cache.find((r) => r.id === '973520061975367730');

      if (interaction.customId === 'skyweaver-indigg-week4')
        role = await interaction.guild.roles.cache.find((r) => r.id === '998954173250932796');

      if (interaction.customId === 'tec-valo-tourney')
        role = await interaction.guild.roles.cache.find((r) => r.id === '994258667010531518');
      if (interaction.customId === 'tec-valo-tourney-2')
        role = await interaction.guild.roles.cache.find((r) => r.id === '995663204485185556');

      if (interaction.customId === 'apex-mob-btn')
        role = await interaction.guild.roles.cache.find((r) => r.id === '1010123514969329744');
      if (interaction.customId === 'r6-pro-fall')
        role = await interaction.guild.roles.cache.find((r) => r.id === '1015253478941147196');
      if (interaction.customId === 'fifa-mob-scrims')
        role = await interaction.guild.roles.cache.find((r) => r.id === '1021694594435514409');

      if (interaction.customId === 'chal-series-sa')
        role = await interaction.guild.roles.cache.find((r) => r.id === '1023914760166711357');
      if (interaction.customId === 'chal-series-sea')
        role = await interaction.guild.roles.cache.find((r) => r.id === '1023914887338020874');
      if (interaction.customId === 'comm-cup-pubg-pc')
        role = await interaction.guild.roles.cache.find((r) => r.id === '1023918123486826576');

      // [GXR] Valorant India Invitational
      if (interaction.customId === 'dif-server-qual-1')
        role = await interaction.guild.roles.cache.find((r) => r.id === '1028213645097844746');
      if (interaction.customId === 'dif-server-qual-2')
        role = await interaction.guild.roles.cache.find((r) => r.id === '1028213719399927849');
      if (interaction.customId === 'dif-server-qualifiers')
        role = await interaction.guild.roles.cache.find((r) => r.id === '1028213808621170749');

      if (interaction.customId === 'south-asia-national')
        role = await interaction.guild.roles.cache.find((r) => r.id === '1027868506206765057');

      console.log(role.name);

      if (interaction.member._roles.includes(role.id)) {
        interaction.member.roles.remove(role.id).then(() => {
          let emb = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`❌ | You have been removed from the ${role.name} role.`);

          interaction.reply({ embeds: [emb], ephemeral: true });
        });
      } else {
        let embed = new Discord.MessageEmbed()
          .setColor('GREEN')
          .setDescription(`✅ | You have been given the ${role.name} role.`);

        interaction.member.roles.add(role).then(() => {
          interaction.reply({ embeds: [embed], ephemeral: true });
        });
      }
    }
  }
});
