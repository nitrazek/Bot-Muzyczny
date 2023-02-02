require('dotenv').config();
const fs = require('fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
require('./handlers/antiCrash.js')();
const ID = require('./config/id.json');

const globalCommands = true; //Czy rejestrować komendy globalnie
const clients = [];
const tokensAmount = parseInt(process.env.COUNT);
for (let i = 0; i < tokensAmount; i++) {
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildEmojisAndStickers
        ]
    });
    client.commands = new Collection();
    client.DisTube = new DisTube(client, {
        leaveOnFinish: true,
        emitNewSongOnly: true,
        savePreviousSongs: false,
        nsfw: true,
        emitAddSongWhenCreatingQueue: false,
        plugins: [new SpotifyPlugin()]
    });

    require('./handlers/distubeEvents.js')(client);
    clients.push(client);
}

fs.readdir('./commands/', (err, files) => {
    if (err) return console.error(err);
    const commandFiles = files.filter(file => file.endsWith('.js'));
    if (commandFiles.length <= 0) return console.log('Katalog /commands/ jest pusty!');
    const commandArray = [];
    for (const commandName of commandFiles) {
        const command = require('./commands/' + commandName);
        for (const client of clients) {
            client.commands.set(command.name, command);
        }
        commandArray.push(command);
    }
    for (const client of clients) {
        client.once('ready', () => {
            if (globalCommands)
                client.application.commands.set(commandArray);
            else
                client.guilds.cache.get(ID.serwer).commands.set(commandArray);
        });
    }
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    const eventFiles = files.filter(file => file.endsWith('.js'));
    if (eventFiles.length <= 0) return console.log('Katalog /envents/ jest pusty!');
    for (const eventName of eventFiles) {
        const event = require('./events/' + eventName);
        for (const client of clients) {
            if (event.once)
                client.once(event.name, async (...args) => event.run(client, ...args));
            else
                client.on(event.name, async (...args) => event.run(client, ...args));
        }
    }
});

for (let index = 0; index < tokensAmount; index++) {
    clients[index].login(process.env['TOKEN_' + (index + 1)]);
}