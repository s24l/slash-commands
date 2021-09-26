const { Client, Message, MessageEmbed } = require('discord.js');

const inventory = require('../../models/inventory');

module.exports = {
    name: 'fish',
    emoji:'💸',
    description:'fishes the sea\'s for fish to sell',
    cooldown: 45,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const givers = ['fish', 'rare-fish', 'spirit-fish', 'silvers-rank', 'monki-fish'];

        const giversIndex = Math.floor(Math.random() * givers.length);

        const params = {
            Guild: message.guild.id,
            User: message.author.id,
        };
        inventory.findOne(params, async (err, data) => {
            if (data) {
                const hasitem = Object.keys(data.Inventory).includes(givers[giversIndex]);
                if (!hasitem) {
                    data.Inventory[givers[giversIndex]] = 1;
                } else {
                    data.Inventory[givers[giversIndex]]++
                }
                console.log(data)
                await inventory.findOneAndUpdate(params, data);
            } else {
                new inventory({
                    Guild: message.guild.id,
                    User: message.author.id,
                    Inventory: {
                        [givers[giversIndex]]: 1
                    },
                }).save();
            }

            const embed = new MessageEmbed()
                .setDescription(`${message.author.username}`)
                .addField(`you went into the woods for hunting and got urself a`, `${givers[giversIndex]}`, true)
            message.reply({ embeds: [embed] });
        },
        )
    }
};