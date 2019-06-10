const {RichEmbed} = require('discord.js');

exports.run = (client, message, args, level) => {
    message.reply(`you joined on ${message.author.createdAt}`);
};
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "user"
};

exports.help = {
  name: "temp",
  category: "System",
  description: "Lists server configs",
  usage: "temp"
};