const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const delay = require('delay');

module.exports = {
  name: 'vaporwave',
  category: 'Filters',
  aliases: ['vw'],
  description: 'Set VaporWave Filter.',
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
    const msg = await message.channel.send(`<a:pristo_loading:1119466187919740929> | Turning on **Vaporwave**. This may take a few seconds...`);

            const player = client.manager.get(message.guild.id);
            if(!player) return msg.edit(`<:pristo_cross:1119465432588505129> | No songs currently playing in this guild.`);
            const { channel } = message.member.voice;
            if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`<:pristo_cross:1119465432588505129> | You need to be in a same/voice channel.`);

            await player.shoukaku.setFilters({
              op: 'filters',
              guildId: message.guild.id,
              equalizer: [
                { band: 1, gain: 0.3 },
                { band: 0, gain: 0.3 },
              ],
              timescale: { pitch: 0.5 },
              tremolo: { depth: 0.3, frequency: 14 },
            });

        const sbed = new MessageEmbed()
            .setDescription(`<a:pristo_tick:1119464374608855040> | **Vaporwave** Filter Is Now **Enabled**`)
            .setColor("2f3136");

        await delay(5000);
        msg.edit({ content: " ", embeds: [sbed] });
   }
};