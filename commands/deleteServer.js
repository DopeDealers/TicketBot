const {RichEmbed} = require('discord.js');

exports.run = (client, message, args, level) => {
    client.sql.query("SELECT * FROM serversettings WHERE serverId = ?", [message.guild.id], (err, results) => {
        client.sql.query("SELECT * FROM tickets WHERE serverId = ?", [message.guild.id], (err2, results2) => {

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
  name: "dl",
  category: "System",
  description: "Deletes a server",
  usage: "list"
};