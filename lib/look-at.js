module.exports = function lookAt(type, ename, bot) {
    var mobFilter = entity => entity.type === "mob";
    if (type) {
        mobFilter = entity => entity.type === type;
        if (ename) {
            mobFilter = entity => entity.type === type && entity.name === ename;
        }
    }
    const mob = bot.nearestEntity(mobFilter)

    if (!mob) return;

    const pos = mob.position;

    bot.lookAt(pos, true);

}