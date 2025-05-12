import { system, world } from '@minecraft/server'

let spreadableBlocks = ['fec:shadow_corruption', 'grass_block']
let availableBlockList = ['grass_block', 'dirt', 'podzol', 'stone', 'cobblestone']

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent('fec:spread', {
        onRandomTick(event) {
            let { x, y, z } = event.block.location
            let randomVal = Math.floor(Math.random() * 1)
            if (randomVal == 0) {
                event.dimension.runCommand(`fill ${x - 1} ${y - 1} ${z - 1} ${x + 1} ${y + 1} ${z + 1} ${spreadableBlocks[0]} replace ${availableBlockList[0]}`)
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
            event.dimension.runCommand(`setblock ${x} ${y} ${z} grass_block`)
        }
    })
})

world.beforeEvents.playerInteractWithBlock.subscribe((e) => {
    const player = e.player
    const block = e.block
    const item = e.itemStack
    const { x, y, z } = e.block.location

    if (player.isSneaking == true && item?.typeId === "minecraft:iron_ingot") {
        if (block.typeId === 'minecraft:chipped_anvil') {
            const runId = system.run(() => {
                player.runCommand('clear @s iron_ingot 0 1');
                block.dimension.runCommand(`setblock ${x} ${y} ${z} anvil`);
                e.cancel = true;
            });
            system.runTimeout(() => {
                system.clearRun(runId);
            }, 1)
        }
        if (block.typeId === 'minecraft:damaged_anvil') {
            const runId = system.run(() => {
                player.runCommand('clear @s iron_ingot 0 1');
                block.dimension.runCommand(`setblock ${x} ${y} ${z} chipped_anvil`);
                e.cancel = true;
            });
            system.runTimeout(() => {
                system.clearRun(runId);
            }, 1)
        }
    }
})