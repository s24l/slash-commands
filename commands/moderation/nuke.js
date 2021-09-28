const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
    name : 'clone',
    emoji:'🔨',
    cooldown: 1,
    description : 'A simple channel nuke command.',

     /**
      * 
      * @param {*} Client
      * @param {Message} Message
      * @param {*} args
       */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You dont have permission for this command.'+'Permission required: (ManageChannels)')
                
        message.channel.clone().then((ch) => {
            ch.setParent(message.channel.parent.id)
            ch.setPosition(message.channel.position)
            message.channel.delete();

            const NukeEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`<@${message.author.tag}> Nuked this channel.`)
            .setImage("https://tenor.com/view/nuclear-explosion-nuke-bomb-boom-gif-16286228")
                  
    
            ch.send(NukeEmbed)

        
    })
}}