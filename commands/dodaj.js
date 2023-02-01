const { Client, CommandInteraction, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');
const { Embed } = require('../handlers/embed');

module.exports = {
    name: 'dodaj',
    description: 'Dodaj muzykę do kolejki',
    options: [
        {
            name: 'kolejka',
            description: 'Podaj muzykę do kolejki',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async run(client, interaction) {
        try {
            if (!interaction.member.voice.channel.permissionsFor(client.user).has([PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.Speak]))
                return Embed(interaction, 'Red', '❌ | Nie mam wystarczających uprawnień do kanału');
            client.DisTube.play(interaction.member.voice.channel, interaction.options.getString('kolejka'), {
                textChannel: interaction.channel, member: interaction.member
            });
            return Embed(interaction, 'Blue', '🎵 | Dodano muzykę do kolejki');
        } catch (err) {
            console.log(err);
            return Embed(interaction, 'Red', '❌ | Coś poszło nie tak...');
        }
    }
}