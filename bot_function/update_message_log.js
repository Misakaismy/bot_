import Discord, { Message } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class update_message_log{
    find_log_channel = (message) => {
        fs.readFile(path.resolve(__dirname,'../data/log_channel.json'),(err,channel)=>{
            if (err){
                return console.log(err);
            }
            const log_channel = JSON.parse(channel);
            for (let i = 0;i<log_channel.length;i++){
                if (log_channel[i].guild === message.guild.id){
                    return log_channel[i].channel
                }
            }
            return '0';
        })
    }

    update_message_log_function = (oldMessage, newMessage) => {
        const guild = newMessage.guild
        const UpdateEmbed = new Discord.MessageEmbed()
        .setTitle("UPDATED MESSAGE")
        .setColor("#fc3c3c")
        .setAuthor(newMessage.author.username, newMessage.author.avatarURL())
        .setDescription(`訊息在頻道: <#${newMessage.channel.id}> 被修改`)
        .addField("舊內容",oldMessage.content)
        .addField("新內容",newMessage.content)
        .setFooter(`Message ID: ${newMessage.id} | Author ID: ${newMessage.author.id}`)
        .setTimestamp();
        
        if (find_log_channel(newMessage) == '0')
            return
        
        const channel_id = find_channel.find_log_channel(messageDelete);
        parseInt(channel_id);
        const displayChannel = guild.channels.cache.find(channel => channel.id === channel_id);
        displayChannel.send(UpdateEmbed);
        console.log(`${newMessage.author.username} 在頻道: ${newMessage.channel.name} 修改訊息!`)
    }
}

export default new update_message_log();