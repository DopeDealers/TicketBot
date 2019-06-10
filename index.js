const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");

const client = new Discord.Client();

client.logger = require("./utils/Logger");
client.commands = new Enmap();
client.aliases = new Enmap();
const mysql = require('mysql');
client.version = '2.0.1-beta-v3';

//insert database details here
client.sql = mysql.createConnection({
  host     : '',
  user     : '',
  password : '',
  database : ''
});
client.config = require(`./config.js`);

require("./utils/functions.js")(client);

const init = async () => {

    const cmds = await readdir("./commands/");
    client.logger.log(`Loading a total of ${cmds.length} commands.`);
    cmds.forEach(f => {
      if (!f.endsWith(".js")) return;
      const response = client.loadCommand(f);
      if (response) console.log(response);
    });
  
    const event = await readdir("./events/");
    client.logger.log(`Loading a total of ${event.length} events.`);
    event.forEach(file => {
      const eventName = file.split(".")[0];
      client.logger.log(`Loading Event: ${eventName}`);
      const event = require(`./events/${file}`);
   
      client.on(eventName, event.bind(null, client));
    });
  
    client.levelCache = {};
    for (let i = 0; i < client.config.permLevels.length; i++) {
      const thisLevel = client.config.permLevels[i];
      client.levelCache[thisLevel.name] = thisLevel.level;
    }
    client.sql.connect(function(err) {
      if (err) {
        client.logger.mysql(err);
        return;
      }
      
      client.logger.mysql(`connected as id: ${client.sql.threadId}`);
    });
    
    client.login(client.config.token);
  
  };
  
  init();