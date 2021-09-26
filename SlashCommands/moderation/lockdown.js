const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: "antiraid",
    description: "Prevent you're server from raids",
    options: [
      {
        name: "query",
        description: "Set the query to on or off",
        type: "STRING",
        required: true,
      }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
    if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp({ content: "You dont have `Administrator` permission"})
    if (!interaction.guild.me.permissions.has("MANAGE_CHANNELS")) 
      return interaction.followUp({
        content: "I dont have `Manage Channels` permission",
      });
    const query = args[0];
    if (!query)
      return interaction.followUp({
        content: "Please provide the query as on/off",
      });

    if (query === "on") {
      interaction.guild.channels.cache.forEach((ch) => {
        ch.permissionOverwrites.edit(ch.guild.roles.everyone, {
          VIEW_CHANNEL: false,
        });
      });
      const lockdownTrueEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription("<:blueMod:850688800896188446> Lockdown set to true");
      interaction.followUp({ embeds: [lockdownTrueEmbed] })
        .then(
          interaction.guild.channels.create("Lockdown Announcment", {
            type: "news",
            position: 0,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
             // deny: ["SEND_MESSAGES"]
              },
            ],
          })
        )
        .then(
          interaction.guild.channels.create("Lockdown chat", {
            type: "text",
            position: 1,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
              },
            ],
          })
        )
        .then(
          interaction.guild.channels.create("Lockdown voice", {
            type: "voice",
            position: 2,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                allow: ["VIEW_CHANNEL", "CONNECT"],
              },
            ],
          })
        );
    } else if (query === "off") {
      interaction.guild.channels.cache.forEach((ch) => {
        ch.permissionOverwrites.edit(ch.guild.roles.everyone, {
          VIEW_CHANNEL: true,
        });
      });
      const lockdownFalseEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription("<:blueMod:850688800896188446> Lockdown set to false");
      interaction.followUp({ embeds: [lockdownFalseEmbed] });
    }
  },
};