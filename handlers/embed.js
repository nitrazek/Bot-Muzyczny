const { EmbedBuilder, CommandInteraction, TextBasedChannel } = require('discord.js');

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
    },
    /**
     * @param {TextBasedChannel} channel 
     * @param {String} description 
     * @param {String} color 
     */
    channelEmbed(channel, color, description) {
        channel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor(color)
                    .setDescription(description)
            ]
        })
    }
}