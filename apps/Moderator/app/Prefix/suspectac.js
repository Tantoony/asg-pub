const Command = require('../../../Base/Command');
const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
class Supheac extends Command {
    constructor(client) {
        super(client, {
            name: "supheac",
            description: "Şüpheli bir üyeyi kayıtsıza alır",
            usage: "supheac etiket/id",
            examples: ["supheac 711897884391637062"],
            category: "Kayıt",
            aliases: ["şüpheaç", "şüphemyok", "şüpheli"],
            cmdChannel: "suspicious",
            accaptedPerms: ["cmd-registry", "cmd-double", "cmd-single", "cmd-ceo"],
            cooldown: 10000
        });
    };
    async run(client, message, args) {
        client = this.client;
        let mentioned = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentioned) return await message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        if (!mentioned.roles.cache.has(data.roles["suspicious"])) return await message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        await mentioned.roles.remove(data.roles["suspicious"]);
        await mentioned.roles.add(data.roles["welcome"]);
        await message.react(data.emojis["ok"].split(':')[2].replace('>', ''));
        await message.reply(new Discord.MessageEmbed().setDescription(`${mentioned} adlı kullanıcı başarıyla şüpheliden çıkarıldı.`).setColor("#c27c0e"));
        const aylar = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
        const tarih = new Date()
        await message.guild.channels.cache.get(data.channels["kayıt_log"]).send(new Discord.MessageEmbed().setDescription(stripIndents`
        **Komutu kullanan:** ${message.member} (\`${message.member.user.id}\`)
        **Şüpheliden çıkarılan:** ${mentioned} (\`${mentioned.user.id}\`)
        **Tag:** ${client.config.tags[0].some(t => mentioned.user.username.includes(t)) ? "\`Var\`" : "\`Yok\`"}
        **Tarih:** \`${tarih.getDate()} ${aylar[tarih.getMonth()]} ${tarih.getFullYear()} ${tarih.getHours() + 3}:${tarih.getMinutes()}\`
        `).setColor("#c27c0e").setAuthor(message.member.user.tag, message.member.user.displayAvatarURL({ dynamic: true })).setThumbnail(mentioned.user.displayAvatarURL({ dynamic: true })));

    }
}
module.exports = Supheac;