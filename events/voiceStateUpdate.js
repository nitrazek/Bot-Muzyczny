const { Client, VoiceState } = require('discord.js');
const ID = require('../config/id.json');
const { isVoiceChannelEmpty } = require('distube');
const { channelEmbed } = require('../handlers/embed');

module.exports = {
    name: 'voiceStateUpdate',
    /**
     * @param {Client} client
     * @param {VoiceState} oldState
     * @param {VoiceState} newState
     */
    async run(client, oldState, newState) {
        if (!oldState?.channel) return;
        const voice = client.DisTube.voices.get(oldState);
        if (voice && isVoiceChannelEmpty(oldState)) {
            channelEmbed(
                oldState.channel,
                'Purple',
                'Kanał głosowy jest pusty, opuszczam go... 👋'
            )
            voice.leave();
        }
    }
}