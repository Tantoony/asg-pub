const Discord = require('discord.js');
const Command = require("../../../Base/Command");
const low = require('lowdb');
const { stripIndent } = require('common-tags');
const Points_profile = require('../../../../../MODELS/Economy/Points_profile');
const Points_config = require('../../../../../MODELS/Economy/Points_config');
const { checkHours } = require('../../../../../HELPERS/functions');

class stark extends Command {

    constructor(client) {
        super(client, {
            name: "stark",
            description: "Puan bilgisini verir..",
            usage: "stark",
            examples: ["stark"],
            category: "Genel",
            aliases: ["stark"],
            acceptedRoles: [],
            cooldown: 5000,
            enabled: true,
            adminOnly: false,
            ownerOnly: false,
            onTest: false,
            rootOnly: true,
            dmCmd: false
        });
    }

    async run(client, message, args) {
        const emojis = await low(client.adapters('emojis'));
        const channels = await low(client.adapters('channels'));
        const roles = await low(client.adapters('roles'));

        function bar(point, maxPoint) {
            const deger = Math.trunc(point * 10 / maxPoint);
            let str = "";
            for (let index = 2; index < 9; index++) {
                if ((deger / index) >= 1) {
                    str = str + data.emojis["ortabar_dolu"]
                } else {
                    str = str + data.emojis["ortabar"]
                }
            }
            if (deger === 0) {
                str = `${data.emojis["solbar"]}${str}${data.emojis["sagbar"]}`
            } else if (deger === 10) {
                str = `${data.emojis["solbar_dolu"]}${str}${data.emojis["sagbar_dolu"]}`
            } else {
                str = `${data.emojis["solbar_dolu"]}${str}${data.emojis["sagbar"]}`
            }
            return str;
        }


       // const pointData = await Points_profile.findOne({ _id: message.author.id });
       // const pointConfig = await Points_config.findOne({ _id: pointData.role });
        const myRole = message.guild.roles.cache.get("856266299285045288");
        const nexReole = message.guild.roles.cache.get("871185595492360222")
     /*   const nextRole = message.guild.roles.cache
            .filter(r => r.rawPosition >= myRole.rawPosition)
            .filter(r => r.hoist)
            .filter(r => r.id !== data.roles["booster"])
            .sort((a, b) => a.rawPosition - b.rawPosition).array().find(role => role.rawPosition > myRole.rawPosition);*/

        message.reply(new Discord.MessageEmbed().setDescription(`
        **Dante's INFE????O** puan bilgileri
        ${message.member} kullan??c??s??n??n puan bilgileri
        Yetkisi: ${myRole}
        ????????????????????????????????????
        Toplam Puan: \`10000\`
        Kay??t Puan??: \`30\`
        Mesaj Puan??: \`1000\`
        Davet Puan??: \`50\`
        Tagl?? Puan??: \`50\`
        Yetkili Al??m Puan??: \`50\`
        Public Puan??: \`5000\`
        Di??er Ses Puan??: \`3820\`
        Bonus Puan: \`0\`
        ????????????????????????????????????
        ${nexReole} rol??ne y??kselmek i??in \`500\` saatin var!
        ${bar(10000, 15000)}
        `).setColor('#7bf3e3'));

        
      /*  const pointData = await Points_profile.findOne({ _id: message.author.id });
        const pointConfig = await Points_config.findOne({ _id: pointData.role });
        const myRole = message.guild.roles.cache.get(pointData.role);
        const nextRole = message.guild.roles.cache
            .filter(r => r.rawPosition >= myRole.rawPosition)
            .filter(r => r.hoist)
            .filter(r => r.id !== data.roles["booster"])
            .sort((a, b) => a.rawPosition - b.rawPosition).array().find(role => role.rawPosition > myRole.rawPosition);

        message.reply(new Discord.MessageEmbed().setDescription(`
        **Dante's INFE????O** puan bilgileri
        ${message.member} kullan??c??s??n??n puan bilgileri
        Yetkisi: ${myRole}
        ????????????????????????????????????
        Toplam Puan: \`${pointData.msgPoints + pointData.points.map(plog => plog.points).reduce((a, b) => a + b, 0)}\`
        Kay??t Puan??: \`${pointData.points.filter(plog => plog.type === "registry").map(plog => plog.points).reduce((a, b) => a + b, 0)}\`
        Mesaj Puan??: \`${pointData.msgPoints}\`
        Davet Puan??: \`${pointData.points.filter(plog => plog.type === "invite").map(plog => plog.points).reduce((a, b) => a + b, 0)}\`
        Tagl?? Puan??: \`${pointData.points.filter(plog => plog.type === "tagged").map(plog => plog.points).reduce((a, b) => a + b, 0)}\`
        Yetkili Al??m Puan??: \`${pointData.points.filter(plog => plog.type === "authorized").map(plog => plog.points).reduce((a, b) => a + b, 0)}\`
        Public Puan??: \`${pointData.points.filter(plog => plog.type === "voice-public").map(plog => plog.points).reduce((a, b) => a + b, 0)}\`
        Di??er Ses Puan??: \`${pointData.points.filter(plog => plog.type === "voice-other").map(plog => plog.points).reduce((a, b) => a + b, 0)}\`
        Bonus Puan: \`${pointData.points.filter(plog => plog.type === "bonus").map(plog => plog.points).reduce((a, b) => a + b, 0)}\`
        ????????????????????????????????????
        ${nextRole} rol??ne y??kselmek i??in ${pointConfig.expiringHours - checkHours(pointData.created)} saatin var!
        ${bar(pointData.msgPoints + pointData.points.map(plog => plog.points).reduce((a, b) => a + b, 0), pointConfig.requiredPoint)}
        `).setColor('#7bf3e3'));*/
    }
}

module.exports = stark;