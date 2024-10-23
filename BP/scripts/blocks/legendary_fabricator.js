import { system, world } from '@minecraft/server'

world.beforeEvents.worldInitialize.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent("fec:legendary_fabricator", {
        onPlayerInteract(event) {
            const player = event.player
            const { x, y, z } = event.block.location

            event.block.setPermutation(event.block.permutation.withState('fec:states_craft', 1))
            event.dimension.runCommand(`particle fec:light_blast ${x} ${y} ${z}`)
            event.dimension.runCommand(`playsound beacon.activate "${player.name}" ${x} ${y} ${z} 1 1 1`)
        },

        onPlace(event) {
            const { x, y, z } = event.block.location
            event.block.setPermutation(event.block.permutation.withState('fec:states_craft', 0))
            event.dimension.runCommand(`particle fec:light_blast ${x} ${y} ${z}`)
            event.dimension.runCommand(`playsound beacon.activate @a[r=8]`)
        }
    })

    blockComponentRegistry.registerCustomComponent("fec:legendary_fabricator_tick_thing", {
        onTick(event) {
            const { x, y, z } = event.block.location
            event.block.setPermutation(event.block.permutation.withState('fec:states_craft', 0))
            event.dimension.runCommand(`particle fec:light_blast ${x} ${y} ${z}`)
            event.dimension.runCommand(`playsound beacon.activate @a[r=8]`)
        }
    })
})