import Discord from 'discord.js';

class delete_message_log{
    delete_message_log_function = (messageDelete) => {
        const guild = messageDelete.guild
        const DeleteEmbed = new Discord.MessageEmbed()
        .setTitle("DELETED MESSAGE")
        .setColor("#fc3c3c")
        .setAuthor(messageDelete.author.username, messageDelete.author.avatarURL())
        .setDescription(`訊息在頻道: <#${messageDelete.channel.id}> 被刪除`)
        .addField("內容",messageDelete.content)
        .setFooter(`Message ID: ${messageDelete.id} | Author ID: ${messageDelete.author.id}`)
        .setTimestamp();
      
        const displayChannel = guild.channels.cache.find(channel => channel.name === "刪除紀錄");
        displayChannel.send(DeleteEmbed);
        console.log(`${messageDelete.author.username} 在頻道: ${messageDelete.channel.name} 刪除訊息!`)
    }
}

export default new delete_message_log();