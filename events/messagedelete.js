const { MessageEmbed } = require('discord.js');
const Schema = require('../models/snipingchannel');
const client = require('../index.js')

client.on('messageDelete', message => {
    Schema.findOne({ Guild: member.guild.id }, async (e, data) => {
        if (!data) return;
        if (!message.partial) {
            const channel = member.guild.channels.cache.get(data.Channel);
            if (channel) {
                const embed9 = new MessageEmbed()
                    .setTitle(`**AUDIT LOGS**`)
                    .setDescription(`Message sent by <@${message.author.id}> deleted in <#${message.channel.id}>`)
                    .addField(`deleted message `, `${message}`)
                    .setColor(0x426ca6)
                    .setFooter(`author: ${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true }))
                channel.send({ embeds: [embed9] })
            }

        }
    })
})
