import { system, world } from '@minecraft/server'

let spreadableBlocks = ['fec:shadow_corruption', 'grass_block']
let availableBlockList = ['grass_block', 'dirt', 'podzol', 'stone', 'cobblestone']

world.beforeEvents.worldInitialize.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent('fec:spread', {
        onRandomTick(event) {
            let { x, y, z } = event.block.location
            event.dimension.runCommandAsync(`fill ${x - 1} ${y - 1} ${z - 1} ${x + 1} ${y + 1} ${z + 1} ${spreadableBlocks[0]} replace ${availableBlockList[0]}`)
        }
    })

    blockComponentRegistry.registerCustomComponent("fec:magic_poisoning", {
        onStepOn(event) {
            const entity = event.entity
            let { x, y, z } = event.block.location
            const states = event.block.permutation.getState("fec:spread_type")
            if (!entity.hasTag('corruption_immunity')) {
                system.run(() => {
                    entity.addEffect('blindness', 40)
                    entity.applyDamage(2)
                })
            }

            if (entity.typeId === 'minecraft:item' && states === 0) {
                system.run(() => {
                    entity.runCommand(`particle fec:shadow_revolver_corruption_expands_beam ${x} ${y} ${z}`)
                    entity.kill()
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