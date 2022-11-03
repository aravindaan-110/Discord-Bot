const client = require('../index');
const config = require('../config.json');

const Discord = require('discord.js');
const Canvas = require('canvas');
const { stripIndents } = require('common-tags/lib');
const moment = require('moment');

client.on('guildMemberAdd', async (member) => {
  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  // console.log(member)

  /* Sends Welcome message to welcome channel */
  let guild = await client.guilds.fetch('606005684886044682');

  const applyText = (canvas, text) => {
    const context = canvas.getContext('2d');

    // Declare a base size of the font
    let fontSize = 55;

    do {
      Canvas.registerFont('Acme.ttf', { family: 'Acme' });
      // Assign the font to the context and decrement it so it can be measured again
      context.font = `${(fontSize -= 10)}px Acme`;
      // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (context.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return context.font;
  };

  // console.log(member.user.id)

  const welcomeChannel = client.channels.cache.get('735398927284699156');

  if (!welcomeChannel) return;

  const canvas = Canvas.createCanvas(700, 300);
  const context = canvas.getContext('2d');

  const background = await Canvas.loadImage(
    'https://media.discordapp.net/attachments/889152536324472852/921387274619457576/Discord-image.png'
  );
  context.drawImage(background, 0, 0, canvas.width, canvas.height);

  context.strokeStyle = '#fff';
  context.lineWidth = 5;
  context.strokeRect(0, 0, canvas.width, canvas.height);

  context.font = applyText(canvas, member.user.username);
  context.fillStyle = '#fff';
  context.fillText(member.user.username, canvas.width / 3.5, canvas.height / 1.73);
  context.moveTo(canvas.width / 2, canvas.height / 1.9);

  context.beginPath();
  context.arc(98, 165, 65, 0, Math.PI * 2, true);
  context.closePath();
  context.strokeStyle = '#ed5923';
  context.lineWidth = 6;
  context.stroke();
  context.clip();

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
  context.drawImage(avatar, 25, 90, 145, 145);

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

  let emoji = await client.emojis.cache.get('921460018723815466');

  let welcEmbed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle(`Welcome to ${guild.name}`)
    .setDescription(
      stripIndents`${emoji} Have a glance at the <#739876731971698738>

  ${emoji} Pick up ur fav. roles from <#739884315445428264>

  ${emoji} Get to know us from <#921347911156129832>`
    )
    .setImage('attachment://welcome-image.png');

  await welcomeChannel.send({
    content: `${member}`,
    files: [attachment],
    embeds: [welcEmbed],
  });

  /* Sends Welcome message to welcome channel */

  // let role = await guild.roles.cache.get("729682406965248041")
  // await member.roles.add(role)
  // .catch(err => {

  //     console.log(err.message)
  // })

  /* Message to the user */

  let embed = new Discord.MessageEmbed()
    .setTitle('About Us')
    .setDescription(
      stripIndents`**When we say ultimate gaming experience, we mean it! Check out all the attractions of AMD presents TEC Arena Bangalore! 
        Scan the QR code to book your free tickets now!**`
    )
    .setColor('#00c7ff')
    .setThumbnail(
      'https://media.discordapp.net/attachments/843706177824751656/997170276678762546/index.jpg?width=671&height=671'
    )
    .setFooter({ text: 'Enjoy And Have Fun!' });

  //   member.send({ embeds: [embed] }).catch((err) => {
  //     console.log(err.message);
  //   });
});
