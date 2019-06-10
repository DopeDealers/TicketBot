exports.run = async (client, message, args) => {
  client.sql.query("SELECT * FROM tickets WHERE ticketuserId = ?", [message.author.id], (err, results) => {
      if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
      // testing prolly wony work
      if (message.channel.name != results[0].ticketId) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
          if (!results || !results[0]) return message.channel.send("You do not have a ticket active.");
          const test = await client.awaitReply(message, "Delete support ticket? [confirm, c]");
          if (["c", "confirm"].includes(test.toLowerCase())) {
              const userTicket = client.channels.find(channel => channel.name === results[0].ticketId);
              userTicket.delete();
              //const embedLog = new RichEmbed().setTitle(`LOG: ${results[0].ticket}`).setAuthor(message.author.username, message.author.avatarURL).addField(`**Closed**:`, `**${results[0].ticket}**`).setColor("#DC900C");
              //client.channels.get("557716476472328194").send({embed: embedLog});
              client.sql.query(`DELETE FROM tickets WHERE (ticketId, ticketuserId, ticketCategoryId, serverId, ticketLogId) VALUES ("${results[0].ticketId}", "${results[0].ticketuserId}", "${results[0].ticketCategoryId}", "${message.guild.id}", "${results[0].ticketLogId}")`) && client.logger.mysql(`Deleted ticket for ${results[0].ticketuserId}`);
          } else if (["n", "no", "cancel"].includes(test.toLowerCase())) {
              message.reply("Canceled.");
          }
  });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "close",
    category: "Ticket",
    description: "Close a ticket",
    usage: "close"
  };