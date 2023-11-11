const { MessageEmbed, Client, MessageButton, MessageActionRow } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const { trackStartEventHandler } = require("../../utils/functions");
const db = require("../../schema/setup");
const { KazagumoPlayer, KazagumoTrack } = require("kazagumo");
const lyricsfinder = require('lyrics-finder');
const moment = require(`moment`);
require(`moment-duration-format`);

module.exports = {
	name: "playerStart",
	/**
	 * 
	 * @param {Client} client 
	 * @param {KazagumoPlayer} player 
	 * @param {KazagumoTrack} track 
	 */


	run: async (client, player, track) => {

    let url = track.uri;
        if(url.includes("youtube.com"))
        {
            url = ""
        }

        let duration = moment.duration(player.queue.current.length).format("hh:mm:ss");
        if(duration < 10)
        {
            player.skip();
            const embed = new MessageEmbed().setColor("#8452fa").setDescription(`I am skipping this track as its duration is less than 10 seconds`)
            const sahil = await client.channels.cache.get(player.textId)?.send({ embeds: [embed] });
        }
		let guild = client.guilds.cache.get(player.guildId);
		if (!guild) return;

		let channel = guild.channels.cache.get(player.textId);
		if (!channel) return;
		
		let data = await db.findOne({ Guild: guild.id });

		if (data && data.Channel) {
			let textChannel = guild.channels.cache.get(data.Channel);
			const id = data.Message;
			if (channel === textChannel) {
				return await trackStartEventHandler(id, textChannel, player, track, client);
			} else {
				await trackStartEventHandler(id, textChannel, player, track, client);
			};
		}
		const emojiplay = client.emoji.play;

		const thing = new MessageEmbed()
        .addFields([
        {
          name: '<:knox:1097455999117447168> **Now Playing :**',
				  value: `${track.title} \n By **${track.author}**`,
				  inline: false,
        },
				{
				  name: '<:duration:1172452066791272448> **Duration : **',
				  value: `❯  ${moment.duration(player.queue.current.length).format("hh:mm:ss")}`,
				  inline: true,
				},
				{
				  name: '<:stage:1172451522697764924> Requested by : ',
				  value: `${track.requester ? track.requester : `<@${client.user.id}>`}`,
				  inline: true,
				},
          {
            name: '\n <:purple:1172430793222672394> **KnoX Music Developed By :**',
            value: '<@575261186438987781><a:zappppp:1172432098087415848>',
            inline: true,
          },
			  ])
      
      .setFooter({
        text: `KnoX Music v𝟮.𝟬.𝟭`,
      })
        .setThumbnail(`${track.thumbnail ? track.thumbnail : `https://img.spotify.com/track/${track.identifier}/hqdefault.jpg`}`)
        .setColor("#8452fa")
    
      const row = new  MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId("pause")
            .setEmoji("1172476946869911642")
          .setStyle("SECONDARY")
        )
        .addComponents(
          new MessageButton()
            .setCustomId("skip")
            .setEmoji("1172476953433997312")
            .setStyle("SECONDARY")
        )
        .addComponents(
          new MessageButton()
            .setCustomId("loop")
            .setEmoji("1172476944961519636")
            .setStyle("SECONDARY")
        )
        .addComponents(
          new MessageButton()
            .setCustomId("stop")
            .setEmoji("1172476956789452810")
            .setStyle("DANGER")
        )
       

    const row2 = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId("resume")
            .setEmoji("1172476950162448445")
          .setStyle("SECONDARY")
        )
        .addComponents(
          new MessageButton()
            .setCustomId("skip")
            .setEmoji("1172476953433997312")
            .setStyle("SECONDARY")
        )
        .addComponents(
          new MessageButton()
            .setCustomId("loop")
            .setEmoji("1172476944961519636")
            .setStyle("SECONDARY")
        )
        .addComponents(
          new MessageButton()
            .setCustomId("stop")
            .setEmoji("1172476956789452810")
            .setStyle("DANGER")
        )
        
      

      const nplaying = await client.channels.cache.get(player.textId)?.send({ embeds: [thing], components: [row, ] });
      const filter = (message) => {
        if(message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId === message.member.voice.channelId) return true;
        else {
          message.reply({ content: `<:warn:1172442561386909766> | You need to be in a same/voice channel to use this button.`, ephemeral: true });
        }
      };
      const collector = nplaying.createMessageComponentCollector({ filter, time: track.duration });

      collector.on('collect', async (message) => {
        const id = message.customId;
        if(id === "pause") {
          if(!player) {
            collector.stop();
          }
  
            player.pause(true);
  
            const embed = new MessageEmbed()
                .setAuthor({ name: ' | Song Has Been Paused', iconURL: client.user.displayAvatarURL()})
                .setColor("8452fa");
  
            await nplaying.edit({ embeds: [thing], components: [row2] });
            message.reply({ embeds: [embed], ephemeral: true });
          } else if (id === "resume") {
            if(!player) {
              collector.stop();
            }
  
            player.pause(false);
  
            const embed = new MessageEmbed()
              .setAuthor({ name: ' | Song Has Been Resumed', iconURL: client.user.displayAvatarURL()})
                .setColor("8452fa");
            
            await nplaying.edit({ embeds: [thing], components: [row] });
            message.reply({ embeds: [embed], ephemeral: true });
          } else if (id === "skip") {
            if(!player) {
              collector.stop();
            }
  
            player.skip();
  
            const embed = new MessageEmbed()
              .setAuthor({ name: ' | Song Has Been Skipped', iconURL: client.user.displayAvatarURL()})
                .setColor("8452fa");
  
            message.reply({ embeds: [embed], ephemeral: true });
          } else if(id === "stop") {
            if(!player) {
              collector.stop();
            }
  
            player.queue.clear();
            player.data.delete("autoplay")
            player.loop = 'none';
            player.playing = false;
            player.paused = false;
            await player.skip();
  
            const embed = new MessageEmbed()
                .setAuthor({ name: ' | Song Has Been Stopped', iconURL: client.user.displayAvatarURL()})
                .setColor("8452fa");
            
            await nplaying.edit({ embeds: [thing], components: [] });
            message.reply({ embeds: [embed], ephemeral: true });
          } else if(id === "shuffle") {
            if(!player) {
              collector.stop();
            }
            player.queue.shuffle();
  
            const embed = new MessageEmbed()
                .setAuthor({ name: ' | Sucessfully shuffle', iconURL: client.user.displayAvatarURL()})
                .setColor("8452fa");
  
            message.reply({ embeds: [embed], ephemeral: true });
          } else if(id === "loop") {
            if(!player) {
              collector.stop();
            }
          player.setLoop('queue');
      player.setLoop('track');
            const Text = player.Loop
          ? `Enable`
          : `Disabled`;
  
            const embed = new MessageEmbed()
                .setAuthor({ name: ` | Loop track is now Enabled`, iconURL: client.user.displayAvatarURL()})
                .setColor("8452fa");
            await nplaying.edit({ embeds: [thing] });
            message.reply({ embeds: [embed], ephemeral: true });
          }
      });
      return;
   }
  };