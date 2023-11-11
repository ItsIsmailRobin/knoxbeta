const { MessageEmbed } = require('discord.js');
const db = require('../../schema/playlist');

module.exports = {
  name: 'savequeue',
  aliases: ['plsaveq'],
  category: 'Playlist',
  description: 'Save current playing queue in your playlist.',
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
    const player = client.manager.players.get(message.guild.id);
    if (!player.queue.current) {
      let thing = new MessageEmbed().setColor("2f3136").setDescription(`<:pristo_cross:1119465432588505129> | No song/s currently playing within this guild.`);
      return message.reply({ embeds: [thing] });
    }
    const data = await db.find({ UserId: message.author.id, PlaylistName: Name });
    if (!data) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor("2f3136")
            .setDescription(`<:pristo_cross:1119465432588505129> | Playlist not found. Please enter the correct playlist name`),
        ],
      });
    }
    if (data.length == 0) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor("2f3136")
            .setDescription(`<:pristo_cross:1119465432588505129> | Playlist not found. Please enter the correct playlist name`),
        ],
      });
    }
    const song = player.queue.current;
    const tracks = player.queue;

    let oldSong = data.Playlist;
    if (!Array.isArray(oldSong)) oldSong = [];
    const newSong = [];
    if (player.queue.current) {
      newSong.push({
        title: song.title,
        uri: song.uri,
        author: song.author,
        duration: song.length,
      });
    }
    for (const track of tracks)
      newSong.push({
        title: track.title,
        uri: track.uri,
        author: track.author,
        duration: track.length,
      });
    const playlist = oldSong.concat(newSong);
    await db.updateOne(
      {
        UserId: message.author.id,
        PlaylistName: Name,
      },
      {
        $set: {
          Playlist: playlist,
        },
      },
    );
    const embed = new MessageEmbed()
      .setDescription(`<a:pristo_tick:1119464374608855040> | Added **${playlist.length - oldSong.length}** song in **${Name}**`)
      .setColor(client.embedColor);
    return message.channel.send({ embeds: [embed] });
  },
};
