const Schema = require('../../models/snipingchannel')
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'check-sniping-channel',
    cooldown: 1,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return;

       

        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
           if(!data) return message.reply('this server has no data stored')

           const channel = client.channels.cache.get(data.Channel);

           message.reply(`Welcome channel => ${channel}`);
        });
    },
};