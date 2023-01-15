const { Client, CommandInteraction } = require('discord.js');
const { Embed } = require('../handlers/embed');

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
        if (!command) return interaction.reply('Tak komenda nie istnieje');

        if (!interaction.member.voice.channel) return Embed(interaction, 'Red', 'Musisz być połączony z kanałem głosowym, aby zarządzać muzyką.');
        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
            return Embed(interaction, 'Orange', `Muzyka gra na kanale ${interaction.guild.members.me.voice.channel}. Musisz być na tym samym kanale co ja.`);

        return command.run(client, interaction);
    }
}