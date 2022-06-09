const Discord = require('discord.js');
const { ClientEvent } = require('../../../base/utils');
class RoleUpdate extends ClientEvent {
    constructor(client) {
        super(client, {
            name: "roleUpdate",
            action: "ROLE_UPDATE",
            privity: true,
            punish: "ban"
        });
        this.client = client;
    }

    async rebuild(oldRole, curRole) {
        let roleData = await this.client.models.roles.findOne({ meta: { $elemMatch: { _id: oldRole.id } } });
        if (!roleData) roleData = await this.client.models.roles.create({
            keyConf: null,
            meta: []
        });
        await this.client.models.roles.updateOne({ _id: roleData._id }, {
            $push: {
                meta: {
                    _id: curRole.id,
                    name: curRole.name,
                    icon: curRole.icon,
                    color: curRole.hexColor,
                    hoist: curRole.hoist,
                    mentionable: curRole.mentionable,
                    position: curRole.rawPosition,
                    bitfield: curRole.permissions.bitfield.toString(),
                    created: curRole.createdAt,
                    emoji: curRole.unicodeEmoji
                }
            }
        })
    }


    async refix(oldRole, curRole) {
        let roleData = await this.client.models.roles.findOne({ meta: { $elemMatch: { _id: oldRole.id } } });
        const metadata = roleData.meta.pop();
        await curRole.edit({
            name: metadata.name,
            color: metadata.hexColor,
            hoist: metadata.hoist,
            mentionable: metadata.mentionable,
            position: metadata.rawPosition,
            permissions: BigInt(metadata.bitfield)
        });

    }
}
module.exports = RoleUpdate;
