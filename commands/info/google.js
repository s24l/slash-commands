const googleIt = require("google-it")
const { Client, Message, MessageEmbed } = require("discord.js")
module.exports = {
    name: "google",
    run: async (client, message, args) => {
        const args1 = message.content.slice(''.length).trim().split(/ +/);
        args1.shift().toLowerCase().split(' ')[0];
        const embed = new MessageEmbed()
            .setTitle("Google search")
            .setColor("RANDOM")

            .setTimestamp()


        googleIt({ 'query': args1.join(' ') }).then(results => {
            results.forEach(function (item, index) {
                embed.addField((index + 1) + ": " + item.title, "<" + item.link + ">");
            });

            message.channel.send({ embeds: [embed] });
        }).catch(e => {
            message.channel.send("something went wrong!")
        });
    }
}