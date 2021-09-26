const { Client, Message, MessageEmbed } = require("discord.js");

const inventory = require('../../models/inventory');

const items = require('../../invitems.js');

module.exports = {
    name: 'sell',
    emoji:'💸',
    description:'sells an item you own',
    cooldown: 1,
    /**
     * @param {client} client
     * @param {message} message
     * @param {string[]} args
     */
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("please specify an item to sell");
        const itemTobuy = args[0]

        const validitem = !!items.find((val) => val.item.toLowerCase() === itemTobuy);
        if (!validitem) return message.reply('the item you want to sell is not valid');

        const coins = Math.floor(Math.random() * 1000) + 1;



        const params = {
            Guild: message.guild.id,
            User: message.author.id,
        };
        inventory.findOne(params, async (err, data) => {
            if (data) {
                const hasitem = Object.keys(data.Inventory).includes(itemTobuy);
                if (!hasitem) {
                    data.Inventory[itemTobuy] = -1;
                } else {
                    data.Inventory[itemTobuy]--
                }
                console.log(data)
                await inventory.findOneAndUpdate(params, data);
            } else {
                new inventory({
                    Guild: message.guild.id,
                    User: message.author.id,
                    Inventory: {
                        [itemTobuy]: -1
                    },
                }).save();
            }
            message.reply(`you have sold ${itemTobuy} and got ${coins} moni for it`);
            client.add(message.author.id, coins)
        });
    },
}
