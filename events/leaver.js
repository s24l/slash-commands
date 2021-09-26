const client = require('../index');
const Schema = require('../models/leavechannel.js');
const canvas = require('discord-canvas')
const { MessageAttachment } = require('discord.js');

client.on('guildMemberRemove', async(member) => {
    Schema.findOne({ Guild: member.guild.id }, async(e,data) => {
        if(!data) return;
        const user = member.user;
        const image = new canvas.Goodbye()
            .setUsername(user.username)
            .setDiscriminator(user.discriminator)
            .setMemberCount(member.guild.memberCount)
            .setGuildName(member.guild.name)
            .setAvatar(user.displayAvatarURL({ format: 'png' }))
            .setColor("border", "#8015EA")
            .setColor("username-box", "#8015EA")
            .setColor("discriminator-box", "#8015EA")
            .setColor("message-box", "#8015EA")
            .setColor("title", "#8015EA")
            .setColor("avatar", "#8015EA")
            .setBackground(
                "https://coolbackgrounds.io/images/backgrounds/index/sea-edge-79ab30e2.png"
            )
            .toAttachment();
        
            const attachment = new MessageAttachment(
                (await image).toBuffer(),
                "goodbye-image.png"
            );

            const channel = member.guild.channels.cache.get(data.Channel);
            channel.send({files:[attachment]})
    })
})