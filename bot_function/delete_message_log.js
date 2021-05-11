import Discord from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class delete_message_log{
    find_log_channel = (message) => {
        fs.readFile(path.resolve(__dirname,'../data/log_channel.json'),(err,channel)=>{
            if (err){
                return console.log(err);
            }

            const guild_id = message.guild.id;
            String(guild_id);
            const log_channel = JSON.parse(channel);
            for (let i = 0;i<log_channel.length;i++){
                if (log_channel[i].guild === guild_id){
                    return log_channel[i].channel
                }
            }
            return '0';
        })
    }

    delete_message_log_function = (messageDelete) => {
        let find_channel = new delete_message_log;

        const guild = messageDelete.guild
        const DeleteEmbed = new Discord.MessageEmbed()
        .setTitle("DELETED MESSAGE")
        .setColor("#fc3c3c")
        .setAuthor(messageDelete.author.username, messageDelete.author.avatarURL())
        .setDescription(`訊息在頻道: <#${messageDelete.channel.id}> 被刪除`)
        .addField("內容",messageDelete.content)
        .setFooter(`Message ID: ${messageDelete.id} | Author ID: ${messageDelete.author.id}`)
        .setTimestamp();
      
        if (find_channel.find_log_channel(messageDelete) == '0')
            return
        
        const channel_id = find_channel.find_log_channel(messageDelete);
        console.log('id:'+channel_id);
        const displayChannel = guild.channels.cache.find(channel => channel.id === channel_id);
        displayChannel.send(DeleteEmbed);
        console.log(`${messageDelete.author.username} 在頻道: ${messageDelete.channel.name} 刪除訊息!`)
    }
}

export default new delete_message_log();