const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");
const { ClientEvent } = require('../../../base/utils');

class MsgCrte extends ClientEvent {
    constructor(client) {
        super(client, {
            name: "messageCreate"
        });
        this.client = client;
    }
    async run(message) {
        const client = this.client;
        if (message.author.bot) return;
        const member = await client.models.member.findOne({ _id: message.author.id, "afk_data.note": { $ne: null } });
        if (member) {
            if (member.afk_data.inbox.length == 0) return await message.reply(`Seni tekrardan görmek ne güzel!`);
            const embed = new MessageEmbed.setDescription(stripIndents`
            ${member.afk_data.inbox.length} yeni mesajın var!
            ●▬▬▬▬▬▬▬▬▬●
            ${member.afk_data.inbox.map(unread => `[⇱ ](${unread.link}) <@${unread.author}> <t:${unread.created.getTime() / 1000}:R> ${unread.content}`).join('\n')}
            `);
            await message.reply({
                embeds: [embed]
            });
            await client.models.member.updateOne({ _id: message.author.id }, { afk_data: { $set: { inbox: [], note: null } } });
        }
        if (message.mentions.members.first()) {
            const afksindata = await client.models.member.find({ "afk_data.note": { $ne: null } });
            const afks = afksindata.filter(d => message.mentions.members.map(m => m.user.id).includes(d._id));
            const strAfk = afks.map(afk => `<@${afk._id}> \`${afk.reason}\` sebebiyle, <t:${afk.created.getTime() / 1000}:R> AFK oldu!`)
            if (afks.length > 0) {
                message.reply({
                    embeds: [new MessageEmbed().setDescription(strAfk.join('\n'))]
                });
                await afks.forEach(async afk => {
                    await client.models.member.updateOne({ _id: afk._id }, {
                        afk_data: {
                            $push: {
                                inbox: {
                                    content: message.content,
                                    author: message.author.id,
                                    link: message.url,
                                    created: new Date()
                                }
                            }
                        }
                    });
                });
            }
        }


    }
}
module.exports = MsgCrte;