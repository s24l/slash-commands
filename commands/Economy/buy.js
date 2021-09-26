const { Client, Message, MessageEmbed } = require("discord.js");

const inventory = require('../../models/inventory');

const items = require('../../shopitems');
module.exports = {
    name: 'buy',
    description:'buys an item from the shop',
    emoji:'💸',
    cooldown: 1,
    /**
     * @param {client} client
     * @param {message} message
     * @param {string[]} args
     */
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("please specify an item to buy");
        const itemTobuy = args[0].toLowerCase();

        const validitem = !!items.find((val) => val.item.toLowerCase() === itemTobuy);
        if (!validitem) return message.reply('the item you want to buy is not valid');

        const itemPrice = items.find((val) => (val) => (val.item.toLowerCase()) === itemTobuy).price;

        const userBalance = await client.bal(message.author.id);
        if (userBalance < itemPrice) return message.reply(`you only have ${userBalance} and the item is ${itemPrice}`);

        const params = {
            Guild: message.guild.id,
            User: message.author.id,
        };
        inventory.findOne(params, async (err, data) => {
            if (data) {
                const hasitem = Object.keys(data.Inventory).includes(itemTobuy);
                if (!hasitem) {
                    data.Inventory[itemTobuy] = 1;
                } else {
                    data.Inventory[itemTobuy]++
                }
                console.log(data)
                await inventory.findOneAndUpdate(params, data);
            } else {
                new inventory({
                    Guild: message.guild.id,
                    User: message.author.id,
                    Inventory: {
                        [itemTobuy]: 1
                    },
                }).save();
            }
            message.reply(`you have bought ${itemTobuy}`);
            client.rmv(message.author.id, itemPrice)
        });
    },
}
