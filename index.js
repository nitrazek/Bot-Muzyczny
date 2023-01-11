require('dotenv').config();
const fs = require('fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildEmojisAndStickers
    ]
});
client.commands = new Collection();
require('./handlers/antiCrash.js')(client);
const ID = require('./config/id.json');

fs.readdir('./commands/', (err, files) => {
    if (err) return console.error(err);
    const commandFiles = files.filter(file => file.endsWith('.js'));
    if (commandFiles.length <= 0) return console.log('Katalog /commands/ jest pusty!');
    const commandArray = [];
    commandFiles.forEach((commandName) => {
        const command = require('./commands/' + commandName);
        client.commands.set(command.name, command);
        commandArray.push(command);
    });
    client.once('ready', () => {
        client.guilds.cache.get(ID.serwer).commands.set(commandArray);
    });
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    const eventFiles = files.filter(file => file.endsWith('.js'));
    if (eventFiles.length <= 0) return console.log('Katalog /envents/ jest pusty!');
    eventFiles.forEach((eventName) => {
        const event = require('./events/' + eventName);
        if (event.once)
            client.once(event.name, async (...args) => event.run(client, ...args));
        else
            client.on(event.name, async (...args) => event.run(client, ...args));
    });
});

client.login(process.env.TOKEN);