const { MessageEmbed, CommandInteraction, Client, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
  name: "invite",
  description: "Get The Bot Invite Link",
  userPrams: [],
  botPrams: ['EMBED_LINKS'],

  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false
    });
    var invite = client.config.links.invite
    var arisa = client.config.links.arisa;
    var support = client.config.links.support;
    const mainPage = new MessageEmbed()
      .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL()})
      .setColor("#2f3136")
      .setDescription(`>>> • [Click Here To Invite Me To Your Server](${invite})\n• [Click Here To Join My Support Server](${support})\n• ** Developed By Revenger83 **`)
    
    interaction.editReply({ embeds: [mainPage] })
  }
}