module.exports = async (client, guild) => {
              const defaultserv = {
                  "modRole": "1234567",
                  "ticketCategoryId": "1234",
                  "ticketLogId": "1234",
                  "prefix": "/",
                  "serverId": guild.id,
                  "serverName": guild.name,
                  "serverownerId": guild.owner.id,
              }
              client.sql.query("INSERT INTO serversettings SET ?", defaultserv, (err) => {
                  if (err) return console.error(err);
                  client.logger.mysql(`Server Inserted! ${defaultserv.serverName}`);
              });
}