const { EmbedBuilder, time } = require('discord.js');
const request = require('request');
const { apikey_ip2whois } = require('../config.json');

module.exports = async (targetdomain,interaction) => {
    const apiUrl = `https://api.ip2whois.com/v2?key=${apikey_ip2whois}&domain=${targetdomain}`;
    const response = await fetch(apiUrl); // 等待 API 回應
    const data = await response.json(); // 解析 JSON

    //註冊資訊
    const domain = data.domain;
    const create_date = data.create_date;
    const expire_date  = data.expire_date;
    const domain_age = data.domain_age;
    const register = data.registrar.name;

    const embed = new EmbedBuilder()
    .setColor(0xAD1457)
    .setTitle('**:mag: WHOIS**')
    .addFields(
      { 
          name: '**DOMAIN**',
          value: `\`${domain}\``,
          inline: true 
      },
      { 
        name: '**DOMAIN AGE**',
        value: `\`${domain_age || 'N/A'}\``,
        inline: true

      },
      { 
        name: '**REGISTER**',
        value: `\`${register || 'N/A'}\``,
        inline: true
      },
      { 
        name: '**CREATE DATE**',
        value: `\`${create_date || 'N/A'}\``,
        inline: true
      },
      { 
        name: '**EXPIRE DATE**',
        value: `\`${expire_date || 'N/A'}\``,
        inline: true
      }
  )
    .setTimestamp();
    await interaction.editReply({
        embeds: [embed],
    });
}