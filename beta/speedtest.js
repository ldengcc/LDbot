const { SlashCommandBuilder } = require('@discordjs/builders');
const { NetworkSpeedTest } = require('../tools/sp2'); // 確保路徑正確

module.exports = {
    data: new SlashCommandBuilder()
        .setName('speedtest')
        .setDescription('測試網路連線速度')
        .addStringOption(option => 
            option.setName('server')
                .setDescription('輸入測試的伺服器IP')
                .setRequired(true)
        ),

    async execute(interaction) {
        // 立即回覆用戶正在處理
        await interaction.deferReply();

        try {
            // 從指令選項獲取伺服器IP
            const serverIP = interaction.options.getString('server');

            // 執行速度測試
            const speed = await NetworkSpeedTest.speedTest(serverIP);

            // 編輯原始回覆
            await interaction.editReply(`測試結果: ${speed} Mbits/sec`);

        } catch (error) {
            console.error('Speed test error:', error);
            await interaction.editReply(`測試失敗: ${error.message}`);
        }
    }
};