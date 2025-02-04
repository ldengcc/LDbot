const { exec } = require('child_process');

class NetworkSpeedTest {
    static downloadtest(serverIP) {
        return new Promise((resolve, reject) => {
            const command = `iperf3 -c ${serverIP} -R` ;

            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                    return;
                }

                // 提取最後一行的速度
                const lines = stdout.split('\n');
                const speedLine = lines.reverse().find(line => line.includes('Mbits/sec'));

                if (!speedLine) {
                    reject(new Error('無法找到速度'));
                    return;
                }

                // 解析速度值
                const speedMatch = speedLine.match(/(\d+\.?\d*)\s*Mbits\/sec/);
                if (!speedMatch) {
                    reject(new Error('無法解析速度'));
                    return;
                }

                const downloadspeed = parseFloat(speedMatch[1]);
                
                // console.log(`下載速度: ${downloadspeed} Mbits/sec`);
                resolve(downloadspeed);
            });
        });
    }
    static uploadtest(serverIP) {
        return new Promise((resolve, reject) => {
            const command = `iperf3 -c ${serverIP}`;

            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                    return;
                }

                // 提取最後一行的速度
                const lines = stdout.split('\n');
                const speedLine = lines.reverse().find(line => line.includes('Mbits/sec'));

                if (!speedLine) {
                    reject(new Error('無法找到速度'));
                    return;
                }

                // 解析速度值
                const speedMatch = speedLine.match(/(\d+\.?\d*)\s*Mbits\/sec/);
                if (!speedMatch) {
                    reject(new Error('無法解析速度'));
                    return;
                }

                const uploadspeed = parseFloat(speedMatch[1]);
                
                // console.log(`上傳速度: ${uploadspeed} Mbits/sec`);
                resolve(uploadspeed);
            });
        });
    }
}

module.exports = NetworkSpeedTest;