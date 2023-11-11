const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'shuffle',
  category: 'Music',
  description: 'Shuffle queue',
  args: false,
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
    let thing = new MessageEmbed()
      .setDescription(`<:tick:1172442564973051954> | Shuffled the queue`)
      .setColor("8452fa");
    await player.queue.shuffle();
    return message.reply({ embeds: [thing] }).catch((error) => client.logger.log(error, 'error'));
  },
};
