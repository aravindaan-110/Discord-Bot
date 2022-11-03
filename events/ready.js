const client = require('../index');
var CronJob = require('cron');
const Discord = require('discord.js');

client.on('ready', async () => {
  console.log(`${client.user.tag} is up and ready to go!`);

  // let logChannel = await client.channels.cache.get('606141551722102807')
  // logChannel.send(`<@540911685582454804> Bot Restarted!`)

  client.user.setActivity('TEC Server', { type: 'WATCHING' });

  async function meetingReminder() {
    let meetChannel = await client.channels.cache.get('606008855863885829');

    let embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('Team Meeting Reminder')
      .setDescription('Gentle reminder to attend the mandatory team meeting on teams!')
      .setFooter({ text: 'Have A Good Day!' });

    meetChannel.send({ embeds: [embed], content: `<@&606006163120717824>` });
  }

  let job1 = new CronJob.CronJob('45 12 * * 2', meetingReminder);
  // job1.start()
});
