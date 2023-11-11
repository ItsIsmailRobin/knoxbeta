const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
  name: 'clear',
  aliases: ['c'],
  category: 'Music',
  description: 'Clear Music Queue',
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

    if (!player.queue) {
      let thing = new MessageEmbed()
        .setColor("8452fa")
        .setDescription('<:warn:1172442561386909766> | No song/s currently playing within this guild.');
      return message.reply({ embeds: [thing] });
    }
    const but = new MessageButton().setCustomId('cqueue').setLabel('Queue').setStyle('SECONDARY');
    const but2 = new MessageButton().setCustomId('cfilter').setLabel('Filter').setStyle('SECONDARY');

    const but_ = new MessageButton()
      .setCustomId('dqueue')
      .setLabel('Queue')
      .setStyle('SECONDARY')
      .setDisabled(true);
    const but_2 = new MessageButton()
      .setCustomId('dfilter')
      .setLabel('Filter')
      .setStyle('SECONDARY')
      .setDisabled(true);


    const row = new MessageActionRow().addComponents(but, but2);

    let thing = new MessageEmbed()
      .setColor("8452fa")
      .setDescription(`**Which one do you want to clear?**`);
    const m = await message.reply({ embeds: [thing], components: [row] });
    const collector = m.createMessageComponentCollector({
      filter: (b) => {
        if (b.user.id === message.author.id) return true;
        else {
          b.reply({
            ephemeral: true,
            content: `<:warn:1172442561386909766> | Only **${message.author.tag}** can use this button, if you want then you've to run the command again.`,
          });
          return false;
        }
      },
      time: 60000,
      idle: 60000 / 2,
    });
    collector.on('end', async () => {
      if (!m) return;
      await m
        .edit({
          components: [
            new MessageActionRow().addComponents(but.setDisabled(true), but2.setDisabled(true)),
          ],
        })
        .catch(() => {});
    });
    collector.on('collect', async (b) => {
      if (!b.deferred) await b.deferUpdate();
      if (b.customId === 'cqueue') {
         if (!player.queue[0]) {
         return await m.edit({ embeds: [new MessageEmbed().setDescription('<:warn:1172442561386909766> | There Is **Nothing** In The Queue').setColor("8452fa")] , components: [] })
    }
        await player.queue.clear();
        await m.edit({
          embeds: [new MessageEmbed().setDescription('**Which one do you want to clear?**').setColor("8452fa")],
          components: [new MessageActionRow().addComponents(but_, but_2)],
        });
        return await m.reply({ embeds: [new MessageEmbed().setDescription('<:tick:1172442564973051954> | Cleared the Queue.').setColor("8452fa")] });
      }

      if (b.customId === 'cfilter') {
        player.shoukaku.clearFilters()
        await m.edit({
          embeds: [new MessageEmbed().setDescription('**Which one do you want to clear?**').setColor("8452fa")],
          components: [new MessageActionRow().addComponents(but_, but_2)],
        });
        return await m.reply({
          embeds: [new MessageEmbed().setDescription('<:tick:1172442564973051954> | Cleared the Filter.').setColor("8452fa")],
        });
      }
    });
  },
};
