import Discord from 'discord.js';

const whitelist = ['閉嘴!','噁心!','去死!','別靠近我!!!!','再我婆 我婆叫\n把你們全部逆后宮'];

class response{
    bot_response = (message)=>{
        const content = whitelist[Math.floor(Math.random() * whitelist.length)];
        message.channel.send(content);
        console.log(`${message.author.username} 在頻道: ${message.channel.name} Tag了BOT!`)
    }
}

export default new response();