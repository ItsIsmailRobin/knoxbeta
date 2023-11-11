const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'uptime',
  category: 'Information',
  aliases: ['up'],
  description: ' ',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {
    const duration1 = Math.round((Date.now() - message.client.uptime)/1000);
    message.reply({ content: `<:6292goodconnection:1172426172748021830> | My Uptime <t:${duration1}:R>` })
    }
}