module.exports = async client => {
	// Log that the bot is online.

	client.appInfo = await client.fetchApplication();
	setInterval(async () => {
		client.appInfo = await client.fetchApplication();
	}, 60000);


	var cMembers = client.users.filter(u => u.id !== '1').size; // Get's number of members cached. (Filters out Clyde)
	var gCount = client.guilds.size;
	// Both `wait` and `client.log` are in `./modules/functions`.
   client.logger.log(`Logged into '${client.user.tag}' (${client.user.id}). Ready to serve ${cMembers} users in ${gCount} guilds. Bot Version: ${client.version}`);

  // Make the bot "play the game" which is the help command with default prefix.
  client.user.setActivity(`TicketBot | /help`, {type: "WATCHING"});
};