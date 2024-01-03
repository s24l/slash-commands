const { MessageEmbed } = require('discord.js');
module.exports = {
  name: "spotify",
  aliases: [],
  categories: "Utility",
  permissions: " ",
  cooldown: 1,
  description: "Display your / mentioned user's spotify status",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
    const activities = user.presence.activities;
    const array = [];
    for(let i = 0;i < activities.length;i++) {
        if(activities[i].name === 'Spotify') {
            array.push(activities[i].syncID);
            const data = user.presence.activities[i];
              let trackAuthor = data.state;
            trackAuthor = trackAuthor.replace(/;/g, ",")
        const embed = new MessageEmbed()
        .setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/889955546810183731.png')
        .setColor("#2e3137")
        .setThumbnail(`https://i.scdn.co/image/${data.assets.largeImage.slice(8)}`)
        .addFields({ name: '➟ Song Name | ', value: `\`\`\`yaml\n${data.details} - ${data.state}\n\`\`\``, inline: true},
                   { name: '➟ Album | ', value: `\`\`\`yaml\n${data.assets.largeText}\n\`\`\``, inline: true},
                   { name: '➟ Author | ', value: `\`\`\`yaml\n${trackAuthor}\n\`\`\``, inline: true})
        .setTimestamp()
        message.reply({ embeds: [embed] });
      }
    }
      if(array.length === 0) return message.reply('This member is not listening to Spotify');
  }
}
