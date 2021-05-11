import Discord from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class default_function{
    bot_dice = (cmd,message) => {
    //主要修改的部分
        var ran = Math.floor(Math.random()*100)+1;//亂數產生1~100
        switch(cmd) {
            case 'dice'://若輸入!dice時執行
                message.channel.send(message.author.username + ' 骰出了 ' + ran + ' 點！')//機器人回覆這一行字);
                console.log(`${message.author.username} 使用了 Dice 指令!`)
            break;
        }
    }

    set_channel = (cmd,channel,message) => {
        switch(cmd) {
            case 'set_channel'://若輸入!dice時執行
                fs.readFile(path.resolve(__dirname,'../data/log_channel.json'),(err,callback)=>{
                    if (err){
                        return console.log(err);
                    }
                    const log_channel = JSON.parse(callback);
                    let message_log = "";
                    let YN = 0;
                    for (let i = 0;i<log_channel.length;i++){
                        if (log_channel[i].guild === message.guild.id){
                            log_channel[i].channel = channel;
                            YN = 1;
                            message_log = "Update log_channel...";
                            break; 
                        }
                    }

                    if (YN === 0){
                        const query = {"guild":message.guild.id,"channel":channel};
                        log_channel.push(query)
                        message_log = "Add new log_channel...";
                    }
                    
                    let str = JSON.stringify(log_channel);

                    fs.writeFile(path.resolve(__dirname,'../data/log_channel.json'), str, function (err) {
                        if (err) {
                            console.error(err);
                        }
                        console.log(message_log)
                    })

                })
            break;
            case 'reset_channel':
                fs.readFile(path.resolve(__dirname,'../data/log_channel.json'),(err,callback)=>{
                    if (err){
                        return console.log(err);
                    }
                    const query = [{"guild":0,"channel":0}];

                    let str = JSON.stringify(query);

                    fs.writeFile(path.resolve(__dirname,'../data/log_channel.json'), str, function (err) {
                        if (err) {
                            console.error(err);
                        }
                        console.log(`頻道設定 已重設`)
                    })
                    
            })
        }
    }
}


export default new default_function();