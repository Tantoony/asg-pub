const { stripIndent } = require("common-tags/lib");
const { ButtonCommand } = require("../../../../base/utils");
const { MessageEmbed, TextInputComponent } = require('discord.js');
class RolCekilis extends ButtonCommand {
    constructor(client) {
        super(client, {
            name: "temp_danışma",
            cooldown: 10000
        });
        this.client = client;
    }

    async run(client, interaction, data) {
        const Data = await client.models.submit.findOne({
            userId: interaction.customId.split('-').pop().split('_')[0],
            typeOf: interaction.customId.split('-').pop().split('_')[1]
        });
        if (!Data) return await interaction.reply({
            content: "Veri Bulunamadı",
            ephemeral: true
        });
        await interaction.component.setDisabled();
        const member = client.guild.members.cache.get(interaction.customId.split('-').pop().split('_')[0]);
        if (!member) await interaction.reply({
            content: "Kullanıcı Bulunamadı",
            ephemeral: true
        });
        const channel = await interaction.channel.parent.createChannel("- Yetkili Başvuru", {
            type: "GUILD_VOICE",
            permissionOverwrites: [
                {
                    id: interaction.guild.roles.everyone.id,
                    type: "ROLE",
                    deny: ["CONNECT"]
                },
                {
                    id: interaction.user.id,
                    type: "USER",
                    allow: ["CONNECT"]
                },
                {
                    id: member.user.id,
                    type: "USER",
                    allow: ["CONNECT"]
                }
            ]
        });
        const embed = new MessageEmbed().setDescription(stripIndent`
        Başvuran: <@${member.user.id}>
        Onaylayan: <@${interaction.user.id}>
        `).setAuthor({
            iconURL: interaction.user.avatarURL(),
            name: "Yetki Başvurusu"
        }).setColor("DARK_RED");
        const message = await client.guild.channels.cache.get(data.channels["danışma-feed"]).messages.fetch(Data.feedId);
        await client.guild.channels.cache.get(data.channels["danışma-log"]).send({
            embeds: [embed],
            components: [
                {
                    type: "ACTION_ROW",
                    components: [
                        {
                            type: "BUTTON",
                            style: "SUCCESS",
                            customId: `temp_danışma_karar:${message.id}_onay`,
                            label: "Yetki Başlat"
                        }
                    ]
                },
                new TextInputComponent(
                {
                    placeholder: "sebep",
                    type: "TEXT_INPUT",
                    style: "SHORT",
                    customId: `temp_danışma_karar:${message.id}_ret`,
                    label: "Başvuruyu Reddet",
                    required: true
                })
            ]
        });
        await client.models.submit.updateOne({
            userId: interaction.customId.split(':').pop().split('_')[0],
            typeOf: interaction.customId.split(':').pop().split('_')[1]
        }, { $set: { claimer: interaction.user.id } });
        await client.guild.channels.cache.get(data.channels["danışma-chat"]).send(stripIndent`
        Merhaba <@${Data.userId}>, talebiniz <@${interaction.user.id}> tarafından kabul edilmiştir. Sizin için oluşturulan <#${channel.id}> kanalına bekleniyorsunuz.
        `);

    }
}

module.exports = RolCekilis;