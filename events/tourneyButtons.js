const client = require('../index');
const Discord = require('discord.js');

client.on('interactionCreate', async (interaction) => {
  const menuValues = [
    'zotac-sea-role-menu',
    'zotac-sa-role-menu',
    'epwa-valo-role-menu',
    'epwa-poke-role-menu',
    'epwa-ff-role-menu',
    'rog-s4-role-menu',
  ];

  // Role Menu

  if (interaction.isSelectMenu()) {
    if (menuValues.includes(interaction.values[0])) {
      console.log(interaction.values[0]);

      var role;

      if (interaction.values[0] === 'rog-s4-role-menu')
        role = await interaction.guild.roles.cache.find((r) => r.id === '923121645718233158');

      if (interaction.values[0] === 'zotac-sea-role-menu')
        role = await interaction.guild.roles.cache.find((r) => r.id === '923554723506847784');

      if (interaction.values[0] === 'zotac-sa-role-menu')
        role = await interaction.guild.roles.cache.find((r) => r.id === '923554804356223017');

      if (interaction.values[0] === 'epwa-valo-role-menu')
        role = await interaction.guild.roles.cache.find((r) => r.id === '925360342459113502');

      if (interaction.values[0] === 'epwa-poke-role-menu')
        role = await interaction.guild.roles.cache.find((r) => r.id === '925301679828635668');

      if (interaction.values[0] === 'epwa-ff-role-menu')
        role = await interaction.guild.roles.cache.find((r) => r.id === '925302111661613066');

      let embed = new Discord.MessageEmbed()
        .setDescription(`✅ | You Have Been Given **\`${role.name}\`** role!`)
        .setColor('GREEN');

      let embed2 = new Discord.MessageEmbed()
        .setColor('RED')
        .setDescription(`<:x_:923125529475960862> | You Have Been Removed From **\`${role.name}\`** role!`);

      if (interaction.member._roles.includes(role.id)) {
        interaction.member.roles.remove(role.id).then(() => {
          interaction.reply({ embeds: [embed2], ephemeral: true });
        });
      } else {
        interaction.member.roles.add(role).then(() => {
          interaction.reply({ embeds: [embed], ephemeral: true });
        });
      }
    }
  }
});
