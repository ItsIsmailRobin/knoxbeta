const { MessageEmbed } = require('discord.js');
const Wait = require('util').promisify(setTimeout);
module.exports = {
  name: 'volume',
  aliases: ['v', 'vol'],
  category: 'Music',
  description: 'Change volume of currently playing music',
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

    if (!args.length) {
      let thing = new MessageEmbed()
        .setColor("8452fa")
        .setDescription(`<:tick:1172442564973051954> | Player Current Volume: **${player.volume * 100}%**`);
      return message.reply({ embeds: [thing] });
    }

    const volume = Number(args[0]);

    if (!volume || volume < 0 || volume > 100) {
      let thing = new MessageEmbed()
        .setColor("8452fa")
        .setDescription(`<:warn:1172442561386909766> | Usage: **${prefix}volume** <Number of volume between 0 - 100>`);
      return message.reply({ embeds: [thing] });
    }

    await player.setVolume(volume / 1);
    Wait(500);
    if (volume > player.volume) {
      let thing = new MessageEmbed()
        .setColor("8452fa")
        .setDescription(`<:vol:1172449732031950890> | Volume set to: **${volume}%**`);
      return message.reply({ embeds: [thing] });
    } else if (volume < player.volume) {
      let thing = new MessageEmbed()
        .setColor("2f3136")
        .setDescription(`<:vol:1172449732031950890> | Volume set to: **${volume}%**`);
      return message.reply({ embeds: [thing] });
    } else {
      let thing = new MessageEmbed()
        .setColor("2f3136")
        .setDescription(`<:vol:1172449732031950890> | Volume set to: **${volume}%**`);
      return message.reply({ embeds: [thing] });
    }
  },
};
