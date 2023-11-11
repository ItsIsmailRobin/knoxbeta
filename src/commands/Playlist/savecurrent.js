const { MessageEmbed } = require('discord.js');
const db = require('../../schema/playlist');

module.exports = {
  name: 'savecurrent',
  aliases: ['plsavec'],
  category: 'Playlist',
  description: 'Add current playing song in your saved playlist.',
  args: false,
  usage: 'playlist name',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const Name = args[0];
    const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });
    const player = client.manager.players.get(message.guild.id);
    if (!player.queue.current) {
      let thing = new MessageEmbed().setColor("2f3136").setDescription(`<:pristo_cross:1119465432588505129> | No song/s currently playing within this guild.`);
      return message.reply({ embeds: [thing] });
    }
    if (!data) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor("2f3136")
            .setDescription(`<:pristo_cross:1119465432588505129> | You don't have a playlist with **${Name}** name`),
        ],
      });
    }
    if (data.length == 0) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor("2f3136")
            .setDescription(`<:pristo_cross:1119465432588505129> | You don't have a playlist with **${Name}** name`),
        ],
      });
    }
    const song = player.queue.current;
    let oldSong = data.Playlist;
    if (!Array.isArray(oldSong)) oldSong = [];
    oldSong.push({
      title: song.title,
      uri: song.uri,
      author: song.author,
      duration: song.length,
    });
    await db.updateOne(
      {
        UserId: message.author.id,
        PlaylistName: Name,
      },
      {
        $push: {
          Playlist: {
            title: song.title,
            uri: song.uri,
            author: song.author,
            duration: song.length,
          },
        },
      },
    );
    const embed = new MessageEmbed()
      .setColor("2f3136")
      .setDescription(`<a:pristo_tick:1119464374608855040> | Added [${song.title.substr(0, 256)}](https://discord.gg/freecode) in **${Name}**`);
    return message.channel.send({ embeds: [embed] });
  },
};
