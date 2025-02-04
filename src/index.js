const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const { token } = require('../config.json')

// Features area
const pingcommands = require('../tools/ping.js')
const NetworkSpeedTest = require('../tools/sp2.js');
const IPLocationTest = require('../tools/ip2location.js');
const whoisTest = require('../tools/whois.js');
const dnsforward = require('../tools/dns-forward.js');
const dnsreverse = require('../tools/dns-reverse.js');

// client setting area
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
  client.user.setActivity({
    name: 'www.ldeng.cc',
    type: ActivityType.Watching,
    // url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  })
});

// Slash features area
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await pingcommands(interaction);
  }
  if (interaction.commandName === 'speedtest') {
    await interaction.deferReply();
    try {
      const serverIP = interaction.options.getString('target'); // 從指令選項獲取伺服器IP
      const downspeed = await NetworkSpeedTest.downloadtest(serverIP); // 執行速度測試
      const upspeed = await NetworkSpeedTest.uploadtest(serverIP);
      // await interaction.editReply(`下載速度: ${downspeed} Mbits/sec\n上傳速度: ${upspeed} Mbits/sec`);
      const embed = new EmbedBuilder()

          .setColor(0xFFFF00)
          .setTitle('**:zap: Speedtest**')
          .addFields(
            { 
              name: '**:arrow_down: DOWNLOAD**',
              value: `\`${downspeed} Mbits/sec\``,
              inline: true 
            },
            { 
              name: '**:arrow_up: UPLOAD**',
              value: `\`${upspeed} Mbits/sec\``,
              inline: true 
            }
          )
          .setTimestamp();
        await interaction.editReply({
        embeds: [embed],
      });
    } catch (error) {
      console.error('Speed test error:', error);
      await interaction.editReply(`測試失敗: ${error.message}`);
    }
  }
  if (interaction.commandName === 'ip2location') {
    await interaction.deferReply();
    const targetIP = interaction.options.getString('target');
    await IPLocationTest(targetIP,interaction);
  }
  if (interaction.commandName === 'whois') {
    await interaction.deferReply();
    const targetdomain = interaction.options.getString('target');
    await whoisTest(targetdomain,interaction);
  }
  if (interaction.commandName === 'dns-lookup') {
    const queryType = interaction.options.getString('type'); // 取得 "resolve" 或 "reverse"
    if (queryType === 'forward') {
      await interaction.deferReply();
      const targetdomain = interaction.options.getString('target');
      await dnsforward(targetdomain,interaction);
    }
    if (queryType === 'reverse') {
      await interaction.deferReply();
      const targetIP = interaction.options.getString('target');
      await dnsreverse(targetIP,interaction);
    }
  }

});

client.login(token);