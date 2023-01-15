const { Client, CommandInteraction, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'dodaj',
    description: 'Dodaj muzyke do kolejki',
    options: [
        {
            name: 'Link',
            description: "Link do muzyki (youtube/spotify)",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async run(client, interaction) {
        interaction.reply("OK");
    }
}