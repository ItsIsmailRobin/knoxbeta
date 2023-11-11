const { MessageEmbed } = require('discord.js');
const db = require('../../schema/playlist');

module.exports = {
  name: 'create',
  aliases: ['plcreate'],
  category: 'Playlist',
  description: "Creates the user's playlist.",
  args: true,
  usage: 'playlist name to create playlist.',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const Name = args[0];
    if (Name.length > 10) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor("2f3136")
            .setDescription('<:pristo_cross:1119465432588505129> | Playlist Name Cant Be Greater Than `10` Charecters'),
        ],
      });
    }
    let data = await db.find({
      UserId: message.author.id,
      PlaylistName: Name,
    });

    if (data.length > 0) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor("2f3136")
            .setDescription(
              `<:pristo_cross:1119465432588505129> | This playlist already Exists! delete it using: \`${prefix}\`delete \`${Name}\``,
            ),
        ],
      });
    }
    let userData = db.find({
      UserId: message.author.id,
    });
    if (userData.length >= 10) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor("2f3136")
            .setDescription(`<:pristo_cross:1119465432588505129> | You Can Only Create \`10\` Playlist`),
        ],
      });
    }

    const newData = new db({
      UserName: message.author.tag,
      UserId: message.author.id,
      PlaylistName: Name,
      CreatedOn: Math.round(Date.now() / 1000),
    });
    await newData.save();
    const embed = new MessageEmbed()
      .setDescription(`<a:pristo_tick:1119464374608855040> | Successfully created a playlist for you **${Name}**`)
      .setColor("2f3136");
    return message.channel.send({ embeds: [embed] });
  },
};
