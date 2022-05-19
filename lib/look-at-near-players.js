
module.exports = function lookAtNearPlayers(name, bot) {
    bot.on("physicTick", () => {
        const playerFilter = (entity) => entity.type === 'player';
        if (name) {
            playerFilter = (entity) => entity.type === 'player' && entity.name === name;
        }
        const playerEntity = bot.nearestEntity(playerFilter);

        if (!playerEntity) return
        const pos = playerEntity.position.offset(0, playerEntity.height, 0)
        bot.lookAt(pos)
    })
}