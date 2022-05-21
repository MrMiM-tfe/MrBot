module.exports = function lookAt(type, etype, bot) {
    var mobFilter = entity => entity.type === "mob";
    if (type) {
        mobFilter = entity => entity.type === type;
        if (etype) {
            mobFilter = entity => entity.type === type && entity.entity.type === etype;
        }
    }
    const mob = bot.nearestEntity(mobFilter)

    if (!mob) return;

    const pos = mob.position;

    bot.lookAt(pos, true);

}