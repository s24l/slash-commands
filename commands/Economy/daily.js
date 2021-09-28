const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
    name: 'daily',
    cooldown: 86400,
    /**
     * @param {client} client
     * @param {message} message
     * @param {string[]} args
     */
     run: async(client, message, args) =>{
        const randomNumber = 2000;
       
        const embed = new MessageEmbed()
        .setDescription(`you just received ${randomNumber} as a daily reward`)
        message.channel.send({ embeds:[ embed ]})
        client.add(message.author.id, randomNumber)
    }
}