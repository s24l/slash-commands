const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
    name: 'work',
    emoji:'💸',
    description:'works for moni',
    cooldown: 45,
    /**
     * @param {client} client
     * @param {message} message
     * @param {string[]} args
     */

    run: async (client, message, args) => {
        const Jobs = ['Engineer👷‍♂️', 'Programmer👨‍💻','Doctor👨‍⚕️'];
        const Job = Jobs[Math.floor(Math.random() * (3))];
        const coins = Math.floor(Math.random() * (300));
        const embed = new MessageEmbed()
        .setDescription(`Good job, As you worked as a ${Job} and got ${coins} moni`)
        message.channel.send({ embeds:[ embed ]})
        client.add(message.author.id, coins);
    }
}
