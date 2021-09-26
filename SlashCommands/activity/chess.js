const { Commanintreaction, Client } = require('discord.js');
const discordTogether = require('../../client/discordtogether');

module.exports = {
    name: 'chess',
    description: 'play chess in a voice channel',
    options: [
        {
            name: 'channel',
            description: 'channel you want to activate chess in',
            type: "CHANNEL"
        },
    ],
    /**
     * 
     * @param {Client} client 
     * @param {Commanintreaction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const [channelID] = args;
        const channel = interaction.guild.channels.cache.get(channelID);
        
        if(!channel) return interaction.followUp('please choose a voice channel')
        console.log({ channel })

        if (channel.type !== "GUILD_VOICE") return interaction.followUp({ content: 'please use a voice channel' })

        discordTogether.createTogetherCode(channelID, 'chess').then((x) => interaction.followUp(`Here is your code anyone is welcome to join. ${x.code}`));
    },
};