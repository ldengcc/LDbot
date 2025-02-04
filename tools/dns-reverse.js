const { EmbedBuilder, time } = require('discord.js');
const request = require('request');
const { apikey_whoisfreaks } = require('../config.json');

module.exports = async (targetIP,interaction) => {
    const apiUrl = `https://api.whoisfreaks.com/v2.0/dns/live?apiKey=${apikey_whoisfreaks}&ipAddress=${targetIP}&type=all`;
    const response = await fetch(apiUrl); // 等待 API 回應
    const data = await response.json(); // 解析 JSON

    //註冊資訊
    const records = data.dnsRecords[0];
    const name = records.name;
    const type = records.dnsType;
    const queryTime  = data.queryTime;
    const ip = data.ipAddress;
    const singleName = records.singleName;

    const embed = new EmbedBuilder()
    .setColor(0x95A5A6)
    .setTitle('**:mag: REVERSE DNS**')
    .addFields(
      { 
          name: '**QUERY TIME**',
          value: `\`${queryTime}\``,
          inline: true 
      },
      { 
        name: '**IP ADDRESS**',
        value: `\`${ip || 'N/A'}\``,
        inline: true

      },
      { 
        name: '**TYPE**',
        value: `\`${type || 'N/A'}\``,
        inline: true
      },
      { 
        name: '**SINGLE NAME**',
        value: `\`${singleName || 'N/A'}\``,
        inline: true
      },
      { 
        name: '**NAME**',
        value: `\`${name || 'N/A'}\``,
        inline: true
      }
  )
    .setTimestamp();
    await interaction.editReply({
        embeds: [embed],
    });
}