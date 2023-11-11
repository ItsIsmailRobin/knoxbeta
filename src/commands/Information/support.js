const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'support',
  category: 'Information',
  aliases: [],
  description: 'Gives you the link of our support server',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {
    var support = client.config.links.support;

    const embed = new MessageEmbed()
      .setDescription(`>>> • [Click Here To Join Support Server Or Click Below](${support})`)
      .setColor("#8452fa");
    await message.reply({ embeds: [embed] });
  },
};
