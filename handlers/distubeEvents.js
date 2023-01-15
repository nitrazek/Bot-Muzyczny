const { Client } = require('discord.js');

/**
 * @param {Client} client 
 */
module.exports = (client) => {
    client.DisTube
        .on('playSong', (queue, song) =>
            queue.textChannel.send(
                `▶ gra | Gramy \`${song.name}\` - \`${song.formattedDuration}\`\nDodana przez: ${song.user
                }\n${status(queue)}`
            )
        )
        .on('addSong', (queue, song) =>
            queue.textChannel.send(
                `✔ | Dodano ${song.name} - \`${song.formattedDuration}\` do kolejki, przez ${song.user}`
            )
        )
        .on('addList', (queue, playlist) =>
            queue.textChannel.send(
                `✔ | Dodano listę \`${playlist.name}\` (${playlist.songs.length
                } piosenek) do kolejki\n${status(queue)}`
            )
        )
        .on('error', (channel, e) => {
            if (channel) channel.send(`❌ | Wystąpił błąd...`)
            console.error(e)
        })
        .on('empty', channel => channel.send('Kanał głosowy jest pusty, opuszczam go...'))
        .on('searchNoResult', (message, query) =>
            message.channel.send(`❌ | Nie znaleziono wyników dla: \`${query}\`!`)
        )
        .on('finish', queue => queue.textChannel.send('Koniec!'))
}

const status = queue =>
    `Głośność: \`${queue.volume}%\` | Filtr: \`${queue.filters.names.join(', ') || 'Off'}\` | Pętla: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Cała kolejka' : 'Ta piosenka') : 'Off'
    }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``