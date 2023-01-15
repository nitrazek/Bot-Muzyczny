const { Client, CommandInteraction } = require('discord.js');
const { Embed } = require('../handlers/embed');

module.exports = {
    name: 'pomiń',
    description: 'Pomiń piosenkę w kolejce',
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async run(client, interaction) {
        if (!interaction.guild.members.me.voice.channel) return Embed(interaction, 'Red', '❌ | Nie jestem na kanale głosowym');
        const queue = await client.DisTube.getQueue(interaction.member.voice.channel);
        if (!queue) return Embed(interaction, 'Blue', '🕳 | Brak utowrów w kolejce');

        await queue.skip(interaction.member.voice.channel);
        return Embed(interaction, 'Blue', '⏭ | Pominięto piosenkę');
    }
}