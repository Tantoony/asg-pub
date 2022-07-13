const { Discord, createMessageComponentCollector, MessageActionRow, MessageSelectMenu  } = require("discord.js");
const { intersection } = require("lodash");

class KB extends Command {
    constructor(client) {
        super(client, {
            name: "kb",
            description: "kullanıcı bilgisini gösterir",
            usage: "kb Ktria/id",
            examples: ["kb 711897884391637062"],
            cooldown: 10000
        });
    };
    async run(client, message, args, data, ctx) {
        client = this.client;
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member) return message.replt({content: `bir kullanıcı belirtmelisiniz!`})
        const kbpanel = new MessageActionRow().addComponents(new MessageSelectMenu().setPlaceholder('Kullanıcı panel').setCustomId('kbpanel').addOptions([{ label:"Kullanıcı",value:"kb"}, { label: "Sicil", value:"sicil"}, ]));
        const message = await message.reply({content:`${member} üyesine bir aşağıdaki menüden yapmak istediğiniz işlemi seçin!`,components: [kbpanel]});
        const ktria = await message.createMessageComponentCollector({ componentType: 'SELECT_MENU', filter: (ktria) => ktria.user.id === message.author.id, time: 50000,});
        ktria.on('collect', async (interaction) => {
            
            if (interaction.values[0] == "kb") {

                let embed = new MessageEmbed().setColor("RANDOM").setDescription(`
                User/ID: **${member} - (${member.id})**
                Create Acount: **${new Date(member.user.createdTimestamp)}**
                Status: **${member.user.presence.activities.find(a => a.type === "CUSTOM_STATUS") ? member.user.presence.activities.find(a => a.type === "CUSTOM_STATUS").state : "Bulunamadı"}**
                Server Name: **${member.displayName}**
                Join Servers: **${new Date(member.joinedTimestamp)}**
                Order of Participation: **${(message.guild.members.cache.filter(a => a.joinedTimestamp <= member.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}**
                Roles: ${member.roles.cache.size > 5 ? "5 rolden fazla rol var" : `${member.roles.cache.filter(s => s.name != "@everyone").map(s => `${s}`).join(',')} (${member.roles.cache.size - 1})`}  
                `)
                message.reply({embeds: [embed]})
                message.react(data.emojis["ok"])
                
                }});
                
                
             if (interaction.values[0] == "sicil") {
                    
                    const registerdata = await client.models.member.find({ registries: { $elemMatch: { executor: interaction.user.id } } });
                    const registertotal = registerdata.length || 1;
                    const myProfile = await Profile.findOne({ _id: mentioned.user.id });
                    const İnvdata = await InviteData.findOne({ _id: mentioned.user.id });
                    let embed2 = new MessageEmbed().setColor("RANDOM").setDescription(`
                    Your invites: **${rain(client, İnvdata.records.length)}**
                    Your xp: **${myProfile ? myProfile.xp : 0}**
                    Your register data: **${registertotal}**`)
                      
                      }}};
   
module.exports = KB;
