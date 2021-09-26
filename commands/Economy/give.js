const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
    name: 'give',
    emoji:'💸',
    description:'gives the player you mentioned a amount of money',
    cooldown: 1,
    /**
     * @param {client} client
     * @param {message} message
     * @param {string[]} args
     */
    run: async (client, message, args) => {
        const user = message.mentions.users.first();
        if (!user) return message.reply("mention someone u df");

        const coinsToDonate = args[1];
        if (!coinsToDonate)
            return message.reply(
                "how much u wanna give type it in the cmd u idiot"
            );

        if (isNaN(coinsToDonate))
            return message.reply("it must be numbers u idiot")
         const converteddonation = parseInt(coinsToDonate)
         const userBalance = await client.bal(message.author.id);
        if (userBalance < converteddonation) return message.reply("u dont have enough money");

        await client.rmv(message.author.id, converteddonation)
        await client.add(user.id, converteddonation)

        message.channel.send(`${message.author} has given ${converteddonation} to ${user}`)

    },
}