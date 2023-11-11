const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
  name: 'join',
  aliases: ['j'],
  category: 'Music',
  description: 'Join voice channel',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {

    const { channel } = message.member.voice;
    const player = client.manager.players.get(message.guild.id);
    if (player) {
      return await message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("8452fa")
            .setDescription(`<:warn:1172442561386909766> | I'm already connected to <#${player.voiceId}> voice channel!`),
        ],
      });
    } else {
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

      await client.manager.createPlayer({
        guildId: message.guild.id,
        voiceId: message.member.voice.channel.id,
        textId: message.channel.id,
        deaf: true,
      });

      let thing = new MessageEmbed()
        .setColor("8452fa")
        .setDescription(
          `<:tick:1172442564973051954> | **Join the voice channel**\nJoined <#${channel.id}> and bound to <#${message.channel.id}>`,
        );
      return message.reply({ embeds: [thing] });
    }
  },
};
