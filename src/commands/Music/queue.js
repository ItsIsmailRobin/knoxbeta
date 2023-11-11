const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { convertTime } = require('../../utils/convert.js');
const load = require('lodash');

module.exports = {
  name: 'queue',
  category: 'Music',
  aliases: ['q'],
  description: 'Show the music queue and now playing.',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: true,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.players.get(message.guild.id);

    if (!player.queue.current)
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("8452fa")
            .setDescription(`<:warn:1172442561386909766> | No song/s currently playing within this guild.`),
        ],
      });

    if (player.queue.length === '0' || !player.queue.length) {
      const embed = new MessageEmbed()
        .setColor("8452fa")
        .setDescription(
          `**Now playing** [${player.queue.current.title}] \`[ ${
            player.queue.current.isStream ? '◉ LIVE' : convertTime(player.queue.current.length)
          } ]\` • [${player.queue.current.requester}]`,
        );

      await message.channel
        .send({
          embeds: [embed],
        })
        .catch(() => {});
    } else {
      const queuedSongs = player.queue.map(
        (t, i) =>
          `\`[ ${++i} ]\` • [${t.title}](${t.uri}) • \`[ ${
            t.isStream ? '◉ LIVE' : convertTime(t.length)
          } ]\` • [${t.requester}]`,
      );

      const mapping = load.chunk(queuedSongs, 10);
      const pages = mapping.map((s) => s.join('\n'));
      let page = 0;

      if (player.queue.length < 11) {
        const embed = new MessageEmbed()
          .setColor("8452fa")
          .setDescription(
            `**Now playing**\n[${player.queue.current.title}] \`[ ${
              player.queue.current.isStream ? '[**◉ LIVE**]' : convertTime(player.queue.current.length)
            } ]\` • [${player.queue.current.requester}]\n\n**Queued Songs**\n${pages[page]}`,
          )
          .setFooter({
            text: `Page ${page + 1}/${pages.length}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setThumbnail(
            `${
              player.queue.current.thumbnail
                ? player.queue.current.thumbnail
                : `https://img.spotify.com/track/${player.queue.current.identifier}/hqdefault.jpg`
            }`,
          )
          .setTitle(`Queue - ${message.guild.name}`);

        await message.channel.send({
          embeds: [embed],
        });
      } else {
        const embed2 = new MessageEmbed()
          .setColor("8452fa")
          .setDescription(
            `**Now playing**\n[${player.queue.current.title}] \`[ ${
              player.queue.current.isStream ? '[**◉ LIVE**]' : convertTime(player.queue.current.length)
            } ]\` • [${player.queue.current.requester}]\n\n **Queued Songs**\n${pages[page]}`,
          )
          .setFooter({
            text: `Page ${page + 1}/${pages.length}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setThumbnail(
            `${
              player.queue.current.thumbnail
                ? player.queue.current.thumbnail
                : `https://img.spotify.com/track/${player.queue.current.identifier}/hqdefault.jpg`
            }`,
          )
          .setTitle(`${message.guild.name} Queue`);

        const but1 = new MessageButton()
          .setCustomId('queue_cmd_but_1')
          .setLabel('>>')
          .setStyle('SECONDARY');

        const but2 = new MessageButton()
          .setCustomId('queue_cmd_but_2')
          .setLabel('<<')
          .setStyle('SECONDARY');

        const but3 = new MessageButton()
          .setCustomId('queue_cmd_but_3')
          .setEmoji('<:warn:1172442561386909766>')
          .setStyle('DANGER');

        const row1 = new MessageActionRow().addComponents([but2, but3, but1]);

        const msg = await message.channel.send({
          embeds: [embed2],
          components: [row1],
        });

        const collector = msg.createMessageComponentCollector({
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
          time: 60000 * 5,
          idle: 30e3,
        });

        collector.on('collect', async (button) => {
          if (button.customId === 'queue_cmd_but_1') {
            await button.deferUpdate().catch(() => {});
            page = page + 1 < pages.length ? ++page : 0;

            const embed3 = new MessageEmbed()
              .setColor("8452fa")
              .setDescription(
                `**Now playing**\n[${player.queue.current.title}] \`[ ${
                  player.queue.current.isStream ? '[**◉ LIVE**]' : convertTime(player.queue.current.length)
                } ]\` • [${player.queue.current.requester}]\n\n**Queued Songs**\n${pages[page]}`,
              )
              .setFooter({
                text: `Page ${page + 1}/${pages.length}`,
                iconURL: message.author.displayAvatarURL({ dynamic: true }),
              })
              .setThumbnail(
                `${
                  player.queue.current.thumbnail
                    ? player.queue.current.thumbnail
                    : `https://img.spotify.com/track/${player.queue.current.identifier}/hqdefault.jpg`
                }`,
              )
              .setTitle(`Queue - ${message.guild.name}`);

            await msg.edit({
              embeds: [embed3],
              components: [row1],
            });
          } else if (button.customId === 'queue_cmd_but_2') {
            await button.deferUpdate().catch(() => {});
            page = page > 0 ? --page : pages.length - 1;

            const embed4 = new MessageEmbed()
              .setColor("8452fa")
              .setDescription(
                `**Now playing**\n[${player.queue.current.title}] \`[ ${
                  player.queue.current.isStream ? '[**◉ LIVE**]' : convertTime(player.queue.current.length)
                } ]\` • [${player.queue.current.requester}]\n\n**Queued Songs**\n${pages[page]}`,
              )

              .setFooter({
                text: `Page ${page + 1}/${pages.length}`,
                iconURL: message.author.displayAvatarURL({ dynamic: true }),
              })
              .setThumbnail(
                `${
                  player.queue.current.thumbnail
                    ? player.queue.current.thumbnail
                    : `https://img.spotify.com/track/${player.queue.current.identifier}/hqdefault.jpg`
                }`,
              )
              .setTitle(`Queue - ${message.guild.name}`);

            await msg
              .edit({
                embeds: [embed4],
                components: [row1],
              })
              .catch(() => {});
          } else if (button.customId === 'queue_cmd_but_3') {
            await button.deferUpdate().catch(() => {});
            collector.stop();
          } else return;
        });

        collector.on('end', async () => {
          await msg.edit({
            components: [],
          });
        });
      }
    }
  },
};
