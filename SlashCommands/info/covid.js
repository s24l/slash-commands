const { CommandInteracion, Client, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "covid",
  description: "Gets information about covid gloablly and per country",
  options: [
    {
      name: "country",
      type: "STRING",
      description: "The country you want information about",
      required: false,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteracion} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    let link;
        let embed = new MessageEmbed()

        if (!args[0] || args[0].match(/all|global|globe|world/gi)) {
            let jsonData = await fetch("https://disease.sh/v3/covid-19/all")
            jsonData = await jsonData.json()

            embed
                .setTitle("Global Corona Virus Cases")
                .setColor("RED")
                .setThumbnail(`https://images-ext-1.discordapp.net/external/I1A-p5xztRVgGNUnxLp15eT7PkC2LYrxYdNKqjHyYqA/https/i.giphy.com/YPbrUhP9Ryhgi2psz3.gif?width=473&height=473`)
                .addField("**Total Cases:**", jsonData.cases.toLocaleString(), true)
                .addField("**Total Deaths:**", jsonData.deaths.toLocaleString(), true)
                .addField("**Total Recovered:**", jsonData.recovered.toLocaleString(), true)
                .addField("**Today's Cases:**", jsonData.todayCases.toLocaleString(), true)
                .addField("**Today's Deaths:**", jsonData.todayDeaths.toLocaleString(), true)
                .addField("**Active Cases:**", jsonData.active.toLocaleString(), true)
        } else {
            let jsonData = await fetch(`https://disease.sh/v3/covid-19/countries/${args.join(" ")}`)
            jsonData = await jsonData.json()

            if (!jsonData.country) return interaction.followUp({ content: "I am unable to get the details for **" + args[0] + "**."})

            embed.setTitle(`${jsonData.country.toUpperCase()}`)
                .setColor("BLUE")
                .setThumbnail(jsonData.countryInfo.flag || "")
                .addField("**Total Cases:**", jsonData.cases.toLocaleString(), true)
                .addField("**Total Deaths:**", jsonData.deaths.toLocaleString(), true)
                .addField("**Total Recovered:**", jsonData.recovered.toLocaleString(), true)
                .addField("**Today's Cases:**", jsonData.todayCases.toLocaleString(), true)
                .addField("**Today's Deaths:**", jsonData.todayDeaths.toLocaleString(), true)
                .addField("**Active Cases:**", jsonData.active.toLocaleString(), true)
        }

        return interaction.followUp({ embeds: [embed] }).catch(err => {
            console.log(err)
        })
  },
};