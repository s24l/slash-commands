const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { STATES } = require('mongoose');

module.exports = {
    name: 'help',
    cooldown: 1,
    emoji:'ℹ',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const emojis = {
            info: 'ℹ',
            moderation: '🔨',
            test: '🧪',
            economy: '💵'
        }
        const directories = [...new Set(client.commands.map(cmd => cmd.directory)),
        ];

        const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`

        const categories = directories.map((dir) => {
            const getCommands = client.commands.filter((cmd) => cmd.directory === dir
            ).map(cmd => {
                return {
                    name: cmd.name || 'there is no name',
                    description: cmd.description || 'there is no description',
                    emoji: cmd.emoji || 'there is no emoji'
                }
            })
            return {
                directory: formatString(dir),
                commands: getCommands
            }
        });
        const Embed = new MessageEmbed()
            .setDescription("please choose a category from the dropdown menu");

        const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu().setCustomId("help-menu").setPlaceholder('Please select a category').setDisabled(state).addOptions(categories.map((cmd) => {
                    return {
                        label: cmd.directory,
                        value: cmd.directory.toLowerCase(),
                        description: `commands from ${cmd.directory} category`,
                        emojis: emojis[cmd.directory.toLowerCase()] || null
                    }
                }))
            )
        ]

        const initialmessage = await message.reply({
            embeds: [Embed],
            components: components(false)
        });
        const filter = (interaction) => interaction.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU'});

        collector.on('collect', (interaction) => {
            const [directory] = interaction.values;
            const category = categories.find(x => x.directory.toLowerCase() === directory)

            const categoryembed = new MessageEmbed()
                .setTitle(`${directory} commands`)
                .setDescription("here are the list of commands")
                .addFields(category.commands.map((cmd) => {
                    return {
                        name: `**${cmd.name}   ${cmd.emoji}**`,
                        value: cmd.description,
                    };
                })
                )

            interaction.reply({ embeds: [categoryembed], ephermal: true })
        });
    },
};