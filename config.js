
const config = {

    "ownerIDS": ["188712985475284996", "218965134566096907"],
  
    "admins": [],
  
    "support": [],
  
    "token": "",
  
    permLevels: [
        { level: 0,
          name: "User", 
          check: () => true
        },
    
        /*
        this is still like. bad.
        { level: 2,
          name: "Mod",
          check: (message, client) => {
            client.sql.query("SELECT * FROM serversettings WHERE serverId = ?", [message.guild.id], async (err, results) => {
                
            try {
              const modRole = message.guild.roles.find(r => r.name.toLowerCase() === '581573856431439889');
              if (modRole && message.member.roles.has(modRole.id)) return true;
            } catch (e) {
              return false;
            }
           });
          }
        },*/
    
        { level: 3,
          name: "Admin", 
          check: (message) => {
            try {

              const adminPerm = message.member.hasPermission("ADMINISTRATOR");
              return (adminPerm && message.member.hasPermission("ADMINISTRATOR"));
            } catch (e) {
              return false;
            }
          }
        },
        { level: 4,
          name: "Server Owner", 
          check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
        },
        { level: 8,
          name: "Bot Support",
          check: (message) => config.support.includes(message.author.id)
        },
        { level: 9,
          name: "Bot Admin",
          check: (message) => config.admins.includes(message.author.id)
        },
    
        
        { level: 10,
          name: "Bot Owner", 
          check: (message) => config.ownerIDS.includes(message.author.id)
        }
      ]
    };

module.exports = config;