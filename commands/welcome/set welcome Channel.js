const Schema = require('../../models/welcomeChannel.js')
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'set-welcome-channel',
    cooldown: 1,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return;

        const channel = message.mentions.channels.first();
        if(!channel) return message.reply('specify the welcome channel');

        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (data) {
                 data.Channel = channel.id;
                 data.save();
            } else {
               new Schema({
                   Guild: message.guild.id,
                   Channel: channel.id,
               }).save();
            }
            message.reply(`${channel} has been set as welcome channel`);
        });
    },
};