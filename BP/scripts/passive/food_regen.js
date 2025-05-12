import { world, system } from "@minecraft/server"

world.afterEvents.itemCompleteUse.subscribe((fr) => {
    const item = fr.itemStack
    const source = fr.source
    const sourceHealth = source.getComponent("health").currentValue
    const itemDuration = fr.useDuration

    if (item?.hasTag("minecraft:is_food") && sourceHealth < source.getComponent("health").effectiveMax) {
        source.getComponent("health").setCurrentValue(sourceHealth + 6)
        source.addEffect("hunger", 20, {
            amplifier: 255,
            showParticles: false
        })
    }
})