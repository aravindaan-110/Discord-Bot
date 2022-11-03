const client = require('../index');
const config = require('../config.json');

client.on('channelCreate', async (channel) => {
  if (channel.type === 'GUILD_CATEGORY') return;

  if (channel.name.includes('︱')) return;

  let chnName = channel.name;
  channel.setName(`︱${chnName}`);
});
