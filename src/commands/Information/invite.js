const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'invite',
  category: 'Information',
  aliases: ['addme'],
  description: 'invite Cool',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {
    var invite = client.config.links.invite
    var arisa = client.config.links.arisa;
    var support = client.config.links.support;
    const mainPage = new MessageEmbed()
      .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL()})
      .setColor("#8452fa")
      .setDescription(`>>> • [Click Here To Invite Me To Your Server](${invite})\n• [Click Here To Join My Support Server](${support})`)
    
    message.reply({ embeds: [mainPage] })
  },
};
