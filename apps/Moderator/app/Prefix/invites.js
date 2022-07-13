const Command = require("../../../Base/Command");
const Discord = require('discord.js');
const { checkDays, rain } = require('../../../../../HELPERS/functions');
const InviteData = require('../../../../../MODELS/StatUses/Invites');
const { stripIndent } = require('common-tags');
class Invites extends Command {
    constructor(client) {
        super(client, {
            name: "invites",
            description: "Belirtilen kullanıcının davetlerini gösterir",
            usage: "invites etiket/id",
            examples: ["invites 711897884391637062"],
            category: "Stats",
            aliases: ["invs"],
            cooldown: 10000
        })
    }
    async run(client, message, args, data) {
        const mentioned = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const Data = await InviteData.findOne({ _id: mentioned.user.id });
        if (!Data) return message.react(data.emojis["error"].split(':')[2].replace('>', ''));

        const embed = new Discord.MessageEmbed().setColor('#2f3136').setDescription(stripIndent`
        Kullanıcı: **${mentioned.user.username}**
        Davet sayısı: ${rain(client, Data.records.length)}
        Sunucuda olan davet ettiği kişi sayısı: ${rain(client, Data.records.filter(rec => message.guild.members.cache.get(rec.user)).length)}
        `).setThumbnail(mentioned.user.displayAvatarURL({ type: 'gif' })).setColor(mentioned.displayHexColor).setTitle("Ktria");

        await message.reply(embed);
    }
}
module.exports = Invites;
