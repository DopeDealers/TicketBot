const {RichEmbed} = require('discord.js');

exports.run = (client, message, args, level) => {
    client.sql.query("SELECT * FROM serversettings WHERE serverId = ?", [message.guild.id], (err, results) => {
        switch (args[0]) {
            case 'modrole': {
                if (isNaN(args[1])) {
                    message.reply(`Argument for [${args[0]}] is not an INT/ID`);
                } else {
                    client.sql.query("update serversettings set modRole = ? where serverId = ?", [args[1], message.guild.id]);
                    message.channel.send(`Mod role updated to: ${args[1]}`);
                }
                break;
            }
            case 'ticketlog': {
                if (isNaN(args[1])) {
                    //const o = message.mentions.channels.first();
                    message.reply(`Argument for [${args[0]}] is not an INT/ID`);
                } else {
                    client.sql.query("update serversettings set ticketLogId = ? where serverId = ?", [args[1], message.guild.id]);
                    message.channel.send(`Ticket log channel updated to: ${args[1]}`);
                }
                break;
            }
            case 'ticketcategory': {
                if (isNaN(args[1])) {
                    message.reply(`Argument for [${args[0]}] is not an INT/ID`);
                } else {
                    client.sql.query("update serversettings set ticketCategoryId = ? where serverId = ?", [args[1], message.guild.id]);
                    message.channel.send(`Ticket category updated to: ${args[1]}`);
                }
                break;
            }
        }
    });
};
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Admin"
};

exports.help = {
  name: "edit",
  category: "System",
  description: "Lists server configs",
  usage: "edit <modrole/ticketlog/ticketcategory>"
};