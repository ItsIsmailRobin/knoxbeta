const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'loop',
  aliases: ['l'],
  category: 'Music',
  description: 'Toggle music loop',
  args: true,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  dj: true,
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.players.get(message.guild.id);

    if (!player.queue.current) {
      let thing = new MessageEmbed().setColor("8452fa").setDescription('<:warn:1172442561386909766> | No song/s currently playing within this guild.');
      return message.reply({ embeds: [thing] });
    }

    if (['q', 'queue'].includes(args[0])) {
      await player.setLoop('queue');
      let thing = new MessageEmbed()
        .setColor("8452fa")
        .setDescription(`<:tick:1172442564973051954> | Loop queue is now **enable**`);
      return message.reply({ embeds: [thing] });
    } else if (['track', 't', 'song'].includes(args[0])) {
      await player.setLoop('track');

      let thing = new MessageEmbed()
        .setColor("8452fa")
        .setDescription(`<:tick:1172442564973051954> | Loop track is now **enable**`);
      return message.reply({ embeds: [thing] });
    } else if (['off', 'c', 'clear', 'reset'].includes(args[0])) {
      await player.setLoop('none');

      let thing = new MessageEmbed()
        .setColor("8452fa")
        .setDescription(`<:tick:1172442564973051954> | Loop is now **disabled**`);
      return message.reply({ embeds: [thing] });
    }
  },
};
