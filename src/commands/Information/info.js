const { MessageEmbed, version, MessageButton, MessageActionRow } = require('discord.js');
const os = require('os');
let cpuStat = require("cpu-stat");
module.exports = {
  name: 'status',
  category: 'Information',
  aliases: ['stats', 'botinfo', 'bi'],
  description: 'Show status bot',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {

    let uptime = await os.uptime();

    let d = Math.floor(uptime / (3600 * 24));
    let h = Math.floor(uptime % (3600 * 24) / 3600);
    let m = Math.floor(uptime % 3600 / 60);
    let s = Math.floor(uptime % 60);
    let dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
    let hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    let mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    let sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    let ccount = client.channels.cache.size;
    let scount = client.guilds.cache.size;
    let mcount = 0;
    client.guilds.cache.forEach((guild) => {
      mcount += guild.memberCount;
    });
    cpuStat.usagePercent(function (err, percent, seconds) {
      if (err) {
        return console.log(err);
      }

      const all = [...client.manager.shoukaku.nodes.values()].map(node =>
        `${Math.round(node.stats.memory.reservable / 1024 / 1024)}mb`).join('\n\n----------------------------\n');

      
    const embed = new MessageEmbed()
      .setThumbnail('https://i.postimg.cc/ZRv7RzMp/last-logo.png')
    .setAuthor({name:`KnoX Music™ Stats`,
    iconURL:client.user.displayAvatarURL()})
      //.setThumbnail(client.user.displayAvatarURL())
      .setDescription(`Hey, It's **KnoX Music™** A Quality Music Bot With Breathtaking Features.\n\n**__Pristo™ info__**\n- **Online Since:** ${dDisplay+ hDisplay + mDisplay+ sDisplay}\n- **Servers:** ${scount}\n- **Ping:** ${Math.round(client.ws.ping)}ms\n- **Database Ping:** 0\n- **Users:** Total ${mcount} Members\n- **Commands:** Total ${client.commands.size} | Usable by you (here): 50\n\n**__ Current Channels__**\n<:inv:1172439551151706162> Text : 0 | <:inv:1172439551151706162> Voice : 0 | <:inv:1172439551151706162> Stage :  0\n**__System__**\n**RAM:** 685mb\n**CPU:** 2.8%`)
      .setColor("#8452fa")
      .setTimestamp()
      .setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})

      const row = new MessageActionRow().addComponents(
        new MessageButton().setLabel('Invite').setStyle('LINK').setURL(client.config.links.invite).setEmoji('<a:zappppp:1172432098087415848>'),
        
        new MessageButton()
        .setLabel('Support Server')
        .setStyle('LINK')
        .setEmoji('<:term:1172433937885311018>')
        .setURL(client.config.links.support)
          );

    message.reply({ embeds: [embed], components: [row] });
    });
}
};