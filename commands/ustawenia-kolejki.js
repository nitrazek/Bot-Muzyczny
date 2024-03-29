const { Client, ApplicationCommandOptionType, CommandInteraction } = require('discord.js');
const { Embed } = require('../handlers/embed');

module.exports = {
    name: 'ustawienia-kolejki',
    description: 'Ustawienia kolejki (wyświetlanie, zapętlenie, wymieszanie, proponowanie)',
    options: [
        {
            name: 'ustawienie',
            description: 'Wybierz ustawienie kolejki',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: '🔢 Wyświetlanie kolejki', value: 'show' },
                { name: '🔁 Zapętlenie kolejki / utworu', value: 'loop' },
                { name: '🔀 Wymieszanie utworów w kolejce', value: 'mix' },
                { name: '🔜 Proponowanie kolejnych utworów', value: 'autoplay' }
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

        switch (options.getString('ustawienie')) {
            case 'show':
                const musicList = queue.songs.map((song, id) => {
                    return `**${id === 0 ? 'Teraz' : id}**:  \`${song.name}\` - \`${song.formattedDuration}\``
                }).join('\n');
                return Embed(interaction, 'Blue', `**Aktualna kolejka:**\n${(musicList.length() > 4000) ? musicList.substring(0, 4000) + '\n...' : musicList}\nKolejka bota: *${client.user.username}*`);
            case 'loop':
                let loopMode = await client.DisTube.setRepeatMode(queue);
                return Embed(interaction, 'Blue', `🔀 | Ustawiono zapętlenie na: **${loopMode ? loopMode == 2 ? 'kolejkę' : 'piosenkę' : 'wyłączono'}**`);
            case 'mix':
                await queue.shuffle(voiceChannel);
                return Embed(interaction, 'Blue', '🔀 | Wymieszano utwory w kolejce');
            case 'autoplay':
                let autoplayMode = await queue.toggleAutoplay(voiceChannel);
                return Embed(interaction, 'Blue', `🔀 | Ustawiono proponowanie utworów na: **${autoplayMode ? 'włączone' : 'wyłączone'}**`);
            default:
                break;
        }
    }
}