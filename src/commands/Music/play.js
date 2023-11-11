const { MessageEmbed, Permissions } = require('discord.js');
const { convertTime } = require('../../utils/convert.js');

module.exports = {
  name: 'play',
  category: 'Music',
  aliases: ['p'],
  description: 'Plays audio from YouTube or Soundcloud',
  args: true,
  usage: 'Song URL or Name To Play',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {

    const youtube = new MessageEmbed()
        .setColor("8452fa")
        .setDescription(`<:warn:1172442561386909766> | We Don't Support This Platform. \n But you can copy whole YouTube Title and paste it here for play from YouTube.`)

    

    if (!message.guild.members.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK]))
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("8452fa")
            .setDescription(
              `<:warn:1172442561386909766> | I don't have enough permissions to execute this command! please give me permission \`CONNECT\` or \`SPEAK\`.`,
            ),
        ],
      });
    const emojiaddsong = message.client.emoji.addsong;
    const emojiplaylist = message.client.emoji.playlist;

    const { channel } = message.member.voice;

    if (
      !message.guild.members.me
        .permissionsIn(channel)
        .has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])
    )
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("8452fa")
            .setDescription(
              `<:warn:1172442561386909766> | I don't have enough permissions connect your vc please give me permission \`CONNECT\` or \`SPEAK\`.`,
            ),
        ],
      });
    const query = args.join(' ');

    const player = await client.manager.createPlayer({
      guildId: message.guild.id,
      voiceId: message.member.voice.channel.id,
      textId: message.channel.id,
      deaf: true,
    });

    const result = await player.search(query, { requester: message.author });

    if (!result.tracks.length) return message.reply({ content: '<:warn:1172442561386909766> | No result was found' });

    const tracks = result.tracks;

   if (result.type === 'PLAYLIST') for (let track of tracks) player.queue.add(track);
   else player.queue.add(tracks[0]);

   if (!player.playing && !player.paused) player.play();
    return message.reply(
      result.type === 'PLAYLIST'
        ? {
            embeds: [
              new MessageEmbed()
                .setColor("8452fa")
                .setDescription(
                  `<:tick:1172442564973051954> | Queued **${tracks.length}** from **${result.playlistName}**`,
                ),
            ],
          }
        : {
            embeds: [
              new MessageEmbed()
                .setColor("8452fa")
                .setDescription(`<:tick:1172442564973051954> | Queued - **${tracks[0].title}**`),
            ],
          },
    );
  },
};
