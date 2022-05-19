const {
    Movements
} = require('mineflayer-pathfinder');

module.exports = function fallowPlayer(name, bot) {

    const playerCI = bot.players[name];

    if (playerCI) {
        const mcData = require("minecraft-data")(bot.version)
        const movements = new Movements(bot, mcData)
        movements.allow1by1towers = false;
        bot.pathfinder.setMovements(movements)
        try {
            const goal = new GoalFollow(playerCI.entity, 2)
            bot.pathfinder.thinkTimeout = 30000;
            bot.pathfinder.setGoal(goal, true);
        } catch (error) {
            if (bot.config.log) {
                bot.dashboard.log("Player is to Far");
            }
        }
    }


}