const { CommandInteraction } = require("discord.js");
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
    {
      name: "channel",
      description: "Channel to purge",
      type: "CHANNEL",
      required: false,
    },
  ],
   /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
    let amount = args[0].value;
    let channel = args[1]?.channel || interaction.channel;
    let allMessages = await channel.messages.fetch({
      limit: amount == 100 ? amount : amount + 1,
    });
    let msgs = await channel.bulkDelete(allMessages);
    await interaction.reply(`Deleted ${msgs.size}/${amount} messages`);
    await channel.send(`This channel has been purged(${msgs.size}/${amount})`);
    setTimeout(async () => {
      await interaction.deleteReply();
    }, 5000);
  },
};