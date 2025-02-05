const { EmbedBuilder, time } = require('discord.js');
const request = require('request');
const { apikey_whoisfreaks } = require('../config.json');

module.exports = async (targetdomain,interaction) => {
    const apiUrl = `https://api.whoisfreaks.com/v2.0/dns/live?apiKey=${apikey_whoisfreaks}&domainName=${targetdomain}&type=all`;
    const response = await fetch(apiUrl); // 等待 API 回應
    const data = await response.json(); // 解析 JSON

    // IPV4 data collect
    const ipv4Records = data.dnsRecords
    .filter(record => record.dnsType === "A")
    .map(record => record.address)
    .join('\n') || 'N/A'; // 如果沒有結果，回傳 'N/A'
    // IPV6 data collect
    const ipv6Records = data.dnsRecords
    .filter(record => record.dnsType === "AAAA")
    .map(record => record.address)
    .join('\n') || 'N/A'; // 如果沒有結果，回傳 'N/A'

    const embed = new EmbedBuilder()
    .setColor(0xFFFFFF)
    .setTitle('**:mag: FORWARD DNS**')
    .addFields(
      { 
          name: '**A RECORD**',
          value: `\`${ipv4Records || 'N/A'}\``,
          inline: true 
      },
      { 
        name: '**AAAA RECORD**',
        value: `\`${ipv6Records || 'N/A'}\``,
        inline: true
      },
  )
    .setTimestamp();
    await interaction.editReply({
        embeds: [embed],
    });
}