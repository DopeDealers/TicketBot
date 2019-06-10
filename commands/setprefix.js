exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    client.sql.query("SELECT * FROM serversettings WHERE serverId = ?", [message.guild.id], async (err, results) => {

        if (args.length < 1) {
            const response_def = await client.awaitReply(message, `No Argument detected, default prefix: /\nDo you wish to use this? [y/yes, n/no]`);
            if (["y", "yes"].includes(response_def.toLowerCase())) {

                client.sql.query("update serversettings set prefix = ? where serverId = ?", ['/', message.guild.id]);
                message.reply(`Prefix successfully edited to \`/\``);
            } else
            if (["n", "no"].includes(response_def.toLowerCase())) {
                message.reply("Action cancelled.");
            }
        }
        if (args.join(" ") > 5) return message.channel.send("5 and below buddy");

        if (args.join(" ") === results[0].prefix) return message.reply("This setting already has that value!");

        const response = await client.awaitReply(message, `Are you sure you want to set the guilds prefix to: ${args.join(" ")}\n[y/yes, n/no]`);

        if (["y", "yes"].includes(response.toLowerCase())) {

            client.sql.query("update serversettings set prefix = ? where serverId = ?", [args.join(" "), message.guild.id]);
            message.reply(`Prefix successfully edited to \`${args.join(" ")}\``);
        } else
        if (["n", "no", "cancel"].includes(response)) {
            message.reply("Action cancelled.");
        }
    });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["sp", "prefix"],
    permLevel: "Admin"
};
  
exports.help = {
    name: "setprefix",
    category: "System",
    description: "View or change prefix for your server.",
    usage: "setprefix [new prefix]"
};