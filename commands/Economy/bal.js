const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'bal',
    emoji: '💸',
    description: 'shows user\'s balance',
    cooldown: 1,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const member2 = message.mentions.members.first() || message.author;

        const bal = await client.bal(member2.id);
        const bal2 = await client.bankbal(member2.id);

        const embed = new MessageEmbed()
            .setDescription(`<@${member2.id}> balance`)
            .addField(`wallet`,`${bal}`, true)
            .addField(`bank`, `${bal2}`, true);

        message.reply({ embeds: [embed] })
    }
}