const { MessageEmbed } = require('discord.js');
const Schema = require('../models/snipingchannel');
const client = require('../index.js')

client.on('messageUpdate', async (oldMessage, newMessage) => {
    const channel = member.guild.channels.cache.get('849009931557535786');
    if (channel) {
        const embed29 = new MessageEmbed()
            .setTitle(`**AUDIT LOGS**`)
            .setDescription(`Message edited in <#${message.channel.id}> [Jump to Message](${message.url})`)
            .addField(`before`, `${oldMessage}`)
            .addField(`after`, `${newMessage}`)
            .setColor(0x426ca6)
            .setFooter(` author: ${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true }))
        channel.send({ embeds: [embed29] })
    }
})
