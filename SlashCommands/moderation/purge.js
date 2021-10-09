const { CommandInteraction, Message } = require("discord.js");
module.exports = {
    name: "purge",
    description: "Purge an amount of messages in a channel",
    options: [
        {
            name: "amount",
            description: "Amount to purge",
            type: "NUMBER",
            required: true,
        },
    ],
    /**
      *
      * @param {Client} client
      * @param {CommandInteraction} interaction
      * @param {String[]} args
      */
    run: async (client, interaction, args) => {

        const query = args[0];

        if (!query) interaction.followUp(`type the amount u dumbfuck`)

        if (isNaN(query)) return interaction.followUp('amount must be a number');

        let channel = interaction.channel;

        let msgs = await channel.bulkDelete(query);

        await interaction.followUp(`Deleted ${msgs.size}/${query} messages`);

        setTimeout(async () => {
            await interaction.deleteReply();
        }, 5000);
    },
};