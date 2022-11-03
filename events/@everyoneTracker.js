const client = require('../index');
const config = require('../config.json');
const { Permissions } = require('discord.js');

client.on('messageCreate', async (message) => {
  let regex = /(@everyone).*|(@here).*/i;
  let regex2 = /(sell).*|(boost).*|(boosting).*|(buy).*/i;

  if (message.guildId != '606005684886044682') return;

  if (regex.test(message.content)) {
    if (message.member.permissions.has(Permissions.FLAGS.MENTION_EVERYONE) || message.author.bot) {
      return;
    } else if (message.author.bot) return;
    else {
      let logChannel = client.channels.cache.get('693356249995018270');
      logChannel.send(
        `<@540911685582454804> \`@everyone\` tag detected at ${message.channel} by ${message.author}\n${message.url}`
      );
    }
  }
  if (regex2.test(message.content)) {
    if (message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) || message.author.bot) {
      return;
    } else if (message.author.bot) return;
    else {
      let logChannel = client.channels.cache.get('693356249995018270');
      logChannel.send(`<@540911685582454804> Scam detected at ${message.channel} by ${message.author}\n${message.url}`);
    }
  }
});
