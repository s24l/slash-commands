const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 32767,
});
module.exports = client;
const neko_life = require("nekos.life")

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);
client.neko_life = new neko_life()
const schema = require('./schema.js')

//functions
client.bal = (id) => new Promise(async ful => {
    const data = await schema.findOne({ id });
    if (!data) return ful(0);
    ful(data.moni)
})
client.bankbal = (id) => new Promise(async ful => {
    const data = await schema.findOne({ id });
    if (!data) return ful(0);
    ful(data.bank)
})
client.add = (id, moni, bank) => {
    schema.findOne({ id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            data.moni += moni;
        } else {
            data = new schema({ id, moni, bank })
        }
        data.save();
    })
}
client.addbank = (id, moni, bank) => {
    schema.findOne({ id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            data.bank += moni;
        } else {
            data = new schema({ id, moni, bank })
        }
        data.save();
    })
}
client.rmv = (id, moni, bank) => {
    schema.findOne({ id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            data.moni -= moni;
        } else {
            data = new schema({ id, moni, bank })
        }
        data.save();
    })
};
client.rmvbank = (id, moni, bank) => {
    schema.findOne({ id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            data.bank -= moni;
        } else {
            data = new schema({ id, moni, bank })
        }
        data.save();
    })
};


// auto delete inv links
client.on("messageCreate", async message => {
    const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;
    if (regex.exec(message.content)) {
        await message.delete();
        await message.channel.send(
            `${message.author} **you cannot post links from other servers here!**`
        );
    }
});

// auto delete hard bad words
client.on('messageCreate', async (message) => {
    let wordArray = message.content.split(' ')

    const fs = require('fs');

    let reply_data = fs.readFileSync('./file.txt').toString();

    let replies = reply_data.split('\n');

    for (var i = 0; i < replies.length; i++) {
        if (wordArray.includes(replies[i])) {
            message.delete()
            message.channel.send(`YO <@${message.author.id}> relax your shit ok no hard bad words `)
                .setTimeout(() => message.delete(), 5000);
            break;
        }
    }
})

//reaction roles stuff
client.on("interactionCreate", (interaction) => {
    if (interaction.isButton()) {

        if (interaction.customId === "69") {


            interaction.component.setStyle("DANGER");
            if (interaction.member.roles.cache?.has('835093324054396939')) {
                interaction.member.roles.remove('835093324054396939')
                interaction.reply({ content: 'I removed <@835093324054396939> from you.', ephemeral: true })
            } else {
                interaction.member.roles.add('835093324054396939')
                interaction.reply({ content: 'I added <@835093324054396939> to you.', ephemeral: true })
            }


            // replace roles id in above lines else it wont work
        }
        if (interaction.customId === "68") {
            // use the custom id u gave to the button

            interaction.component.setStyle("DANGER");
            if (interaction.member.roles.cache?.has('890175913558429757')) {
                interaction.member.roles.remove('890175913558429757')
                interaction.reply({ content: 'I removed <@890175913558429757> from you.', ephemeral: true })
            } else {
                interaction.member.roles.add('890175913558429757')
                interaction.reply({ content: 'I added <@890175913558429757> to you.', ephemeral: true })
            }
            // replace roles id in above lines else it wont work
        }
    }
})
client.login(client.config.token);
//ODQwOTY0MzA2ODQ5ODkwMzQ0.YJf3Cw.pCHd9sHsAP7jfI_gojKbFrrPQR8