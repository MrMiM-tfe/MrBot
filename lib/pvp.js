module.exports = function pvp (action, name, bot) {
    if (action === 's') {
        const sword = bot.inventory.items().find(item => item.name.includes("sword"));
        if (sword) bot.equip(sword, "hand")
        const player = bot.players[name]

        if (!player) {
            // bot.chat("I can't see you.")
            if (config.log) {
                bot.dashboard.log("I cant see Her")
            }
            return
        }

        bot.pvp.attack(player.entity)
    }

    if (action === 'p') {
        bot.pvp.stop()
    }
};