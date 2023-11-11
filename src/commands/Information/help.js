const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');

module.exports = {
  name: 'help',
  category: 'Information',
  aliases: ['h'],
  description: 'Return all commands, or one specific command',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {
    var invite = client.config.links.invite;
    var support = client.config.links.support;
    var topgg = client.config.links.topgg;
    var nutz = client.config.links.nutz

  let categories = [];
        let cots = [];

        if (!args[0]) {

           let helpmenu = new MessageEmbed()
           .setAuthor({name : `KnoX Music™ Help Panel` , iconURL : client.user.displayAvatarURL()})
           .setThumbnail(client.user.displayAvatarURL( {dynamic : true }))
         .setDescription(`**Hey** <@${message.author.id}>**,** \n **I am** <@984846357653254174>**.**\n
**A Discord Music Bot With Many Awesome Features, Buttons, Menus, Context Menu, Lossless Quality With YouTube & Spotify, Customizable Settings.**\n
<a:zappppp:1172432098087415848> **Help Related To KnoX Music's Commands:**\n
<:1870book:1172426496732844123> **: Information**
<:8171youtube:1172426486645542922> **: Music**
<:5223link:1172426490256834650> **: Playlist**
<:6588hot:1172426483147477043> **: Filters**
<:settings:1172429754247434261> **: Settings**\n
<:6292goodconnection:1172426172748021830> **Bot Ping : ${Math.round(client.ws.ping)}ms**\n
<:purple:1172430793222672394> **Developed By : **<@575261186438987781>\n
<:star:1172430019692347462> **Select A Category Form The Menu Below.**\n
<:term:1172433937885311018> **[Invite Me](https://discord.com/api/oauth2/authorize?client_id=984846357653254174&permissions=20016384&scope=bot
)** • **[Support Server](https://discord.gg/EttmFjhhq5)**`)
        .setColor("#8452fa")
        .setFooter({
            text: `Thanks for choosing KnoX Music!`,
            iconURL: "https://i.postimg.cc/d3047PpT/1097455999117447168.png",
          })
          
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('helpop')
                .setPlaceholder('Click Me!')
                .addOptions([
                {
                    label : `Home`,
                    //description: 'Get Home Page',
                    emoji : `<:25694:1172429764615733318> `,
                    value : `h1`,
                },
                {
                    label: 'Information',
                    //description: 'Get All Information Command List',
                    value: 'h2',
                    emoji: '<:1870book:1172426496732844123>',
                },
                {
                    label: 'Music',
                    //description: 'Get All Music Command List',
                    value: 'h3',
                    emoji: '<:8171youtube:1172426486645542922>',
                },
                {
                    label: 'Playlist',
                    //description: 'Get All Playlist Command List',
                    value: 'h4',
                    emoji: '<:5223link:1172426490256834650>', 
                },
                {
                    label: 'Filters',
                    //description: 'Get All Filters Command List',
                    value: 'h5',
                    emoji: '<:6588hot:1172426483147477043>', 
                },
                {
                    label: 'Settings',
                    //description: 'Get All Settings Command List',
                    value: 'h6',
                    emoji: '<:settings:1172429754247434261>',
                }
            ])
        )
      

        const msg = await message.channel.send({embeds: [helpmenu], components: [row]});
        let page = 0;
        let _commands;

         let embed1 = new MessageEmbed().setColor("#8452fa").setDescription(`\`help\`, \`invite\`, \`ping\`, \`stats\`, \`support\`, \`uptime\``).setAuthor({name : `| Information Commands` , iconURL : client.user.displayAvatarURL()}).setFooter({ text: ``, iconURL: "", }).setThumbnail(client.user.displayAvatarURL( {dynamic : true }))
        let embed2 = new MessageEmbed().setColor("#8452fa").setDescription(`\`autoplay\`, \`clear\`, \`join\`, \`leave\`, \`loop\`, \`pause\`, \`play\`, \`queue\`, \`resume\`, \`remove\`, \`shuffle\`, \`skip\`, \`stop\`, \`volume\``).setAuthor({name : `| Music Commands` , iconURL : client.user.displayAvatarURL()}).setFooter({ text: ``, iconURL: "", }).setThumbnail(client.user.displayAvatarURL( {dynamic : true }))
        let embed3 = new MessageEmbed().setColor("#8452fa").setDescription(`\`create\`, \`delete\`, \`info\`, \`list\`, \`load\`, \`removetrack\`, \`savecurrent\`, \`savequeue\``).setAuthor({name : `| Playlist Commands` , iconURL : client.user.displayAvatarURL()}).setFooter({ text: ``, iconURL: "", }).setThumbnail(client.user.displayAvatarURL( {dynamic : true }))
        let embed4 = new MessageEmbed().setColor("#8452fa").setDescription(`\`8d\`, \`bass\`, \`equalizer\`, \`nightcore\`, \`reset\`, \`speed\`, \`treblebass\`, \`vaporwave\``).setAuthor({name : `| Filters Commands` , iconURL : client.user.displayAvatarURL()}).setFooter({ text: ``, iconURL: "", }).setThumbnail(client.user.displayAvatarURL( {dynamic : true }))
        let embed5 = new MessageEmbed().setColor("#8452fa").setDescription(`\`247\`, \`adddj\`, \`removedj\`, \`toggledj\``).setAuthor({name : `| Settings Commands` , iconURL : client.user.displayAvatarURL()}).setFooter({ text: ``, iconURL: "", }).setThumbnail(client.user.displayAvatarURL( {dynamic : true }))
        var embeds = [];
        embeds.push(embed1);embeds.push(embed2);embeds.push(embed3);embeds.push(embed4);embeds.push(embed5);

        const collector = await msg.createMessageComponentCollector({
            filter :(interaction) => {
                if(message.author.id === interaction.user.id) return true;
                else{
                    interaction.reply({content : `<:pristo_cross:1119465432588505129> | That's not your session run : \`${prefix}help\` to create your own.` , ephemeral : true})
                }
            },
            time : 1000000,
            idle : 1000000/2
        });

        collector.on('collect',async(interaction) => {
            if(interaction.isSelectMenu())
            {
                for(const value of interaction.values)
                {
                    if(value === `h1`)
                    {
                        return interaction.update({embeds : [helpmenu]});
                    }
                    if(value === `h2`)
                    {
                        return interaction.update({embeds : [embed1]});
                    }
                    if(value === `h3`)
                    {
                        return interaction.update({embeds : [embed2]});
                    }
                    if(value === `h4`)
                    {
                        return interaction.update({embeds : [embed3]});
                    }
                    if(value === `h5`)
                    {
                        return interaction.update({embeds : [embed4]});
                    }
                    if(value === `h6`)
                    {
                        return interaction.update({embeds : [embed5]})
                    }
                }
            }
            
        });
        collector.on('end',async() => {
            msg.edit({embeds : [helpmenu] , components : [] , content : `<:pristo_cross:1119465432588505129> | Help Query Got Timed Out!`})
        })

        }

  },
};