const { Message, Client } = require("discord.js");

module.exports = {
    name: "ping",
    emoji:'ℹ',
    aliases: ['p'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.channel.send(`${client.ws.ping} ws ping`);
    },
};
