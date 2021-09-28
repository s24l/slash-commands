const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'beg',
    emoji:'💸',
    description:'begs money for your balance',
    cooldown: 45,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const givers = ['Skrillex', 'Dababy', 'Bitch', 'pepe', 'monke'];

        const giversIndex = Math.floor(Math.random() * givers.length);
        const coins = Math.floor(Math.random() * 600) + 1;

        const embed = new MessageEmbed()
            .addField(`its your lucky day `, `${givers[giversIndex]}`)
            .addField(`decided to give you`, `${coins}`)
            message.reply({ embeds: [embed] });
        client.add(message.author.id, coins);
    },
};