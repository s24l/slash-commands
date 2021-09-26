const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
    name: 'bet',
    emoji:'💸',
    description:'bets the amount of the moeny you have if you win u get double what you bet',
    cooldown: 1,
    /**
     * @param {client} client
     * @param {message} message
     * @param {string[]} args
     */
    run: async (client, message, args) => {
        if (!args[0]) return message.reply('specif an amout to bet');

        if (isNaN(args[0])) return message.reply('amount must be a number');

        const amounttobet = parseInt(args[0]);

        if (await client.bal(message.author.id) < amounttobet) return message.reply('you dont have enough money');

        function random() {
            const num = Math.floor(Math.random() * 2);
            return num === 1;
        };

        if (random() === true) {
            const winAmount = amounttobet * 2
            message.reply(`congrats you have won ${winAmount} moni`);
            client.add(message.author.id, winAmount)
        } else {
            message.reply(`sadge you lost ${amounttobet}`)
            client.rmv(message.author.id, amounttobet)

        }
    }
}