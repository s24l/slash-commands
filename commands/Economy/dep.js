const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'dep',
    emoji: '💸',
    description: 'deposits money to your bank balance',
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

        const userBalance = await client.bal(message.author.id);

        if (userBalance < converteddonation) return message.reply("u dont have enough money");

        await client.rmv(message.author.id, converteddonation)

        await client.addbank(message.author.id, converteddonation)

       
        message.reply(`you have deposited ${converteddonation} to your bank account`)
    },
};