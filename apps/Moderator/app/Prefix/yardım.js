const Discord = require('discord.js');
const { PrefixCommand } = require("../../../../base/utils");
class Yardım extends PrefixCommand {
    constructor(client) {
        super(client, {
            name: "yardım",
            description: "Bütün komutları kategoriye bölerek açıklar ya da belirtiklen komutu detaylandırır.",
            usage: "yardım",
            examples: ["yardım", "yardım cmute"],
            category: "Genel",
            cooldown: 10000
        });
    }

    async run(client, message, args) {
    let embed = new MessageEmbed().setColor("DARK_RED").setDescription(`
    • .afk
    • .avatar
    • .cihaz
    • .banlist
    • .cmute
    • .vmute
    • .cunmute
    • .vunmute
    • .forcegit
    • .forcecek
    • .gorev
    • .invite
    • .link
    • .kullanicibilgi
    • .menu
    • .panel
    • .pm2 
    • .pull
    • .reboot
    • .say
    • .serverinfo
    • .ses
    • .sesli
    • .sessay
    • .slowmode
    • .snipe
    • .stat
    • .sunucuinfo
    • .suspectac
    • .svkontrol
    • .tasksec
    • .temizle
    • .unjail
    • .yetenek
    • .yetkili
    • .ysay 
    • .ban
    • .jail
    • .kayit
    • .mute
    • .rol
    • .userinfo
    • .kayitsil
    • .cekilis
    • .etkinlik
    • .hobi
    • .katılımcı
    • .oyun
    • .renkler
    • .danisma
    • .menu`)
    

    message.reply({embeds: [embed]})
        


        }
    }


module.exports = Yardım;
