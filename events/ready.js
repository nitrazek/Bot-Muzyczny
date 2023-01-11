const { Client, ActivityType } = require('discord.js');
const ID = require('../config/id.json');

module.exports = {
    name: 'ready',
    once: true,
    /**
     * @param {Client} client 
     */
    async run(client) {
        client.user.setActivity('Music', { type: 'Listening' });
        const current = new Date();
        date = ((current.getDate() < 10) ? '0' : '') + current.getDate() + '/' + (((current.getMonth() + 1) < 10) ? '0' : '') + (current.getMonth() + 1) + '/' + current.getFullYear() + ' ';
        date += ((current.getHours() < 10) ? '0' : '') + current.getHours() + ':' + ((current.getMinutes() < 10) ? '0' : '') + current.getMinutes() + ':' + ((current.getSeconds() < 10) ? '0' : '') + current.getSeconds();
        console.log(date + ' - Bot Muzyczny jest online!');
    }
}