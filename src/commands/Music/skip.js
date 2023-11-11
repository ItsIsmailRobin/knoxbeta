const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'skip',
  aliases: ['s'],
  category: 'Music',
  description: 'To skip the current playing song.',
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
    
    if (player.queue.size == 0) {
       let noskip = new MessageEmbed()
       .setColor("8452fa")
       .setDescription(`<:warn:1172442561386909766> | No more songs left in the queue to skip.`);
       return message.reply({ embeds: [noskip] });
   }

    await player.skip();

    let thing = new MessageEmbed()
      .setDescription(`<:tick:1172442564973051954> | **Skipped** - [${player.queue.current.title}]`)
      .setColor("8452fa");
    return message.reply({ embeds: [thing] }).then((msg) => {
      setTimeout(() => {
        msg.delete();
      }, 3000);
    });
  },
};
