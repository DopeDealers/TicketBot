const {RichEmbed} = require('discord.js');

exports.run = (client, message, args, level) => {
    client.sql.query("SELECT * FROM tickets WHERE (serverId = ?, ticketuserId = ?)", [message.guild.id, message.author.id], (err, results2) => {
        message.delete();
        if (!results2 || !results2[0]) {
            client.sql.query("SELECT * FROM serversettings WHERE serverId = ?", [message.guild.id], (err, results) => {
                message.guild.createChannel(`ticket-${client.createId(5)}`, {
                    type: 'text'
                }).then(async tick => {
                    tick.setParent(results[0].ticketCategoryId);
                    client.sql.query(`INSERT INTO tickets (ticketId, ticketuserId, ticketCategoryId, serverId, ticketLogId) VALUES ("${tick.name}", "${message.author.id}", "${results[0].ticketCategoryId}", "${message.guild.id}", "${results[0].ticketLogId}")`);
                    let everyone = message.guild.roles.find(role => role.name === "@everyone");
                    //let role = message.guild.roles.find(role => role.id === results[0].modRole);
                    // tick.overwritePermissions(role, {
                    //     SEND_MESSAGES: true,
                    //     READ_MESSAGES: true
                    // });
                    tick.overwritePermissions(everyone, {
                        SEND_MESSAGES: false,
                        READ_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });
                    tick.overwritePermissions(message.author.id, {
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: true,
                        READ_MESSAGES: true
                    });
                    tick.setTopic(`${message.author.id} : [${message.author.username}] Ticket`).catch(console.error);
                    awaitReply = async (question, limit = 600000) => {
                        const filter = m => m.author.id === message.author.id;
                        await tick.send(question).then(rem => {
                            setTimeout(function() {
                                rem.delete();
                            }, 20000);
                        });
                        try {
                            const collected = await tick.awaitMessages(filter, {
                                max: 1,
                                time: limit,
                                errors: ["time"]
                            });
                            collected.first().delete();
                            return collected.first().content;
                        } catch (e) {
                            return false;
                        }
                    };
                    //const log = client.channels.find(guild => guild.id === results[0].ticketLogId);
                    const desc = await awaitReply("Please give us a reason as to why you are creating the ticket!");
                    const embed = new RichEmbed().setTitle(`${tick.name}`).setAuthor(message.author.username, message.author.avatarURL).addField(`Description:`, `${desc.toProperCase()}`).setFooter("If you did not mean to open this ticket type /close || TicketBot-v2").setColor("00bfff");
                    //const embedLog = new RichEmbed().setTitle(`LOG: ${tick.name}`).setAuthor(message.author.username, message.author.avatarURL).addField(`**Reason**:`, `**${desc.toProperCase()}**`).setColor("00bfff");
                    tick.send({
                        embed
                    });
    
                    //log.setTopic(`temp`);
                    
                });
             });
    } else return message.reply(`It appears you currently have a ticket in progress... dming you the ticket number..`).then(del => {
        setTimeout(function() {
            message.author.send(`Ticket Id: ${results2[0].ticketId}`).catch(err => message.reply("I cant dm you! whoops"));
            del.delete();
        }, 7000);
    });
});
};
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "ticket",
  category: "Ticket",
  description: "Lists server configs",
  usage: "ticket"
};