const { MessageEmbed } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "toggledj",
    category: 'Settings',
    description: " Toggle Dj mode",
    args: false,
    usage: "",
    aliases: ["romdj"],
    userPrams: ['MANAGE_GUILD'],
    botPrams: ['EMBED_LINKS'],
    owner: false,
    execute: async (message, args, client, prefix) => {

        let data = await db.findOne({ Guild: message.guild.id });

        if(!data) return message.reply({embeds:[new MessageEmbed().setDescription(`<:pristo_cross:1119465432588505129> | Don't Have Dj Setup In This Guild`).setColor("2f3136")]})

        let mode = false;
        if(!data.Mode)mode = true;
        data.Mode = mode;
        await data.save();
        if(mode) {
            await message.reply({embeds: [new MessageEmbed().setDescription(`<a:pristo_tick:1119464374608855040> | Enabled DJ Mode.`).setColor("2f3136")]})
        } else {
           return await message.reply({embeds: [new MessageEmbed().setDescription(`<a:pristo_tick:1119464374608855040> | Disabled DJ Mode.`).setColor("2f3136")]})
        }
    }
}