import { system, world } from '@minecraft/server'

system.beforeEvents.startup.subscribe((altar) => {
    altar.blockComponentRegistry.registerCustomComponent("fec:stars_altar", {
        onPlayerInteract(e) {
            const block = e.block
            const player = e.player
            const { x, y, z } = e.block.location

            const blockStates = block.permutation.getState("fec:stars_table_states")
            const equippedItem = player.getComponent("minecraft:equippable")?.getEquipmentSlot("Mainhand")
            if (blockStates == 0 && equippedItem.typeId === "fec:star_shard") {
                block.setPermutation(block.permutation.withState("fec:stars_table_states", 1))
                block.dimension.runCommand(`summon fec:star_warrior ${x + Math.random(-20, 20)} ${y + Math.random(0, 10)} ${z + Math.random(-20, 20)}`)
                block.dimension.runCommand(`summon fec:crescent_mage ${x + Math.random(-20, 20)} ${y + Math.random(0, 10)} ${z + Math.random(-20, 20)}`)
                block.dimension.spawnParticle("fec:light_blast", block.center())
                block.dimension.runCommand('title @a[r=64] title Stars Servant')
                block.dimension.runCommand('title @a[r=64] subtitle Servant of The Corvus')
                block.dimension.runCommand("playsound random.explode @a[r=64] ~~~ 1 1 0.3")
                player.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air')
                player.sendMessage("New Objective : Defeat one of them (Star Warrior Recommended).")
                block.dimension.runCommand('music play music.boss.unholy_ambush 1 0 loop')
            }

            if (blockStates == 3 && equippedItem.typeId === "fec:awakened_stars") {
                block.setPermutation(block.permutation.withState("fec:stars_table_states", 0))
                block.dimension.spawnParticle("fec:light_blast", block.center())
                block.dimension.spawnParticle("fec:stars_ping", block.center())
                block.dimension.spawnParticle("fec:stars_ping_small", block.center())
                block.dimension.runCommand("playsound random.level_up @a[r=64] ~~~ 1 0.4 0.3")
            }
        },
        onTick(e) {
            const block = e.block
            const blockStates = block.permutation.getState("fec:stars_table_states")
            if (blockStates == 1 || blockStates == 2) {
                block.setPermutation(block.permutation.withState("fec:stars_table_states", 3))
            }
        }
    })
})