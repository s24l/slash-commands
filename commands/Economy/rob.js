const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
    name: 'rob',
    emoji: '💸',
    description: 'rob\'s a user',
    cooldown: 300,
    /**
     * @param {client} client
     * @param {message} message
     * @param {string[]} args
     */
    run: async (client, message, args) => {
        const stolen = message.mentions.users.first();

        if(stolen === bot) return message.reply('why you tryna rob me try it again imma whoop ur lil ass')

        const bal = await client.bal(stolen.id);

        const bal2 = await client.bal(message.author.id);
        
        if (!stolen) return message.reply('specify who you want to rob');

        if (await client.bal(stolen.id) < 2500) return message.reply('the person dosnt have atleast 2500 leave them alone');

        if (await client.bal(message.author.id) < 4000) return message.reply('you dont have atleast 4000 to rob anyone go get yourself some money you broke fuck');

        function random() {
            const num = Math.floor(Math.random() * 2);
            return num === 1;
        };

        if (random() === true) {
            const winAmount = Math.floor(Math.random() * bal);
            message.reply(`congrats you have robbed <@${stolen.id}> for ${winAmount} moni`);
            client.add(message.author.id, winAmount)
            client.rmv(stolen.id, winAmount)
        } else {
            const coins = Math.floor(Math.random() * 3500) + 1;
            message.reply(`you tried to rob <@${stolen.id}> but got caught so you paid him ${coins}`)
            client.rmv(message.author.id, coins)
            client.add(stolen.id, coins)

        }
    }
}