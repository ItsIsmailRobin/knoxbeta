const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const delay = require('delay');

module.exports = {
  name: 'equalizer',
  category: 'Filters',
  aliases: ['eq', 'equalizer'],
  description: 'Set Equalizer Filter',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: true,
  dj: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const msg = await message.channel.send(`<a:pristo_loading:1119466187919740929> | Turning on **Equalizer**. This may take a few seconds...`);

    const player = client.manager.get(message.guild.id);
    if(!player) return msg.edit(`<:pristo_cross:1119465432588505129> | No songs currently playing in this guild.`);
    const { channel } = message.member.voice;
    if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`<:pristo_cross:1119465432588505129> | You need to be in a same/voice channel.`);

    await player.shoukaku.setFilters({
      op: 'filters',
      guildId: message.guild.id,
      equalizer: [
        { band: 0, gain: 0.375 },
        { band: 1, gain: 0.35 },
        { band: 2, gain: 0.125 },
        { band: 3, gain: 0 },
        { band: 4, gain: 0 },
        { band: 5, gain: -0.125 },
        { band: 6, gain: -0.125 },
        { band: 7, gain: 0 },
        { band: 8, gain: 0.25 },
        { band: 9, gain: 0.125 },
        { band: 10, gain: 0.15 },
        { band: 11, gain: 0.2 },
        { band: 12, gain: 0.25 },
        { band: 13, gain: 0.35 },
        { band: 14, gain: 0.4 },
      ],
    });

const sbed = new MessageEmbed()
    .setDescription(`<a:pristo_tick:1119464374608855040> | **Equalizer** Filter Is Now **Enabled**`)
    .setColor("2f3136");

await delay(5000);
msg.edit({ content: " ", embeds: [sbed] });
}
};
