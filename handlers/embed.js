const { EmbedBuilder, CommandInteraction } = require('discord.js');

module.exports = {
    /**
     * @param {CommandInteraction} interaction 
     * @param {String} description 
     * @param {String} color 
     */
    Embed(interaction, color, description) {
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(color)
                    .setDescription(description)
            ]
        })
    }
}