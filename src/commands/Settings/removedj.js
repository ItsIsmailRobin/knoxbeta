const { MessageEmbed } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "removedj",
    category: 'Settings',
    description: "Remove Dj Role",
    args: false,
    usage: "",
    aliases: ["romdj"],
    userPrams: ['MANAGE_GUILD'],
    botPrams: ['EMBED_LINKS'],
    owner: false,
    execute: async (message, args, client, prefix) => {

        let data = await db.findOne({ Guild: message.guild.id });
        if (data) {
            await data.delete()
            return message.reply({ embeds: [new MessageEmbed().setDescription(`<a:pristo_tick:1119464374608855040> | Successfully Removed All DJ Roles.`).setColor("2f3136")] })
        } else return message.reply({ embeds: [new MessageEmbed().setDescription(`<:pristo_cross:1119465432588505129> | Don't Have Dj Setup In This Guild`).setColor("2f3136")] })

    }
}
