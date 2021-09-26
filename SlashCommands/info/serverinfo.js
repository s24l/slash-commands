const {
  Client,
  CommandInteraction,
  MessageEmbed
} = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "stats",
  description: "Get information on the guild",
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    try {
      const voiceChannel = interaction.guild.channels.cache.filter((ch) => ch.type === "GUILD_VOICE").size;
      const textChannel = interaction.guild.channels.cache.filter((ch) => ch.type === "GUILD_TEXT").size;
      const bothChannel = `#️⃣ ${textChannel} **text** channels and 🔊 ${voiceChannel} **voice** channels`;
      const humans = interaction.guild.members.cache.filter((m) => !m.user.bot).size;
      const bots = interaction.guild.members.cache.filter((m) => m.user.bot).size;
      const humanbot = interaction.guild.memberCount;
      const total = `${humanbot} **total**, ${humans} **humans**, ${bots} **bots.**`;

      const embed = new MessageEmbed()
        .setAuthor(`${interaction.guild.name}`, interaction.guild.iconURL({ dynamic: true }))
        .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 1024 }))
        .setFooter(interaction.guild.name)
        .setColor("PURPLE")
        .setTimestamp()
        .addField("Server ID", `\`${interaction.guild.id}\``)
        .addField("Owner", `${(await interaction.guild.fetchOwner())}`, true)
        .addField("Owner ID", `\`${interaction.guild.ownerId}\``, true)
        .addField("Member Count", `${total}`)
        .addField("Channels", `${bothChannel}`, true)
        .addField("Emoji", `${interaction.guild.emojis.cache.size} emoji(s)`, true)
        .addField("Role", `${interaction.guild.roles.cache.size} role(s)`, true)
        .addField("Creation Date", `📅 ${moment(interaction.guild.createdTimestamp).format("LT")} ${moment(
          interaction.guild.createdTimestamp
        ).format("LL")} (${moment(interaction.guild.createdTimestamp).fromNow()})`);
      interaction.followUp({ embeds: [embed] })
    } catch (e) {
      console.log(e)
    }
  }
}