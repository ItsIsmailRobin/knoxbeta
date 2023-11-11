const mongoose = require('mongoose');
const { Database } = require("quickmongo");
const MusicBot = require("./src/structures/MusicClient");
const k = "KRONIX | "
const client = new MusicBot();
module.exports = client; 
client._loadPlayer()
client._loadClientEvents()
client._loadNodeEvents()
client._loadPlayerEvents()
client._loadCommands()
client._loadSlashCommands()
client.connect()

process.on('unhandledRejection', (reason, p) => {
    console.log(k, reason, p);
});

process.on('uncaughtException', (err, origin) => {
    console.log(k, err, origin);
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log(k, err, origin);
});

process.on('multipleResolves', (type, promise, reason) => {
    console.log(k, type, promise, reason);
});

client.db = new Database(client.config.mongourl);
client.db.connect()