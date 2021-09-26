const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "search",
  emoji:'💸',
  description: "Search for some coin!",
  cooldown: 45,
  run: async (client, message, args) => {

    const locations = [
      "car",
      "bathroom",
      "park",
      "truck",
      "pocket",
      "computer"
    ];

    const chosenLocations = locations.sort(() => Math.random() - Math.random()).slice(0, 3);

    const filter = ({ author, content }) => message.author == author && chosenLocations.some((location) => location.toLowerCase() == content.toLowerCase());

    const collector = message.channel.createMessageCollector({filter, max: 1, time: 25000 });

    const earnings = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

    const bal = await client.bal(message.author.id);


    collector.on('collect', async (m) => {
      const embed = new MessageEmbed()
      .setTitle(`You found ${earnings} moni!`)
      .setDescription(`which brings your total balance to ${bal}`)
      message.reply({embeds: [embed]});

      await client.add(message.author.id, earnings)
    });

    collector.on('end', (collected, reason) => {
      if (reason == "time") {
        message.reply('you know what\'s the point of even asking to search somewhere if you\'re not gonna pick an option wow rude');
      }
    });


    message.channel.send(`<@${message.author.id}> Which location would you like to search?\n Type the location in this channel\n \`${chosenLocations.join('` `')}\``);
  }
}