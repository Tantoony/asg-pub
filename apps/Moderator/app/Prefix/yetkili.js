const Discord = require('discord.js');
const Command = require("../../../Base/Command");

class Upgrade extends Command {
    constructor(client) {
        super(client, {
            name: "yetkilial",
            description: "Belirtilen kullanıcıyı yetkiye başlatır.",
            usage: "yetkilial @etiket/id",
            examples: ["yetkibaslat 711897884391637062"],
            category: "Management",
            accaptedPerms: ["root", "owner", "cmd-ceo", "cmd-double", "cmd-single", "yetkilialım"],
        });
    }

    async run(client, message, args) {
        const mentioned = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentioned) return message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        if (!mentioned.user.username.includes(client.config.tag)) 
        await message.reply({content: `Kullanıcıda tagımız bulunmamaktadır!`}) 
        await message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        await mentioned.roles.add("ROLID")
        await message.react(data.emojis["ok"])
        await message.reply(new Discord.MessageEmbed().setColor("DARK_RED").setDescription(`:tada: sunucumuz bir yetkili daha kazandı ${mentioned.toString()} kullnıcısı sunucumuzun yeni yetkilisi!`))
        client.channels.cache.find(data.channels["ytlog"]).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${message.author} yetkilisi ${mentioned} kullanıcısını sunucumuzda yetkili yaptı :partying_face: `))
      }
}

module.exports = Upgrade;