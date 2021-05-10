import Discord from 'discord.js';

class dice{
    bot_dice = (cmd) => {
    //主要修改的部分
        var ran = Math.floor(Math.random()*100)+1;//亂數產生1~100
        switch(cmd) {
            case 'dice'://若輸入!dice時執行
                message.channel.send(message.author.username + ' 骰出了 ' + ran + ' 點！')//機器人回覆這一行字);
                console.log(`${message.author.username} 使用了 Dice 指令!`)
            break;
        }
    }
}


export default new dice();