const { MessageEmbed } = require('discord.js');
const Schema = require('../models/snipingchannel');
const client = require('../index.js')

client.on('messageUpdate', async(oldMessage, newMessage) => {
    Schema.findOne({ Guild : newMessage.guild.id }, async(e,data) => {
        if (!data) return;
        if (!newMessage) {
            const channel = member.guild.channels.cache.get(data.Channel);
            if (channel) {
                const embed29 = new MessageEmbed()
                    .setTitle(`**AUDIT LOGS**`)
                    .setDescription(`Message edited in <#${message.channel.id}> [Jump to Message](${message.url})`)
                    .addField(`before`, `${oldMessage}`)
                    .addField(`after`, `${newMessage}`)
                    .setColor(0x426ca6)
                    .setFooter(` author: <@${message.author.id}>`, message.author.displayAvatarURL({ dynamic: true }))
                channel.send({ embeds: [embed29] })
            }
        }
    })
})
