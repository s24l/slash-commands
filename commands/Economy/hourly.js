const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
    name: 'hourly',
    emoji:'💸',
    desciption:'requests your hourly balance',
    cooldown: 3600,
    /**
     * @param {client} client
     * @param {message} message
     * @param {string[]} args
     */
     run: async(client, message, args) =>{
        const randomNumber = 500;
       
        const embed = new MessageEmbed()
        .setDescription(`you just received ${randomNumber} as a hourly reward`)
        message.channel.send({ embeds:[ embed ]})
        client.add(message.author.id, randomNumber)
    }
}