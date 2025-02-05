const { EmbedBuilder, time } = require('discord.js');
const request = require('request');
const { apikey_ipregistry } = require('../config.json');

module.exports = async (targetIP,interaction) => {
  const apiUrl = `https://api.ipregistry.co/${targetIP}?key=${apikey_ipregistry}`;
  const response = await fetch(apiUrl); // 等待 API 回應
  const data = await response.json(); // 解析 JSON
  //國家資訊
  const countrycode = data.location.country.code.toLowerCase();
  const country = data.location.country.name;
  const city = data.location.country.capital;
  //IP資訊
  const ip = data.ip;
  //地理資訊
  const latitude = data.location.latitude;
  const longitude = data.location.longitude;
  const timezone = data.time_zone.id;
  //組織資訊
  const org = data.connection.organization;
  const domain = data.connection.domain;
  const asn = data.connection.asn;
  //Embed設定
  const embed = new EmbedBuilder()
  .setColor(0xED4245)
  .setTitle('**:mag: IP2Location**')
  .addFields(
    { 
        name: '**COUNTRY**',
        value: `:flag_${countrycode}: \`${country}\``,
        inline: true 
    },
    { 
      name: '**CITY**',
      value: `\`${city || 'N/A'}\``,
      inline: true
    },
    { 
      name: '**TIME ZONE**',
      value: `\`${timezone || 'N/A'}\``,
      inline: true
    },
    { 
      name: '**TARGET IP**',
      value: `\`${ip || 'N/A'}\``,
      inline: true
    },
    { 
        name: '**LATITUDE**',
        value: `\`${latitude || 'N/A'}\``,
        inline: true
    },
    { 
        name: '**LOGITUDE**',
        value: `\`${longitude || 'N/A'}\``,
        inline: true
    },
    { 
      name: '**ORGANIZATION**',
      value: `\`${org || 'N/A'}\``,
      inline: true

    },
    { 
      name: '**DOMAIN**',
      value: `\`${domain || 'N/A'}\``,
      inline: true
    },
    { 
      name: '**ASN**',
      value: `\`${asn || 'N/A'}\``,
      inline: true
    }
)
  .setTimestamp();
await interaction.editReply({
  embeds: [embed],
});
}
