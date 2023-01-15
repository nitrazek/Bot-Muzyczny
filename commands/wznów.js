const { Client, CommandInteraction } = require('discord.js');

module.exports = {
    name: 'wznów',
    description: 'Wznów obecną piosenkę',
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async run(client, interaction) {
        if (!interaction.guild.members.me.voice.channel) return Embed(interaction, 'Red', '❌ | Nie jestem na kanale głosowym');
        const queue = await client.DisTube.getQueue(interaction.member.voice.channel);
        if (!queue) return Embed(interaction, 'Blue', '🕳 | Brak utworów w kolejce');

        await queue.resume(interaction.member.voice.channel);
        return Embed(interaction, 'Blue', '▶ | Wznowiono piosenkę');
    }
}