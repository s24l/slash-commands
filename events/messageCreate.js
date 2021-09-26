const client = require("../index");
const cooldown = require('../models/cooldown.js')

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(" ");

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;

    if (command) {
        if (command.cooldown) {
            const current_time = Date.now();
            const cooldown_amount = (command.cooldown) * 1000

            cooldown.findOne({ userId: message.author.id, cmd: command.name }, async (err, data) => {
                if (data) {
                    const expiration_time = data.time + cooldown_amount;

                    if (current_time < expiration_time) {
                        const time_left = (expiration_time - current_time) / 1000

                        if (time_left.toFixed(1) >= 86400) {
                            let days = (time_left.toFixed(1) / 86400);
                            return message.reply(`You need to wait ${parseInt(days)} days before using \`${command.name}\`!`)
                        }
                        if (time_left.toFixed(1) >= 3600) {
                            let hour = (time_left.toFixed(1) / 3600);
                            return message.reply(`You need to wait ${parseInt(hour)} hours before using \`${command.name}\`!`)
                        }
                        if (time_left.toFixed(1) >= 60) {
                            let minute = (time_left.toFixed(1) / 60);
                            return message.reply(`You need to wait ${parseInt(minute)} minutes before using \`${command.name}\`!`)
                        }
                        let seconds = (time_left.toFixed(1));
                        return message.reply(`You need to wait ${parseInt(seconds)} seconds before using \`${command.name}\`!`)
                    } else {
                        await cooldown.findOneAndUpdate({ userId: message.author.id, cmd: command.name }, { time: current_time });
                        command.run(client, message, args)
                    }
                } else {
                    command.run(client, message, args)
                    new cooldown({
                        userId: message.author.id,
                        cmd: command.name,
                        time: current_time,
                        cooldown: command.cooldown,
                    }).save();
                }
            });
        }
    }
})