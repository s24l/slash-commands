const { Message , MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
module.exports = {
    name: "bot-stats",
    emoji:'ℹ',
    aliases: ['b-s'],
    cooldown: 1,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const row = new MessageActionRow().addComponents(
       
            new MessageButton().setLabel("Invite Me!").setURL('https://google.com').setStyle("LINK"),
            new MessageButton().setLabel("Support Server!").setURL('https://google.com').setStyle("LINK"),
          );
        let days = Math.floor(client.uptime / 86400000 );
        let hours = Math.floor(client.uptime / 3600000 ) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;
        const embed = new MessageEmbed()
        .setTitle('Bot stats!')
        .setColor('#c2ffee')
        .addFields({name: 'Ping', value: `${client.ws.ping}ms`},
                   {name: 'Uptime', value: `My Uptime is ${days}d ${hours}h ${minutes}m ${seconds}s`},
                   {name: 'server-count', value: `${client.guilds.cache.size} servers!`},
                   {name: 'member-count', value:  `${client.users.cache.size} users!`})
        .setFooter(`Requested by ${message.author.tag}`,  message.author.displayAvatarURL({ dynamic: true }))

        message.channel.send({ embeds: [embed], components: [row] });
    },
};
