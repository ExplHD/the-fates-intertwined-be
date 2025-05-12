import { system, world } from '@minecraft/server'

system.beforeEvents.startup.subscribe(({ itemComponentRegistry }) => {
    itemComponentRegistry.registerCustomComponent('fec:boss_summon', {
        onUse(e) {
            const player = e.source
            const { x, y, z } = e.source.location
            const location = e.source.location
            const bossItems = [
                'fec:legionnaire_medalion',
                'fec:glorified_water_essence',
                'fec:shadow_heart'
            ]
            const boss = [
                'fec:elemental_legionnaire',
                'fec:water_eidolon',
                'fec:shadowplague_guardian'
            ]
            const item = e.itemStack

            if (item.typeId === bossItems[0]) {
                player.runCommand(`summon ${boss[0]} ${x + Math.random(-10, 10)} ${y + Math.random(1, 3)} ${z + Math.random(-10, 10)}`)
                player.sendMessage(`Someone was using my old artifacts to summon me, Let's Settle this epic duels`)
                player.startItemCooldown('boss_summon', 2400)
            }

            if (item.typeId === bossItems[1]) {
                player.runCommand(`summon ${boss[1]} ${x + Math.random(-10, 10)} ${y + Math.random(1, 3)} ${z + Math.random(-10, 10)}`)
                player.startItemCooldown('boss_summon', 2400)
            }

            if (item.typeId === bossItems[2]) {
                player.runCommand(`summon ${boss[2]} ${x + Math.random(-10, 10)} ${y + Math.random(1, 3)} ${z + Math.random(-10, 10)}`)
                player.startItemCooldown('boss_summon', 2400)
            }
        }
    })
})