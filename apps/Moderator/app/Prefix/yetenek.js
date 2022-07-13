const Discord = require('discord.js');
const Command = require("../../../Base/Command");
class Yetenek extends Command {

    constructor(client) {
        super(client, {
            name: "yetenek",
            description: "Belirtilen kullanıcıya yetenek permi verir.",
            usage: "yetenek @Ktria/ID",
            examples: ["yetenek @Ktria/ID"],
            category: "Genel",
            aliases: ["yt", "ytnk"],
            accaptedPerms: ["root", "owner"],
            cooldown: 10000
        });
    }

    async run(client, message, args, data) {
        if (!message.member.roles.cache.some(ktria => [""].includes(ktria.id)) && !message.member.permissions.has("ADMINISTATOR")) return;
        const mentioned = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!mentioned) return message.reply({content: `${message.author} yetenek permi verebilmek için bi kullanıcı belirtmelisiniz!`})
        let embeddesigner = new MessageEmbed().setColor("RANDOM").setDescription(`${mentioned} kullanıcısına **designer** permi başarıyla verildi!`)
        let embeddj = new MessageEmbed().setColor("RANDOM").setDescription(`${mentioned} kullanıcısına **dj** permi başarıyla verildi!`)
        let embededitor = new MessageEmbed().setColor("RANDOM").setDescription(`${mentioned} kullanıcısına **editör** permi başarıyla verildi!`)
        let embedmusician = new MessageEmbed().setColor("RANDOM").setDescription(`${mentioned} kullanıcısına **müzisyen** permi başarıyla verildi!`)
        let embedressam = new MessageEmbed().setColor("RANDOM").setDescription(`${mentioned} kullanıcısına **ressam** permi başarıyla verildi!`)
        let embedstreamer = new MessageEmbed().setColor("RANDOM").setDescription(`${mentioned} kullanıcısına **streamer** permi başarıyla verildi!`)
        let embedvokal = new MessageEmbed().setColor("RANDOM").setDescription(`${mentioned} kullanıcısına **vokal** permi başarıyla verildi!`)
        let embedyazar = new MessageEmbed().setColor("RANDOM").setDescription(`${mentioned} kullanıcısına **yazar** permi başarıyla verildi!`)
        let unembeddesigner = new MessageEmbed().setColor("RANDOM").setDescription(`${mentioned} kullanıcısına **designer** permi başarıyla alındı!`)
        let unembeddj = new MessageEmbed().setColor("RANDOM").setDescription(`${mentioned} kullanıcısına **dj** permi başarıyla alındı!`)
        let unembededitor = new MessageEmbed().setColor("RANDOM").setDescription(`${mentioned} kullanıcısına **editör** permi başarıyla alındı!`)
        let unembedmusician = new MessageEmbed().setColor("RANDOM").setDescription(`${mentioned} kullanıcısına **müzisyen** permi başarıyla alındı!`)
        let unembedressam = new MessageEmbed().setColor("RANDOM").setDescription(`${mentioned} kullanıcısına **ressam** permi başarıyla alındı!`)
        let unembedstreamer = new MessageEmbed().setColor("RANDOM").setDescription(`${mentioned} kullanıcısına **streamer** permi başarıyla alındı!`)
        let unembedvokal = new MessageEmbed().setColor("RANDOM").setDescription(`${mentioned} kullanıcısına **vokal** permi başarıyla alındı!`)
        let unembedyazar = new MessageEmbed().setColor("RANDOM").setDescription(`${mentioned} kullanıcısına **yazar** permi başarıyla alındı!`)
        let yetenekcim = args[0];
        
        if(yetenekcim == "designer") { if (!mentioned) message.react(data.emojis["error"]); 
        mentioned.roles.add(data.roles["role_designer"]);
        message.reply({embeds: [embeddesigner]})} else {

        mentioned.roles.remove(data.roles["role_designer"]);
        message.reply({embeds: [unembeddesigner]})}


        if(yetenekcim == "dj") { if (!mentioned) message.react(data.emojis["error"]);
        mentioned.roles.add(data.roles["role_dj"]);
        message.reply({embeds: [embeddj]})} else {
        
        mentioned.roles.remove(data.roles["role_dj"]);
        message.reply({embed: [unembeddj]})}


        if(yetenekcim == "editor") { if (!mentioned) message.react(data.emojis["error"]);
        mentioned.roles.add(data.roles["role_editor"]);
        message.reply({embeds: [embededitor]})} else {
        
        mentioned.roles.remove(data.roles["role_editor"]);
        message.reply({embeds: [unembededitor]})}


        if(yetenekcim == "müzisyen") { if (!mentioned) message.react(data.emojis["error"]);
        mentioned.roles.add(data.roles["role_musician"]);
        message.reply({embeds: [embedmusician]})} else {

        mentioned.roles.remove(data.roles["role_musician"]);
        message.reply({embeds: [unembedmusician]})}


        if(yetenekcim == "ressam") { if (!mentioned) message.react(data.emojis["error"]) ;
        mentioned.roleas.add(data.roles["role_ressam"]);
        message.reply({embeds: [embedressam]})} else {

        mentioned.roles.remove(data.roles["role_ressam"]);
        message.reply({embeds: [unembedressam]})}


        if(yetenekcim == "streamer") { if (!mentioned) message.react(data.emojis["error"]);
        mentioned.roles.add(data.roles["role_streamer"]);
        message.reply({embeds: [embedstreamer]})} else {

        mentioned.roles.remove(data.roles["role_streamer"]);
        message.reply({embeds: [unembedstreamer]})}


        if(yetenekcim == "vokal") { if (!mentioned) message.react(data.emojis["error"]);
        mentioned.roles.add(data.roles["role_vokal"]);
        message.reply({embeds: [embedvokal]})} else {

        mentioned.roles.remove(data.roles["role_vokal"]);
        message.reply({embeds: [unembedvokal]})}


        if(yetenekcim == "yazar") { if (!mentioned) message.react(data.emojis["error"]);
        mentioned.roles.add(data.roles["role_yazar"]);
        message.reply({embeds: [embedyazar]})} else {

        mentioned.roles.remove(data.roles["role_yazar"]);
        message.reply({embeds: [unembedyazar]})}
    }
}

module.exports = Yetenek;