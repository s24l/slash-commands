const Discord = require("discord.js");
const {
  Client,
  Message,
  MessageActionRow,
  MessageButton,
} = require('discord.js');

module.exports = {
  name: "rr",
  cooldown: 1,
  emoji: '🔨',
  description: 'reaction roles',
  run: async (Client, message, arg) => {

    /*const nopermEmbed = new Discord.MessageEmbed()
      .setColor(`RED`)
      .setTitle(`⛔ You don't have permission to use this!`)
    if (!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send({ embeds: [nopermEmbed] }).then(message => setTimeout(() => message.delete(), 5000));*/

    const embed = new Discord.MessageEmbed()
      .setTitle("Reaction Role")
      .setColor("GREEN")
      .setDescription("Click on the button below to get self role ")


    const nv = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("ANNOUNCMENT PING ROLE")
        .setCustomId(`68`)
        .setStyle('PRIMARY')
        .setDisabled('false'),


      new MessageButton()
        .setLabel("WEEB ROLE")
        .setCustomId(`69`)
        .setStyle('PRIMARY')
        .setDisabled('false'),

      new MessageButton()
        .setLabel("SMP ROLE")
        .setCustomId(`70`)
        .setStyle('PRIMARY')
        .setDisabled('false'))


    message.channel.send({ components: [nv], embeds: [embed] })

  }
}