const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const moment = require("moment");
moment.locale('tr');
const { PrefixCommand } = require("../../../../base/utils");
class vunMute extends PrefixCommand {
    constructor(client) {
        super(client, {
            name: "vunmute",
            description: "Belirtilen kullanıcının varolan bir metin mute cezasını kaldırır.",
            usage: "cunmute etiket/id",
            examples: ["vunmute 674565119161794560"],
            category: "Moderasyon",
            aliases: ["vun"],
            accaptedPerms: ["vmute", "yt"],
            cooldown: 10000
        })
    }
    async run(client, message, args) {
        let mentioned = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentioned) return await message.react("🚫");
        await client.models.penalties.updateOne({ userId: mentioned.user.id, typeOf: "VMUTE" }, {
            $push: {
                extras: {
                    subject: "revoke",
                    data: {
                        executor: message.author.id,
                        date: new Date(),
                        channel: message.channel.id,
                        message: message.id
                    }
                }
            }
        });
        if (mentioned.voice && mentioned.voice.channel) await mentioned.voice.setMute(false);
        await message.react("👍");
        //  this.client.cmdCooldown[message.author.id][this.info.name] = Date.now() + this.info.cooldown;
        //const embed = new Discord.MessageEmbed().setColor('#2f3136').setDescription(`${data.emojis["vunmute"]} ${mentioned} kullanıcısı susturulması ${message.member} tarafından kaldırıldı!`);
        //await logChannel.send(embed);
        const embed = new Discord.MessageEmbed().setColor('YELLOW').setDescription(stripIndents`
        **${mentioned.user.tag}** (\`${mentioned.user.id}\`) adlı kullanıcının \`Ses kanallarındaki\` susturulması kaldırıldı.
        \` • \` Kaldıran Yetkili: ${message.member} (\`${message.author.id}\`)
        \` • \` Kaldırılma Tarihi: \`${moment(Date.now()).format("LLL")}\``);
        //await message.guild.channels.cache.get(data.channels["log_vmute"]).send(embed);
    }
}
module.exports = vunMute;