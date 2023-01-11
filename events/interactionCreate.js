const { Client, CommandInteraction } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async run(client, interaction) {
        if (!interaction.isCommand()) return;
        const command = await client.commands.get(interaction.commandName);
        if (!command) return interaction.reply(Uruchamianie_komend['komenda nie istnieje']);
        return command.run(client, interaction);
    }
}