module.exports = function equipSword(bot) {
    const sword = bot.inventory.items().find(item => item.name.includes("sword"));
    if (sword) bot.equip(sword, "hand")
}