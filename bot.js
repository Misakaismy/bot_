// var Discord = require('discord.io');
import logger from 'winston';
import {token} from './auth.js';
import Discord from 'discord.js';
// import { Console } from 'winston/lib/winston/transports';
// function
import default_function from './bot_function/default_function.js';
import delete_message_log from './bot_function/delete_message_log.js';
import update_message_log from './bot_function/update_message_log.js';
import response from './bot_function/bot_response.js';
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = "debug";
const bot = new Discord.Client;
// Initialize Discord Bot
// var bot = new Discord.Client({
//    token: auth.token,
//    autorun: true
// });
bot.on("ready", function (evt) {
    logger.info("Connected");
    logger.info("Logged in as: ");
    logger.info(bot.username + " - (" + bot.id + ")");
    console.log('Bot is ready!')
});

bot.on("message", (message) => {
    var content = message.content
    if (content.substring(0, 1) == '!') {
        var args = content.substring(1).split(' ');
        var cmd = args[0];
        var channel = args[1];
        default_function.bot_dice(cmd,message);
        default_function.set_channel(cmd,channel,message)
    }

    // else if ((content.indexOf(`${bot.user.id}`)!==0)) {
    //     if (!(message.author.bot))
    //         response.bot_response(message);
    // }
});

bot.on("messageDelete", (messageDelete) => {
    delete_message_log.delete_message_log_function(messageDelete);
});

bot.on('messageUpdate', (oldMessage, newMessage) => {
    if (!(newMessage.author.bot) & (!(newMessage.webhookID)))
        update_message_log.update_message_log_function(oldMessage, newMessage);
});

bot.login(token);