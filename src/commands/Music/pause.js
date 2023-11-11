const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "pause",
    category: "Music",
    description: "Pause the currently playing music",
    args: false,
    usage: "",
    userPrams: [],
    botPrams: ["EMBED_LINKS"],
    dj: true,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {
        const player = client.manager.players.get(message.guild.id);
        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("8452fa")
                .setDescription("<:warn:1172442561386909766> | No song/s currently playing within this guild.");
            return message.reply({ embeds: [thing] });
        }
        if (player.shoukaku.paused) {
            let thing = new MessageEmbed()
                .setColor("8452fa")
                .setDescription(`<:tick:1172442564973051954> | The player is already **paused**.`);
            return message.reply({ embeds: [thing] });
        }

        await player.pause(true);

        const song = player.queue.current;

        let thing = new MessageEmbed()
            .setColor("8452fa")
            .setDescription(`<:tick:1172442564973051954> | **Paused** - [${song.title}]`);
        return message.reply({ embeds: [thing] });
    },
};
