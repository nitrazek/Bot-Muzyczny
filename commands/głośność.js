const { Client, CommandInteraction, ApplicationCommandOptionType } = require('discord.js');
const { Embed } = require('../handlers/embed');

module.exports = {
    name: 'głośność',
    description: 'Dostosuj głośność',
    options: [
        {
            name: 'procent',
            description: 'Podaj procent od 1 do 100',
            type: ApplicationCommandOptionType.Number,
            required: true
        }
    ],
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async run(client, interaction) {
        if (!interaction.guild.members.me.voice.channel) return Embed(interaction, 'Red', '❌ | Nie jestem na kanale głosowym');

        try {
            const volume = interaction.options.getNumber('procent');
            if (volume > 100 || volume < 1) return Embed(interaction, 'Orange', '❌ | Wartość musi być między 1 a 100');

            client.DisTube.setVolume(interaction.member.voice.channel, volume);
            return Embed(interaction, 'Blue', `🔊 | Ustawiono głośność na **${volume}%**`);
        } catch (err) {
            console.log(err);
            return Embed(interaction, 'Red', '❌ | Coś poszło nie tak...');
        }
    }
}