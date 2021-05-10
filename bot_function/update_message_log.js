import Discord from 'discord.js';

class update_message_log{
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
      
        const displayChannel = guild.channels.cache.find(channel => channel.name === "刪除紀錄");
        displayChannel.send(UpdateEmbed);
        console.log(`${newMessage.author.username} 在頻道: ${newMessage.channel.name} 修改訊息!`)
    }
}

export default new update_message_log();