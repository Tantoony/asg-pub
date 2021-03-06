const low = require('lowdb');
const { MessageEmbed, ApplicationCommand } = require('discord.js');
module.exports = class AFKCommand extends ApplicationCommand {
    constructor(client, data, guild, guildId) {
        super(client, data = {
            name: 'booster',
            description: 'Boosterların isim değiştirme komutu.',
            options: [
                {
                    type: "STRING",
                    name: 'isim',
                    description: 'İsmin ne olsun?',
                    required: true,
                }
            ],
            defaultPermission: false,
            guildId: [guildId],
            permissions: [
                "booster"
            ]
        }, guild, guildId);
        this.filePath = __filename;
    }

    async run(ctx) {
        const client = ctx.creator.client;
        const utils = await low(client.adapters('utils'));
        const roles = await low(client.adapters('roles'));
        const channels = await low(client.adapters('channels'));
        const emojis = await low(client.adapters('emojis'));
        const mentioned = client.guilds.cache.get(ctx.guildID).members.cache.get(ctx.user.id);
        const pointed = client.config.tags[0].some(t => ctx.user.username.includes(t)) ? client.config.tag[0] : client.config.extag;
        if (client.config.tags[0].some(tag => mentioned.user.username.includes(tag))) await mentioned.roles.add(data.roles["crew"]);
        await mentioned.setNickname(`${pointed} ${ctx.options["isim"]}`);
        const embed = new MessageEmbed().setColor('#2f3136').setDescription(`${data.emojis["pando1"]} Başarıyla Ayarlandı!`);
        await ctx.send({
            embeds: [embed]
        });
    }
}
