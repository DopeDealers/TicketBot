module.exports = async (client, guild) => {

    client.sql.query(`DELETE FROM serversettings WHERE serverid = ${guild.id}`) ;
    client.logger.mysql(`SERVER REMOVED: ${guild.id}`);
    client.logger.server(`bye bye ${guild.name}`);
    
};