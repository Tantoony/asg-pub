const { MessageActionRow, MessageButton } = require("discord.js");
const { PrefixCommand } = require("../../../../base/utils");
class ServerKontrol extends PrefixCommand {

    constructor(client) {
        super(client, {
            name: "serverkontrol",
            description: "Açıklama Belirtilmemiş.",
            usage: "Kullanım Belirtilmemiş.",
            examples: ["Örnek Bulunmamakta"],
            category: "OWNER",
            aliases: ["svkontrol"],
            accaptedPerms: [],
        });
    }

    async run(client, message, args, data, embed) {
        if (!message.member.roles.cache.some(ktria => [""].includes(ktria.id)) && !message.member.permissions.has("ADMINISTATOR")) return;
        // const button = new MessageActionRow().addComponents(new MessageButton().setCustomId("1").setLabel("Yetki Bilgisi").setStyle("PRIMARY"), new MessageButton().setCustomId("1").setLabel("Server Giriş").setStyle("PRIMARY"));
        //Normal Gösterim
        let yt = message.guild.roles.cache.filter(ktria => ktria.permissions.has("ADMINISTRATOR"))
        let urlyt = message.guild.roles.cache.filter(ktria => ktria.permissions.has("MANAGE_GUILD"))
        let rolyt = message.guild.roles.cache.filter(ktria => ktria.permissions.has("MANAGE_ROLES"))
        let channelyt = message.guild.roles.cache.filter(ktria => ktria.permissions.has("MANAGE_CHANNELS"))
        let topyt = message.guild.members.cache.filter(ktria => ktria.roles.cache.has("")).size;
        let url = message.guild.fetchVanityData();
        //Üyeleri Gösterim
        let yönetici = message.guild.roles.cache.filter(ktria => ("ADMINISTRATOR").some(ktria2 => ktria.permissions.has(ktria2)) && !ktria.managed)
        let urlgoren = message.guild.roles.cache.filter(ktria => ("MANAGE_GUILD").some(ktria2 => ktria.permissions.has(ktria2)) && !ktria.managed)
        let kanalgoren = message.guild.roles.cache.filter(ktria => ("MANAGE_CHANNELS").some(ktria2 => ktria.permissions.has(ktria2)) && !ktria.managed)
        let rolgoren = message.guild.roles.cache.filter(ktria => ("MANAGE_ROLES").some(ktria2 => ktria.permissions.has(ktria2)) && !ktria.managed)
        let embed = new MessageEmbed().setColor("DARK_RED").setDescription(`
        \`\`\`Yetkisi Olan Roller\`\`\`
        ${yt.size} rolde **YÖNETİCİ** izni açık Roller şu şekildedir;
        ${yt.map(ktria => `<@&${ktria.id}>`).join(', ')}
        ───────────────────────────────────────────────────────────────
        ${urlyt.size} role **SUNUCUYU YÖNET** izni açık Roller şu şekildedir;
        ${urlyt.map(ktria => `<@&${ktria.id}>`).join(', ')}
        ───────────────────────────────────────────────────────────────
        ${rolyt.size} rolse **ROL YÖNET** izni açık Roller şu şekildedir;
        ${rolyt.map(ktria => `<@&${ktria.id}>`).join(', ')}
        ───────────────────────────────────────────────────────────────
        ${channelyt.size} rolde **KANALLARI YÖNET** izni açık Roller şu şekildedir;
        ${channelyt.map(ktria => `<@&${ktria.id}>`).join(', ')}
        \`\`\`Yetkisi Olan Roller\`\`\`
        **YÖNETİCİ** yetkisi olan kullanıcılar şu şekildedir;
        ${yönetici.map(ktria => `<@${ktria.id}>`).join(', ')}
        ───────────────────────────────────────────────────────────────
        **SUNUCUYU YÖNET** yetkisi olan kullanıcılar şu şekildedir;
        ${urlgoren.map(ktria => `<@${ktria.id}>`).join(', ')}
        ───────────────────────────────────────────────────────────────
        **ROL YÖNET** yetkisi olan kullanıcılar şu şekildedir;
        ${rolgoren.map(ktria => `<@${ktria.id}>`).join(' ')}
        ───────────────────────────────────────────────────────────────
        **KANALLARI YÖNET** yetkisi olan kullanıcılar şu şekildedir;
        ${kanalgoren.map(ktria => `<@${ktria.id}>`).join(', ')}
        `)

    }

}

module.exports = ServerKontrol;