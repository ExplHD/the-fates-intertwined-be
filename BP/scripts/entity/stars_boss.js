import { system, world, ItemStack } from "@minecraft/server"

// Stars Boss Health Links

world.afterEvents.entityDie.subscribe(({ deadEntity }) => {
    if (deadEntity?.typeId === "fec:crescent_mage") {
        world.getDimension('overworld').runCommand('kill @e[type=fec:star_warrior]')
        world.getDimension('overworld').runCommand('music stop 3')
        world.getDimension('overworld').runCommand('event entity @e[type=fec:corvus] fec:timeout_clear_and_start_dash')
    }
    if (deadEntity?.typeId === "fec:star_warrior") {
        world.getDimension('overworld').runCommand('kill @e[type=fec:crescent_mage]')
        world.getDimension('overworld').runCommand('music stop 3')
        world.getDimension('overworld').runCommand('event entity @e[type=fec:corvus] fec:timeout_clear_and_start_dash')
    }
})