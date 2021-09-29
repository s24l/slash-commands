const client = require('../index');
const Schema = require('../models/welcomeChannel');
const canvas = require('discord-canvas')
const { MessageAttachment } = require('discord.js');

client.on('guildMemberAdd', async(member) => {
    Schema.findOne({ Guild: member.guild.id }, async(e,data) => {
        if(!data) return;
        const user = member.user;
        const image = new canvas.Welcome()
            .setUsername(user.username)
            .setDiscriminator(user.discriminator)
            .setMemberCount(member.guild.memberCount)
            .setGuildName(member.guild.name)
            .setAvatar(user.displayAvatarURL({ format: 'png' }))
            .setColor("border", "#00000")
            .setColor("username-box", "#00000")
            .setColor("discriminator-box", "#00000")
            .setColor("message-box", "#00000")
            .setColor("title", "#00000")
            .setColor("avatar", "#8015EA")
            .setBackground(
                "https://img.freepik.com/free-photo/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-room-wall_1258-28313.jpg?size=626&ext=jpg&ga=GA1.2.1381556648.1623456000"
            )
            .toAttachment();
        
            const attachment = new MessageAttachment(
                (await image).toBuffer(),
                "goodbye-image.png"
            );

            const channel = member.guild.channels.cache.get(data.Channel);
            channel.send({files:[attachment], content: `<@${user.id}> has went from being happy, to being in this server. Welcome!`})
    })
})