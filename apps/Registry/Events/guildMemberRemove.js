const { ClientEvent } = require("../../../base/utils");

class GuildMemberRemove extends ClientEvent {
    constructor(client) {
        super(client, {
            name: "guildMemberRemove"
        })
        this.client = client;
    }

    async run(member) {
        const client = this.client;
        if (member.guild.id !== client.config.server) return;
        const pruneentry = await member.guild.fetchAuditLogs({ type: "MEMBER_PRUNE" }).then(logs => logs.entries.first());
        const model = await client.models.member.findOne({ _id: member.user.id });
        if (model) await client.models.member.updateOne({ _id: member.user.id }, { $set: { authorized: [], roles: [] } });
        if (pruneentry && pruneentry.createdTimestamp >= Date.now() - 10000) {
            const removed = pruneentry.extra.removed;
            const days = this.audit.extra.days;
            client.handler.emit("ban", this.audit.executor.id, this.client.user.id, "* Üye Çıkarma", "p", `${days} günde ${removed} kadar aktif olmayan üyeyi sunucudan ${pruneentry.reason ? pruneentry.reason : "bilinmeyen"} sebeple çıkardı.`);
            await member.guild.members.ban(pruneentry.executor.id, { reason: `${days} günde ${removed} kadar aktif olmayan üyeyi sunucudan ${pruneentry.reason ? pruneentry.reason : "bilinmeyen"} sebeple çıkardı.` });
            return;
        }
        const entry = await member.guild.fetchAuditLogs({ type: "MEMBER_KICK" }).then(logs => logs.entries.first());
        if ((entry.target.id === member.user.id) && entry.createdTimestamp >= Date.now() - 1000) {
            const exeMember = member.guild.members.cache.get(entry.executor.id);
            client.handler.emit("jail", exeMember.user.id, this.client.user.id, "* Üye Atma", "Perma", 1);
            return;
        }
    }
}
module.exports = GuildMemberRemove;