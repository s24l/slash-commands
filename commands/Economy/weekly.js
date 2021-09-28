const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
    name: 'weekly',
    cooldown: 604800,
    /**
     * @param {client} client
     * @param {message} message
     * @param {string[]} args
     */
     run: async(client, message, args) =>{
        const randomNumber = 10000;
       
        const embed = new MessageEmbed()
        .setDescription(`you just received ${randomNumber} as a weekly reward`)
        message.channel.send({ embeds:[ embed ]})
        client.add(message.author.id, randomNumber)
    }
}