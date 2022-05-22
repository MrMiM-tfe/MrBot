const attackTo = require("../lib/attack")
const PVP = require("../lib/pvp")
const GoTo = require("../lib/goto")
const fallowPlayer = require("../lib/fallow-player")
const lookAtNearPlayers = require("../lib/look-at-near-players")
const logchat = require("../lib/log-chat")
const LiveViewer = require("../lib/live-viewer")
const lookAt = require("../lib/look-at")
const equipSword = require("../lib/equip-sword")

module.exports = function handle(bot) {
    // :attack command
    bot.dashboard.commands['attack'] = (action, type, ename, lookAt) => {
        lookAt = false
        if (lookAt == "on") {
            lookAt = true
        }
        attackTo(action, type, ename, lookAt, bot)
    }

    // lookat command
    bot.dashboard.commands['lookat'] = (type, ename) => {
        lookAt(type, ename, bot)
    }
    
    // sword command
    bot.dashboard.commands['sword'] = () => {
        equipSword(bot)
    }

    // :pvp command
    bot.dashboard.commands['pvp'] = (action, name) => {
        PVP(action, name, bot)
    }

    // :goto command
    bot.dashboard.commands['goto'] = (x, y, z) => {
        GoTo(x, y, z, bot)
    }

    // :fplayer (name) command => fallowPlayer
    bot.dashboard.commands['fplayer'] = (name) => {
        fallowPlayer(name, bot)
    }

    // :lookplayer (name) command
    bot.dashboard.commands['lookplayer'] = (name) => {
        lookAtNearPlayers(name, bot)
    }

    // :logchat (on/off) command
    bot.dashboard.commands['logchat'] = (chat) => {
        if (chat == "off") {
            logchat(false, bot)
        } else {
            logchat(true, bot)
        }
    }

    // :LiveWiewer (start/stop) commend
    bot.dashboard.commands['LiveViewer'] = (action) => {
        LiveViewer(action, bot)
    }
}