module.exports = async (client, message) => {
    client.sql.query("SELECT * FROM serversettings WHERE serverId = ?", [message.guild.id], async (err, results) => {
    if (message.author.bot) return;
  
    const prefix = message.settings = results[0].prefix;
    
    if (message.content.indexOf(prefix) !== 0) return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    if (message.guild && !message.member) await message.guild.fetchMember(message.author);
  
    const level = client.permlevel(message);
  
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  
    if (!cmd) return;
  
    if (cmd && !message.guild && cmd.conf.guildOnly)
        return message.channel.send("Commands cant be ran in dm lol..");

    if (level < client.levelCache[cmd.conf.permLevel]) return message.channel.send("You do not have permission to run this."); 
  
    message.author.permLevel = level;
    
    message.flags = [];
    while (args[0] && args[0][0] === "-") {
      message.flags.push(args.shift().slice(1));
    }
  
    client.logger.cmd(`${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command [${cmd.help.name}]`);
        cmd.run(client, message, args, level);
    });
  };