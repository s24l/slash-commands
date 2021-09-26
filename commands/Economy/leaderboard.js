const { Client, Message, MessageEmbed, Collection } = require("discord.js");
module.exports = {
    name: 'rich',
    emoji:'💸',
    description:'shows the richest people in the server',
    cooldown: 1,
    /**
     * @param {client} client
     * @param {message} message
     * @param {string[]} args
     */
    run: async (client, message, args) => {

        const collection = new Collection();

        await Promise.all(
            message.guild.members.cache.map(async (member) => {
                const id = member.id;
                const bal = await client.bal(id);
                console.log(`${member.user.tag} -> ${bal}`)
                return bal !== 0 ? collection.set(id, {
                    id,
                    bal,
                })
                    : null
            })
        );
        const data = collection.sort((a, b) => b.bal - a.bal).first(10);

        const leaderboard = new MessageEmbed()
            .setTitle(`leaderboard in this server`)
        data.map((v, i) => {
            leaderboard
            .addField(`name`,`${client.users.cache.get(v.id)}`)
            .addField(`balance`, `${v.bal}`)
            .setFooter("read this: this is only showing the amount of money in people's wallet")
        })


        message.channel.send({ embeds: [leaderboard] })
    }
}