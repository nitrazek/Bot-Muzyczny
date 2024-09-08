const { Client } = require('discord.js');
const { channelEmbed } = require('./embed');

/**
 * @param {Client} client 
 */
module.exports = (client) => {
    client.DisTube
        .on('playSong', (queue, song) =>
            channelEmbed(
                queue.textChannel,
                'Blue',
                `🎦 | Gramy \`${song.name}\` - \`${song.formattedDuration}\`\nDodana przez: **${song.user.username}**\n${status(queue)}`
            )
        )
        .on('addSong', (queue, song) =>
            channelEmbed(
                queue.textChannel,
                'Blue',
                `✅ | Dodano \`${song.name}\` - \`${song.formattedDuration}\` do kolejki, przez **${song.user.username}**`
            )
        )
        .on('addList', (queue, playlist) =>
            channelEmbed(
                queue.textChannel,
                'Blue',
                `✅ | Dodano listę \`${playlist.name}\` (${playlist.songs.length} piosenek) do kolejki\n}`
            )
        )
        .on('error', (channel, e) => {
            if (channel)
                channelEmbed(
                    channel,
                    'Red',
                    `❌ | Wystąpił błąd...`
                )
            console.error(e)
        })
        .on('searchNoResult', (message, query) =>
            channelEmbed(
                message.channel,
                'Red',
                `❌ | Nie znaleziono wyników dla: \`${query}\`!`
            )
        )
        .on('finish', queue => {
            channelEmbed(
                queue.textChannel,
                'Purple',
                'Brak kolejnych piosenek w kolejce, opuszczam kanał... 👋'
            );
            queue.voice.leave();
        })
}

const status = queue =>
    `Głośność: \`${queue.volume}%\` | Pętla: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Cała kolejka' : 'Ta piosenka') : 'Off'
    }\` | Proponowanie: \`${queue.autoplay ? 'On' : 'Off'}\``