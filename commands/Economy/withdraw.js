const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'withdraw',
    aliases: ['with'],
    emoji: '💸',
    description: 'withdraws money from your bank balance',
    cooldown: 45,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        const coinsToDonate = args[0];
        if (!coinsToDonate)return message.reply("how much u wanna give type it in the cmd u idiot");

        if (isNaN(coinsToDonate)) return message.reply("it must be numbers u idiot")

        const converteddonation = parseInt(coinsToDonate)

        const userBalance = await client.bankbal(message.author.id);

        if (userBalance < converteddonation) return message.reply("u dont have enough money");

        await client.add(message.author.id, converteddonation)

        await client.rmvbank(message.author.id, converteddonation)

       
        message.reply(`you have withdrawed ${converteddonation} to your bank account`)
    },
};