const { Client, CommandInteraction } = require('discord.js');

module.exports = {
    name: 'hello',
    description: 'Say hello to bot',
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async run(client, interaction) {
        await interaction.reply('Lubie placki :D');
    }
}