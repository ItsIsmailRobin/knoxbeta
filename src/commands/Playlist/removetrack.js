const { MessageEmbed } = require('discord.js');
const db = require('../../schema/playlist');

module.exports = {
  name: 'removetrack',
  aliases: ['plremovet'],
  category: 'Playlist',
  description: 'Removetrack from your saved Playlists.',
  args: true,
  usage: 'playlist name track number to remove track',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {
    const Name = args[0];
    const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });
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
    const Options = args[1];
    if (!Options || isNaN(Options)) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor("2f3136")
            .setDescription(
              `<:pristo_cross:1119465432588505129> | You didn't entered track number (the Track you want to remove (ID OF IT))\nSee all your Tracks: ${prefix}info ${Name}`,
            ),
        ],
      });
    }
    let tracks = data.Playlist;
    if (Number(Options) >= tracks.length || Number(Options) < 0) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor("2f3136")
            .setDescription(
              `<:pristo_cross:1119465432588505129> | Your provided track number is out of Range (\`0\` - ${
                tracks.length - 1
              })\nSee all your Tracks: \`${prefix}info\` showdetails ${Name}`,
            ),
        ],
      });
    }
    await db.updateOne(
      {
        UserId: message.author.id,
        PlaylistName: Name,
      },
      {
        $pull: {
          Playlist: data.Playlist[Options],
        },
      },
    );
    const embed = new MessageEmbed()
      .setColor("2f3136")
      .setDescription(`<a:pristo_tick:1119464374608855040> | Removed **${tracks[Options].title}** from **${Name}**`);
    return message.channel.send({ embeds: [embed] });
  },
};
