const color = require("../lib/colors")

var creset = color.reset

module.exports = function LogChat(chat, bot) {
    bot.on('chat', (username, message) => {
        if (bot.config.utils['chat-log'] && chat) {
            let look = true;
            bot.config.utils["ignore-chats"].forEach(element => {
                if (message.includes(element)) {
                    look = false
                };
            });
    
            if (look) {
                if (bot.config.log) {
                    bot.dashboard.log(color.bg.blue + `[ChatLog]` + creset + " " + color.fg.yellow + `<${username}>` + creset + color.fg.blue + ` ${message}` + creset);
                }
            }
        }
    });
}