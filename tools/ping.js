const { EmbedBuilder } = require('discord.js');
module.exports = async (interaction) => {
    const startTime = Date.now();
    await new Promise(resolve => setTimeout(resolve, 5));
    const latency = Date.now() - startTime;
    const apiPing = interaction.client.ws.ping;
    const apiPingDisplay = apiPing === -1 ? "無法取得數據" : `${apiPing} ms`;

    const embed = new EmbedBuilder()
        
        .setColor(0x57F287)  // Discord dark theme color
        .setTitle('延遲狀態 - Latency Status')
        .addFields(
            { 
                name: '機器人延遲',
                value: `\`${latency} ms\``,
                inline: true 
            },
            { 
                name: 'API 延遲',
                value: `\`${apiPingDisplay}\``,
                inline: true 
            }
        )
        .setTimestamp();

    await interaction.reply({
        embeds: [embed],
        ephemeral: true
    });
};
