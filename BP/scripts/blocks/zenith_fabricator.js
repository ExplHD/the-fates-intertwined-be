import { ItemStack, system, world } from '@minecraft/server'

world.beforeEvents.worldInitialize.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent('fec:zenith_fabricator', {
        onPlayerInteract(e) {
            const block = e.block
            const player = e.player
            const entity = e.dimension.getEntities({
                type: 'fec:zenith_base'
            })
            let { x, y, z } = e.block.location
            const equippedItem = player.getComponent('minecraft:equippable').getEquipment('Mainhand')
            const states = block.permutation.getState('fec:zenith_fabricator')

            if (states == 0) {
                block.setPermutation(block.permutation.withState('fec:zenith_fabricator', 1))
                e.dimension.runCommand(`summon fec:zenith_base ${x} ${y + 0.3} ${z}`)
                e.dimension.runCommand(`particle fec:wind_marker ${x} ${y + 1.3} ${z}`)
                e.dimension.runCommand(`particle fec:wind_marker ${x} ${y + 1.5} ${z}`)
                e.dimension.runCommand(`particle fec:wind_marker ${x} ${y + 1.7} ${z}`)
                e.dimension.runCommand(`particle fec:wind_marker ${x} ${y + 1.9} ${z}`)
                e.dimension.runCommand(`particle fec:wind_marker ${x} ${y + 2.1} ${z}`)
                e.dimension.runCommand(`particle fec:wind_marker ${x} ${y + 2.3} ${z}`)
                e.dimension.runCommand(`particle fec:wind_marker ${x} ${y + 2.5} ${z}`)
                e.dimension.runCommand(`particle fec:wind_marker ${x} ${y + 2.7} ${z}`)
                e.dimension.runCommand(`particle fec:wind_marker ${x} ${y + 2.9} ${z}`)
                block.dimension.playSound('tile.piston.out', block.center(), {
                    pitch: 1,
                    volume: 1
                })
            }

            if (states == 2) {
                if (player.isSneaking === true) {
                    block.setPermutation(block.permutation.withState('fec:zenith_fabricator', 0))
                    player.sendMessage('The Crafting process is cancelled...')
                    block.dimension.playSound('random.break', block.center())
                    entity.forEach(entity => {
                        entity.triggerEvent('despawn')
                    })
                }

                if (player.isSneaking === false && equippedItem?.typeId === 'fec:winterbloom_sword') {
                    block.setPermutation(block.permutation.withState('fec:zenith_fabricator', 3))
                    player.runCommand('clear @s fec:winterbloom_sword 0 1')
                    block.dimension.playSound('random.orb', block.center())
                }
            }

            if (states == 3 && equippedItem?.typeId === 'fec:murasama_calamity') {
                block.setPermutation(block.permutation.withState('fec:zenith_fabricator', 4))
                player.runCommand('clear @s fec:murasama_calamity 0 1')
                block.dimension.playSound('random.orb', block.center())
            }

            if (states == 4 && equippedItem?.typeId === 'fec:windblade_claymore') {
                block.setPermutation(block.permutation.withState('fec:zenith_fabricator', 5))
                player.runCommand('clear @s fec:windblade_claymore 0 1')
                block.dimension.playSound('random.orb', block.center())
            }

            if (states == 5 && equippedItem?.typeId === 'fec:blade_of_the_end') {
                block.setPermutation(block.permutation.withState('fec:zenith_fabricator', 6))
                player.runCommand('clear @s fec:blade_of_the_end 0 1')
                block.dimension.playSound('random.orb', block.center())
            }

            if (states == 6 && equippedItem?.typeId === 'minecraft:nether_star') {
                block.setPermutation(block.permutation.withState('fec:zenith_fabricator', 7))
                player.sendMessage(`Now wait for the crafting process, this takes about 45 to 60 seconds`)
                entity.forEach(entity => {
                    entity.triggerEvent('despawn')
                })
                player.runCommand('clear @s nether_star 0 1')
                block.dimension.playSound('random.orb', block.center())
            }

            if (states == 8) {
                const zenith = new ItemStack('fec:zenith', 1)
                block.setPermutation(block.permutation.withState('fec:zenith_fabricator', 9))
                player.sendMessage(`${player.nameTag}, use this weapon to defeat more stronger boss, guide them to the path of light...`)
                block.dimension.spawnItem(zenith, block.center())
                block.dimension.playSound('mob.wither.spawn', block.center())
                entity.forEach(entity => {
                    entity.triggerEvent('despawn')
                })
            }
        }
    })

    blockComponentRegistry.registerCustomComponent("fec:zenith_fabricator_tick_thing", {
        onTick({ block, dimension }) {
            const states = block.permutation.getState('fec:zenith_fabricator')
            const { x, y, z } = block.location
            if (states == 1) {
                block.setPermutation(block.permutation.withState('fec:zenith_fabricator', 2))
                block.dimension.playSound('tile.piston.in', block.center())
            }

            if (states == 7) {
                block.setPermutation(block.permutation.withState('fec:zenith_fabricator', 8))
                dimension.runCommand(`summon fec:zenith_base ${x} ${y + 0.3} ${z} ~ ~ done`)
                dimension.runCommand(`particle fec:zenith_marker ${x} ${y + 1.3} ${z}`)
                dimension.runCommand(`particle fec:zenith_marker ${x} ${y + 1.5} ${z}`)
                dimension.runCommand(`particle fec:zenith_marker ${x} ${y + 1.7} ${z}`)
                dimension.runCommand(`particle fec:zenith_marker ${x} ${y + 1.9} ${z}`)
                dimension.runCommand(`particle fec:zenith_marker ${x} ${y + 2.1} ${z}`)
                dimension.runCommand(`particle fec:zenith_marker ${x} ${y + 2.3} ${z}`)
                dimension.runCommand(`particle fec:zenith_marker ${x} ${y + 2.5} ${z}`)
                dimension.runCommand(`particle fec:zenith_marker ${x} ${y + 2.7} ${z}`)
                dimension.runCommand(`particle fec:zenith_marker ${x} ${y + 2.9} ${z}`)
                dimension.runCommand(`particle fec:zenith_radial_blast ${x} ${y + 1.15} ${z}`)
                dimension.runCommand(`tellraw @a[r=16] {"rawtext":[{"text":"The process of crafting is done, take this sword, a higher challenge is awaiting you..."}]}`)
                dimension.playSound('portal.travel', block.center(), {
                    pitch: 1,
                    volume: 1
                })
            }

            if (states == 9) {
                block.setPermutation(block.permutation.withState('fec:zenith_fabricator', 0))
            }
        }
    })

    blockComponentRegistry.registerCustomComponent("fec:zenith_fabricator_destroyed", {
        onPlayerDestroy(e) {
            const block = e.block
            const dimension = e.dimension
            const entity = dimension.getEntities({
                type: 'fec:zenith_base'
            })
            entity.forEach(entity => {
                entity.triggerEvent('despawn')
            })
        }
    })
})