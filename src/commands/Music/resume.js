const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'resume',
  aliases: ['r'],
  category: 'Music',
  description: 'Resume currently playing music',
  args: false,
  usage: 'Number of song in queue',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  dj: true,
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.players.get(message.guild.id);
    const song = player.queue.current;

    if (!player.queue.current) {
      let thing = new MessageEmbed().setColor("8452fa").setDescription('<:warn:1172442561386909766> | No song/s currently playing within this guild.');
      return message.reply({ embeds: [thing] });
    }

    const emojiresume = client.emoji.resume;

    if (!player.shoukaku.paused) {
      let thing = new MessageEmbed()
        .setColor("8452fa")
        .setDescription(`<:warn:1172442561386909766> | The player is already **resumed**.`);
      return message.reply({ embeds: [thing] });
    }

    await player.pause(false);

    let thing = new MessageEmbed()
      .setDescription(`<:tick:1172442564973051954> | **Resumed** - [${song.title}]`)
      .setColor("8452fa");
    return message.reply({ embeds: [thing] });
  },
};
