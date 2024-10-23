import { ItemStack, world, system } from '@minecraft/server'

world.beforeEvents.worldInitialize.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent("fec:shadow_bench", {
        onPlace(e) {
            e.block.setPermutation(e.block.permutation.withState('fec:shadow_bench_item', 0))
            e.block.setPermutation(e.block.permutation.withState('fec:shadow_revolver_process', 0))
        },
        onPlayerInteract(e) {
            const block = e.block
            const player = e.player
            const { x, y, z } = e.block.location
            const equippedItem = player.getComponent('minecraft:equippable').getEquipment('Mainhand')
            const processState = block.permutation.getState('fec:shadow_revolver_process')
            const itemState = block.permutation.getState('fec:shadow_bench_item')

            if (player.isSneaking === true && processState == 0) {
                if (itemState == 1) {
                    block.setPermutation(block.permutation.withState('fec:shadow_bench_item', 0))
                    block.dimension.playSound('tile.piston.in', block.center())

                } else {
                    block.setPermutation(block.permutation.withState('fec:shadow_bench_item', itemState + 1))
                    block.dimension.playSound('tile.piston.in', block.center())
                }
            }

            if (itemState == 1 && player.isSneaking === false) {
                if (equippedItem.typeId === 'fec:shadow_corruption') {
                    player.runCommand(`give @s grass_block 1`)
                    player.runCommand(`clear @s fec:shadow_corruption 0 1`)
                    block.dimension.spawnParticle('fec:shadow_slash', block.center())
                }
                if (equippedItem.typeId === 'minecraft:grass_block') {
                    player.runCommand(`give @s fec:shadow_corruption 1`)
                    player.runCommand(`clear @s grass_block 0 1`)
                    block.dimension.spawnParticle('fec:spear_of_heart_attack_4', block.center())
                }
            }

            if (itemState == 0 && processState == 0 && player.isSneaking === false) {
                block.setPermutation(block.permutation.withState('fec:shadow_revolver_process', 1))
                block.dimension.playSound('beacon.activate', block.location, {
                    pitch: 0.9,
                    volume: 2
                })
                player.sendMessage(`To Craft Shadow Revolver, you need :`)
                player.sendMessage(`1x Reworked Tenacity`)
                player.sendMessage(`6x Shadow Core`)
                player.sendMessage(`1x Nether Star`)
                player.sendMessage(`§cTo cancel the crafting process, sneak while interacting this block`)
                block.dimension.spawnParticle('fec:paranoia', block.center())
            }

            if (processState == 1 && player.isSneaking === true) {
                block.setPermutation(block.permutation.withState('fec:shadow_revolver_process', 0))
                block.dimension.playSound('beacon.deactivate', block.center(), {
                    pitch: 0.9,
                    volume: 2
                })
                player.sendMessage(`§cCrafting process is cancelled`)
                block.dimension.spawnParticle('fec:paranoia', block.center())
            }

            if (processState == 1 && player.isSneaking === false && equippedItem.typeId === 'fec:reworked_tenacity') {
                block.setPermutation(block.permutation.withState('fec:shadow_revolver_process', 2))
                player.runCommand(`clear @s fec:reworked_tenacity 0 1`)
                block.dimension.playSound('random.orb', block.center())
                block.dimension.spawnParticle('fec:shadow_slash', block.center())
            }

            if (processState >= 2 && processState < 8 && equippedItem.typeId === 'fec:shadowcore') {
                block.setPermutation(block.permutation.withState('fec:shadow_revolver_process', processState + 1))
                player.runCommand(`clear @s fec:shadowcore 0 1`)
                block.dimension.playSound('random.orb', block.center())
                block.dimension.spawnParticle('fec:shadow_slash', block.center())
            }

            if (processState == 8 && equippedItem.typeId === 'minecraft:nether_star') {
                block.setPermutation(block.permutation.withState('fec:shadow_revolver_process', 9))
                block.dimension.playSound('random.levelup', block.center())
                player.sendMessage(`§5Wait for the process, this will not take long time...`)
                block.dimension.spawnParticle('fec:crescent_pillar', block.center())
            }
        },
        onTick(e) {
            const block = e.block
            const { x, y, z } = e.block.location
            const processState = block.permutation.getState('fec:shadow_revolver_process')
            const itemState = block.permutation.getState('fec:shadow_bench_item')
            if (itemState == 0 && processState == 9) {
                block.setPermutation(block.permutation.withState('fec:shadow_revolver_process', 10))
                block.dimension.runCommand(`tellraw @a[r=5] {"rawtext":[{"text":"§5The Crafting process is done, now you will conquer the champions..."}]}`)
                block.dimension.playSound('portal.travel', block.center())
                block.dimension.spawnParticle('fec:paranoia', block.center())
                block.dimension.spawnItem(new ItemStack('fec:shadow_revolver', 1), block.center())
            }
            if (itemState == 0 && processState == 10) {
                block.setPermutation(block.permutation.withState('fec:shadow_revolver_process', 0))
            }
        }
    })
})