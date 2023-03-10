const { Client, ApplicationCommandOptionType, CommandInteraction } = require('discord.js');
const { Embed } = require('../handlers/embed');

module.exports = {
    name: 'sterowanie-muzyką',
    description: 'Sterowanie muzyką (wznów, zatrzymaj, pomiń, wyjście)',
    options: [
        {
            name: 'akcja',
            description: 'Wybierz akcję do wykonania',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: '▶ Wznów piosenkę', value: 'resume' },
                { name: '⏸ Zatrzymaj piosenkę', value: 'pause' },
                { name: '⏭ Pomiń piosenkę', value: 'skip' },
                { name: '⏹ Wyjście z kanału', value: 'quit' }
            ]
        }
    ],

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async run(client, interaction) {
        const { options, guild, member } = interaction;
        const voiceChannel = member.voice.channel;

        if (!guild.members.me.voice.channelId) return Embed(interaction, 'Red', '❌ | Nie jestem na kanale głosowym');
        if (voiceChannel.id !== guild.members.me.voice.channelId) return Embed(interaction, 'Red', '❌ | Nie jesteśmy na tym samym kanale głosowym');

        const queue = await client.DisTube.getQueue(voiceChannel);
        if (!queue) return Embed(interaction, 'Blue', '🕳 | Brak utworów w kolejce');

        switch (options.getString('akcja')) {
            case 'resume':
                await queue.resume(voiceChannel);
                return Embed(interaction, 'Blue', '▶ | Wznowiono piosenkę');
            case 'pause':
                await queue.pause(voiceChannel);
                return Embed(interaction, 'Blue', '⏸ | Zatrzymano piosenkę');
            case 'skip':
                if (queue.songs.length <= 1) return Embed(interaction, 'Red', "❌ | Brak kolejnych utworów w kolejce");
                await queue.skip(voiceChannel);
                return Embed(interaction, 'Blue', '⏭ | Pominięto piosenkę');
            case 'quit':
                await queue.stop(voiceChannel);
                return Embed(interaction, 'Blue', '⏹ | Opuszczono kanał');
            default:
                return;
        }
    }
}