const { MessageEmbed } = require('discord.js');
const Wait = require('util').promisify(setTimeout);

module.exports = {
  name: 'stop',
  category: 'Music',
  description: 'Stops the music',
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
    
    player.queue.clear();
    player.data.delete("autoplay")
    player.loop = 'none';
    player.playing = false;
    player.paused = false;
    await player.skip();
    Wait(500);
    let thing = new MessageEmbed()
      .setColor("8452fa")
      .setDescription(`<:tick:1172442564973051954> | Stopped the music`);
    message.reply({ embeds: [thing] });
  },
};
