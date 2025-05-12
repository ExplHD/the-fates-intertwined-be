import { system, world, ItemStack } from "@minecraft/server"

// Stars Boss Health Links

world.afterEvents.entityDie.subscribe(({ deadEntity }) => {
    if (deadEntity?.typeId === "fec:crescent_mage") {
        world.getDimension('overworld').runCommand('kill @e[type=fec:star_warrior]')
        world.getDimension('overworld').runCommand('music stop 3')
    }
    if (deadEntity?.typeId === "fec:star_warrior") {
        world.getDimension('overworld').runCommand('kill @e[type=fec:crescent_mage]')
        world.getDimension('overworld').runCommand('music stop 3')
    }
})