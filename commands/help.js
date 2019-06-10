exports.run = (client, message, args, level) => {

  const Discord = require('discord.js');
  client.sql.query("SELECT * FROM serversettings WHERE serverId = ?", [message.guild.id], async (err, results) => {

  const prefix = results[0].prefix;
  // If no specific command is called, show all filtered commands.
  if (!args[0]) {
    // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
    const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);

    // Here we have to get the command names only, and we use that array to get the longest name.
    // This make the help commands "aligned" in the output.
    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    let currentCategory = "";
    let output = `**- Command List -**\n\n__Use ${prefix}help [commandname] for more info__\n`;
    const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
    sorted.forEach( c => {
      const cat = c.help.category.toProperCase();
      if (currentCategory !== cat) {
        output += `\u200b\n** ${cat}: **\n`;
        currentCategory = cat;
      }
      output += `${prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} : ${c.help.description}\n`;
    });

    const embed1 = new Discord.RichEmbed()
    .setDescription(output)
    .setThumbnail(`https://cdn.discordapp.com/attachments/456158758876479498/456158806192291840/906727806_0ee055ab-7ce4-4e9e-96e3-7a60c97d77c8.png`)
    .setColor(`00bfff`);
    message.channel.send({ embed: embed1});

  } else {
    // Show individual command's help.
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      if (level < client.levelCache[command.conf.permLevel]) return;
      if (command.conf.aliases == "") {
        const aliases = "No aliases found"; 
        console.log(" No aliases found ");
        const embed2 = new Discord.RichEmbed()
       .setDescription(`**- ${command.help.name} -** \n${command.help.description}\n**usage:**  ${command.help.usage}\n**aliases:** ${aliases}`)
       .setThumbnail(`https://cdn.discordapp.com/attachments/456158758876479498/456158806192291840/906727806_0ee055ab-7ce4-4e9e-96e3-7a60c97d77c8.png`)
       .setColor(`00bfff`);
       message.channel.send({ embed: embed2 });
      } else {
        const aliases1 = command.conf.aliases.join(", ");
        const embed3 = new Discord.RichEmbed()
       .setDescription(`**- ${command.help.name} -** \n${command.help.description}\n**usage:**  ${command.help.usage}\n**aliases:** ${aliases1}`)
       .setThumbnail(`https://cdn.discordapp.com/attachments/456158758876479498/456158806192291840/906727806_0ee055ab-7ce4-4e9e-96e3-7a60c97d77c8.png`)
       .setColor(`00bfff`);
       message.channel.send({ embed: embed3 });
      }
    }
  }
 });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["h", "halp"],
  permLevel: "User"
};

exports.help = {
  name: "help",
  category: "System",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};