const { Client, Message, MessageEmbed } = require('discord.js');
const inventory = require("../../models/inventory");


module.exports = {
    name: 'Inevntory',
    emoji: '💸',
    description: 'shows your inventory',
    aliases: ['inv'],
    cooldown: 1,
    /** 
     * @param {Client} client
     * @param {Message} Message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const member2 = message.mentions.members.first() || message.author;

        inventory.findOne(
            { Guild: message.guild.id, User: member2.id }, async (err, data) => {
                if (!data) return message.reply(`<@${member2.id}>'s Inventory is empty! an item could be bought using the command !shop`)
                const mappedData = Object.keys(data.Inventory).map((key) => {
                    return `${key} - ${data.Inventory[key]}`;
                })
                    .join("\n");

                const embed = new MessageEmbed()
                    .setDescription(`<@${member2.id}>'s inventory`)
                    .addField(`items:`, `${mappedData}`, true);
                message.channel.send({ embeds: [embed] })

            }

        );
    },
};