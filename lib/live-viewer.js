const inventoryViewer = require('mineflayer-web-inventory')
const {
    mineflayer: mineflayerViewer
} = require('prismarine-viewer')
const {
    Movements,
} = require('mineflayer-pathfinder')
const {
    GoalBlock
} = require('mineflayer-pathfinder').goals

module.exports = function LiveViewer(action, bot) {
    if (action == "start") {
        inventoryViewer(bot);
        mineflayerViewer(bot, {
            port: 3007,
        });
        bot.on('path_update', (r) => {
            const nodesPerTick = (r.visitedNodes * 50 / r.time).toFixed(2)
            if (bot.config.log) {
                bot.dashboard.log(`I can get there in ${r.path.length} moves. Computation took ${r.time.toFixed(2)} ms (${nodesPerTick} nodes/tick). ${r.status}`)
            }
            const path = [bot.entity.position.offset(0, 0.5, 0)]
            for (const node of r.path) {
                path.push({
                    x: node.x,
                    y: node.y + 0.5,
                    z: node.z
                })
            }
            bot.viewer.drawLine('path', path, 0xff00ff)

        })
        const mcData = require('minecraft-data')(bot.version)
        const defaultMove = new Movements(bot, mcData)
        bot.viewer.on('blockClicked', (block, face, button) => {
            if (button !== 2) return // only right click

            const p = block.position.offset(0, 1, 0)

            bot.pathfinder.setMovements(defaultMove)
            bot.pathfinder.setGoal(new GoalBlock(p.x, p.y, p.z))
        })
    }
    if (action == "stop") {
        bot.viewer.close()
    }
}