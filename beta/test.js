// const NetworkSpeedTest = require('./sp2');

// async function runTest() {
//     // try {
//     //     const speed = await NetworkSpeedTest.speedTest('104.199.192.61');
//     //     console.log(`測試結果: ${speed} Mbits/sec`);
//     // } catch (error) {
//     //     console.error('測試出錯:', error);
//     // }
//     try {
//         const serverIP = 'tw.ldeng.cc';
//         // 執行速度測試
//         const downspeed = await NetworkSpeedTest.downloadtest(serverIP);
//         const upspeed = await NetworkSpeedTest.uploadtest(serverIP);
//         // 編輯原始回覆
//         // console.log(`測試結果: ${downspeed} Mbits/sec`);
//         // console.log(`測試結果: ${upspeed} Mbits/sec`);
//       } catch (error) {
//         console.error('Speed test error:', error);
//       }
// }

// runTest();
const { Client, GatewayIntentBits } = require('discord.js');
const request = require('request');
const apiUrl = `https://api.ipregistry.co/192.192.135.249?key=ira_CCESZRqwPhBK7woh7RhkER2FpW0kMJ48fTiX`;

    const response =  fetch(apiUrl); // 等待 API 回應
    const data = response.json(); // 解析 JSON
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log(JSON.parse(body));
    console.log(ip);
