const {
    GoalBlock
} = require('mineflayer-pathfinder').goals;

module.exports = function Goto(x, y, z, bot) {
    const mcData = require('minecraft-data')(bot.version);
    const defaultMove = new Movements(bot, mcData);
    bot.pathfinder.setMovements(defaultMove);
    bot.pathfinder.setGoal(new GoalBlock(x, y, z));
}