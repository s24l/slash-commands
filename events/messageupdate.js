const { MessageEmbed } = require('discord.js');
const Schema = require('../models/snipingchannel');
const client = require('../index.js')

client.on('messageUpdate', async (member, oldMessage, newMessage) => {
    Schema.findOne({ Guild: member.guild.id }, async (e, data) => {
        if (!data) return;
        if (!message.partial) {
            const channel = member.guild.channels.cache.get(data.Channel);
            if (channel) {
                const embed29 = new MessageEmbed()
                    .setTitle(`**AUDIT LOGS**`)
                    .setDescription(`Message edited in <#${message.channel.id}> [Jump to Message](${oldMessage.url})`)
                    .addField(`before`, `${oldMessage}`)
                    .addField(`after`, `${newMessage}`)
                    .setColor(0x426ca6)
                    .setFooter(` author: ${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true }))
                channel.send({ embeds: [embed29] })
            }
        }
    }
    )
})
