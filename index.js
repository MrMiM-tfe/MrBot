// require libraries
const CMDhandle = require("./src/dashboard-cmd-handler")
const mineflayer = require('mineflayer')
const pvp = require('mineflayer-pvp').plugin
var navigatePlugin = require('mineflayer-navigate')(mineflayer)
const {
    pathfinder
} = require('mineflayer-pathfinder')
const autoeat = require("mineflayer-auto-eat")
const config = require('./settings.json')
const logchat = require('./lib/log-chat')
const color = require("./lib/colors")


var creset = color.reset

function createBot() {
    // createBot
    const bot = mineflayer.createBot({
        username: config['bot-account']['username'],
        password: config['bot-account']['password'],
        auth: config['bot-account']['type'],
        host: config.server.ip,
        port: config.server.port,
        version: config.server.version,
    })

    // print Infos
    function setInfo(info) {
        if (config.log) {
            bot.dashboard.log(color.bg.green + "[INFO]" + creset + " " + color.fg.green + info + creset)
        }
    }

    // put config file into bot
    bot.config = config

    // load Plugins
    bot.loadPlugin(require('mineflayer-dashboard')({
        chatPattern: /^» \w+? » /
    }))
    bot.loadPlugin(pathfinder)
    bot.loadPlugin(autoeat)
    bot.loadPlugin(pvp)
    navigatePlugin(bot)


    global.console.log = bot.dashboard.log
    global.console.error = bot.dashboard.log

    bot.navigate.blocksToAvoid[132] = true // avoid tripwire
    bot.navigate.blocksToAvoid[59] = false

    // After spawn
    bot.once('spawn', () => {
        if (config.log) {
            bot.dashboard.log('\x1b[33m[BotLog] Bot joined to the server', '\x1b[0m')
        }

        // run log chat function
        logchat(true, bot)

        // Register or Login to Server
        if (config.utils['auto-auth'].enabled) {
            setInfo("Started auto-auth module")

            var password = config.utils['auto-auth'].password
            setTimeout(() => {
                bot.chat(`/register ${password} ${password}`)
            }, 1000)

            setTimeout(() => {
                bot.chat(`/login ${password}`)
            }, 1000)

            setInfo("Authentification commands executed.")
        }

        // Auto eate settings
        bot.autoEat.options.priority = "foodPoints"
        bot.autoEat.options.bannedFood = []
        bot.autoEat.options.eatingTimeout = 5

        // Eating Console info
        bot.on("autoeat_started", () => {
            setInfo("Auto Eat started")
        })
        bot.on("autoeat_stopped", () => {
            setInfo("Auto Eat stopped")
        })

        // Stop/Start Eating 
        bot.on("health", () => {
            if (config.log) {
                bot.dashboard.log('health')
            }
            if (bot.food === 20) bot.autoEat.disable()
            // Disable the plugin if the bot is at 20 food points
            else bot.autoEat.enable() // Else enable the plugin again
        })

        // Auto server Selector
        if (config.utils['auto-server-selcet'].enabled) {
            bot.on('chat', (username, message) => {
                if (username === "Security" && message === "Logined Successfully") {
                    bot.chat("/" + config.utils['auto-server-selcet']['serever-name'])
                    setInfo("Auto Server Selected")
                }
            })
        }

        // got to Selected position by settings.json
        if (config.position.enabled) {
            bot.on("spawn", () => {
                const pos = config.position
                const goto = require("./lib/goto")
                goto(pos.x, pos.y, pos.z, bot)
            })
        }

        // Run User Commands in /msg chat
        if (config.utils.chatCommand) {
            bot.on('chat', (username, message) => {
                if (message.includes("me] CMD") && config.utils["prem-acc"].includes(username)) {
                    let cmd = message.replace('me] CMD ', '')
                    if (cmd.substr(cmd.length - 1) == '.') {
                        cmd = cmd.slice(0, -1)
                    }
                    if (config.log) {
                        bot.dashboard.log(color.bg.green + "Runed Commend:" + creset + " " + cmd)
                    }
                    bot.chat(cmd)
                }
            })
        }

        if (config.utils['anti-afk'].enabled) {
            bot.setControlState('jump', true);
            if (config.utils['anti-afk'].sneak) {
                bot.setControlState('sneak', true);
            }
        }

    }) // end of (once spawn)

    // bot on death
    bot.on('death', () => {
        setInfo(`Bot has been died and was respawned ${bot.entity.position}`);
    });

    // auto reconnect
    if (config.utils['auto-reconnect']) {
        bot.on('end', () => {
            setTimeout(() => {
                createBot();
            }, config.utils['auto-recconect-delay']);
        });
    }

    // bot on kicked
    bot.on('kicked', (reason) =>
        setInfo(`Bot was kicked from the server. Reason: \n${reason}`)
    );

    // handle dashboard commands 
    CMDhandle(bot)

    return bot
}
createBot()