const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "leave",
    aliases: ["dc"],
    category: "Music",
    description: "Leave voice channel",
    args: false,
    usage: "",
    userPrams: [],
    botPrams: ["EMBED_LINKS"],
    dj: true,
    owner: false,
    player: false,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {

        const player = client.manager.players.get(message.guild.id);
        
        const emojiLeave = message.client.emoji.leave;

        await player.destroy(message.guild.id);

        let thing = new MessageEmbed()
            .setColor("8452fa")
            .setDescription(`<:tick:1172442564973051954> | Leaved the voice channel`);
        return message.reply({ embeds: [thing] });
    },
};