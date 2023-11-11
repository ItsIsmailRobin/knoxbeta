require("dotenv").config();

module.exports = {
  token: process.env.TOKEN || '', // your discord bot token
  prefix: process.env.PREFIX || '!', // bot prefix
  ownerID: process.env.OWNERID?.split(',') || ['575261186438987781'], //your discord id
  SpotifyID: process.env.SPOTIFYID || 'e6f84fbec2b44a77bf35a20c5ffa54b8', // spotify client id
  SpotifySecret: process.env.SPOTIFYSECRET || '498f461b962443cfaf9539c610e2ea81', // spotify client secret
  mongourl: process.env.MONGO_URI || 'mongodb+srv://arjunn:premiumop123@cluster0.dpw1dmi.mongodb.net/?retryWrites=true&w=majority', // MongoDb URL
  embedColor: process.env.COlOR || '#ad8bff', // embed colour
  logs: process.env.LOGS || '1172409119525838910', // Discord channel id 
  links: {
    support: process.env.SUPPORT || 'https://discord.gg/EttmFjhhq5',
    invite: process.env.INVITE || 'https://discord.com/api/oauth2/authorize?client_id=984846357653254174&permissions=20016384&scope=bot',
    vote: process.env.VOTE || 'https://discord.gg/EttmFjhhq5',
    bg: process.env.BG || 'https://i.postimg.cc/d3047PpT/1097455999117447168.png',
  },

  nodes: [
    {
      url: process.env.NODE_URL || 'lava.link:80',
      name: process.env.NODE_NAME || 'Kronix',
      auth: process.env.NODE_AUTH || 'kronix',
      secure: parseBoolean(process.env.NODE_SECURE || 'false'),
    },
  ],
};

function parseBoolean(value){
    if (typeof(value) === 'string'){
        value = value.trim().toLowerCase();
    }
    switch(value){
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}
