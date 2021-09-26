const { MessageEmbed } = require('discord.js');
const Schema = require('../models/snipingchannel');
const client = require('../index.js')

client.on('messageUpdate', message => {
    Schema.findOne, async (e, data) => {
        if (!data) return;
        if (!message.partial) {
            const channel = member.guild.channels.cache.get(data.Channel);
            const editedInChannel = client.channels.cache.get(message.channel.id)
            if (channel) {
                const embed29 = new MessageEmbed()
                    .setTitle(`**AUDIT LOGS**`)
                    .setDescription(`Message edited in <#${message.channel.id}> [Jump to Message](${message.url})`)
                    .addField(`before`, `${message}`)
                    .addField(`after`, `${editedInChannel.messages.cache.get(message.id)}`)
                    .setColor(0x426ca6)
                    .setFooter(` author: ${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true }))
                channel.send({ embeds: [embed29] })
            }
        }
    }
})
