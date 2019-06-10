const {RichEmbed} = require('discord.js');

exports.run = (client, message, args, level) => {
    client.sql.query("SELECT * FROM serversettings WHERE serverId = ?", [message.guild.id], (err, results) => {
        const embed = new RichEmbed()
        .setDescription(`Prefix: ${results[0].prefix}\nServer Id: ${results[0].serverId}\nServer Name: ${results[0].serverName}\nServer Owner ID: ${results[0].serverownerId}\nMod Role ID: ${results[0].modRole} `)
        .setTitle("Server MySQL");
        message.channel.send({embed});
    });
};
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Mod"
};

exports.help = {
  name: "mod",
  category: "System",
  description: "Moderation",
  usage: "mod <ban/kick/mute>"
};