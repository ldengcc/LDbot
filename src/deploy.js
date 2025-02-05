const { REST, Routes } = require('discord.js');
const { botID,token } = require('../config.json');
const commands = [
  {
    name: 'ping',
    description: 'Bot Ping Test',
  },
  // {
  //   name: 'speedtest',
  //   description: 'IPerf3 Client Test',
  //   options: [
  //     {
  //       type: 3, // STRING type
  //       name: 'target',
  //       description: 'Target Domain or IP',
  //       required: true
  //     }
  //   ]
  // },
  {
    name: 'ip2location',
    description: 'IP Address Location Lookup',
    options: [
      {
        type: 3, // STRING type
        name: 'target',
        description: 'Target IP',
        required: true
      }
    ]
  },
  {
    name: 'whois',
    description: 'Domain INFO Lookup',
    options: [
      {
        type: 3, // STRING type
        name: 'target',
        description: 'Target Doamin',
        required: true
      }
    ]
  },
  {
    name: 'dns-lookup',
    description: 'DNS Lookup Tool',
    options: [
      {
        type: 3, // STRING (選擇查詢類型)
        name: 'type',
        description: 'Resolve Type',
        required: true,
        choices: [
          {
            name: 'Forward',
            value: 'forward'
          },
          {
            name: 'Reverse',
            value: 'reverse'
          }
        ]
      },
      {
        type: 3, // STRING (輸入目標)
        name: 'target',
        description: 'Target Domain Name or IP',
        required: true
      }
    ]
  }
  
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(botID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();