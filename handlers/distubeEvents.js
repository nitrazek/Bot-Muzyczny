const { Client } = require('discord.js');

/**
 * @param {Client} client 
 */
module.exports = (client) => {
    client.DisTube
        .on('playSong', (queue, song) =>
            queue.textChannel.send(
                `▶ | Gramy \`${song.name}\` - \`${song.formattedDuration}\`\nDodana przez: **${song.user.username}**\n${status(queue)}`
            )
        )
        .on('addSong', (queue, song) =>
            queue.textChannel.send(
                `✅ | Dodano \`${song.name}\` - \`${song.formattedDuration}\` do kolejki, przez **${song.user.username}**`
            )
        )
        .on('addList', (queue, playlist) =>
            queue.textChannel.send(
                `✅ | Dodano listę \`${playlist.name}\` (${playlist.songs.length} piosenek) do kolejki\n}`
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
        .on('finish', queue => queue.textChannel.send('Brak kolejnych piosenek w kolejce, opuszczam kanał...'))
}

const status = queue =>
    `Głośność: \`${queue.volume}%\` | Pętla: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Cała kolejka' : 'Ta piosenka') : 'Off'
    }\` | Proponowanie: \`${queue.autoplay ? 'On' : 'Off'}\``