var attackId;

// getRandomArbitrary
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = function attackTo(action, type, ename, lookAt, bot) {
    if (action == "start") {
        clearInterval(attackId);
        var delay = getRandomArbitrary(1000, 2000)
        attackId = setInterval(() => {
            delay = getRandomArbitrary(1000, 2000)
            var mobFilter = entity => entity.type === "mob";
            if (type) {
                mobFilter = entity => entity.type === type;
                if (etype) {
                    mobFilter = entity => entity.type === type && entity.name === ename;
                }
            }
            const mob = bot.nearestEntity(mobFilter)

            if (!mob) return;

            const pos = mob.position;

            doOrNot = getRandomArbitrary(0, 4).toFixed(0).toString();
            
            if (doOrNot == "1") {
                setTimeout(() => {
                    bot.setControlState('sneak', true);
                }, 300);
                bot.clearControlStates()
            }
            bot.clearControlStates()

            if (lookAt) {
                bot.lookAt(pos, true);
            }
            if (mob) {
                bot.attack(mob)
            }
            // bot.attack(mob);
        }, delay);
    }
    if (action == "stop") {
        clearInterval(attackId);
    }
}