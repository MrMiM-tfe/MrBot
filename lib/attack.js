var attackId;
module.exports = function attackTo(action, type, etype, lookAt, bot) {
    if (action == "start") {
        clearInterval(attackId);
        attackId = setInterval(() => {
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
            if (lookAt) {
                bot.lookAt(pos, true);
            }
            if (mob) {
                bot.attack(mob)
            }
            // bot.attack(mob);
        }, 2000);
    }
    if (action == "stop") {
        clearInterval(attackId);
    }
}