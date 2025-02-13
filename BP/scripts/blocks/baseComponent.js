import { system, world } from '@minecraft/server'

let spreadableBlocks = ['fec:shadow_corruption', 'grass_block']
let availableBlockList = ['grass_block', 'dirt', 'podzol', 'stone', 'cobblestone']

world.beforeEvents.worldInitialize.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent('fec:spread', {
        onRandomTick(event) {
            let { x, y, z } = event.block.location
            let randomVal = Math.floor(Math.random() * 1)
            if (randomVal == 0) {
                event.dimension.runCommandAsync(`fill ${x - 1} ${y - 1} ${z - 1} ${x + 1} ${y + 1} ${z + 1} ${spreadableBlocks[0]} replace ${availableBlockList[0]}`)
            }
        }
    })

    blockComponentRegistry.registerCustomComponent("fec:magic_poisoning", {
        onStepOn(event) {
            const entity = event.entity
            let { x, y, z } = event.block.location
            const states = event.block.permutation.getState("fec:spread_type")
            const equippedChestplate = entity.getComponent("minecraft:equippable")?.getEquipment("Chest")
            if (!entity.hasTag('corruption_immunity') && entity.typeId != "minecraft:item" && entity.typeId != "fec:corrupted_creeper" && equippedChestplate?.typeId != 'fec:curium_corruption_purifier') {
                system.run(() => {
                    entity.addEffect('blindness', 40)
                    entity.applyDamage(2)
                })
            }
        }
    })

    blockComponentRegistry.registerCustomComponent("fec:temporary_corruption", {
        onTick(event) {
            let { x, y, z } = event.block.location
            event.dimension.runCommandAsync(`setblock ${x} ${y} ${z} grass_block`)
        }
    })
})