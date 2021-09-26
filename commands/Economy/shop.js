const { Client, Message, MessageEmbed } = require("discord.js");

const items = require('../../shopitems.js')
module.exports = {
    name: 'shop',
    emoji:'💸',
    description:'shows the available items in the shop',
    cooldown: 1,
    /**
     * @param {client} client
     * @param {message} message
     * @param {string[]} args
     */

    run: async (client, message, args) => {
        if (!items.length === 0) return message.reply('no items for sale');

        const shopList = items
            .map((value, index) => {
                return `**${index + 1})** ${value.item} -> ${value.price} coins`;
            });
        const shop = new MessageEmbed()
            .addField(`SHOP ITEMS`,`${shopList.join("\n")}`)
            message.channel.send({ embeds:[ shop ]})
        }
}