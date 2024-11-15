import { system, world } from '@minecraft/server'
import { addScore, removeScore, setScore, getScore } from 'main.js'

world.afterEvents.entityHitEntity.subscribe(stathit => {
    const source = stathit.damagingEntity;
    const damagedEntity = stathit.hitEntity;

    if (source.typeId === 'minecraft:player' && getScore(source, 'atkCounterDelay') == 0) {
        addScore(source, 'atkCounter', 1)
        addScore(source, 'atkCounterDelay', 10)
        source.runCommandAsync(`titleraw "${source.name}" actionbar {"rawtext":[{"text":"§aHit Entity Statistics : §e"},{"score":{"name":"*","objective":"atkCounter"}},{"text":" (+1), Mob HP : ${damagedEntity.getComponent('minecraft:health').currentValue.toFixed(2)}"}]}`)
        if (damagedEntity.typeId === 'minecraft:player') {
            damagedEntity.runCommand(`title @s actionbar You were hit by ${source.nameTag}, ${damagedEntity.getComponent('minecraft:health').currentValue.toFixed(2)} HP Left`)
        }
    }
})

world.afterEvents.playerPlaceBlock.subscribe(stats => {
    const player = stats.player
    addScore(player, 'placeBlockCounter', 1)
    player.runCommandAsync(`titleraw "${player.name}" actionbar {"rawtext":[{"text":"§aPlace Block Statistics : §e"},{"score":{"name":"*","objective":"placeBlockCounter"}},{"text":" (+1)"}]}`)
})

world.afterEvents.playerBreakBlock.subscribe(stats => {
    const player = stats.player
    addScore(player, 'breakBlockCounter', 1)
    player.runCommandAsync(`titleraw "${player.name}" actionbar {"rawtext":[{"text":"§aBreak Block Statistics : §e"},{"score":{"name":"*","objective":"breakBlockCounter"}},{"text":" (+1)"}]}`)
})

world.afterEvents.entityDie.subscribe(statkill => {
    const killer = statkill.damageSource.damagingEntity
    const killed = statkill.deadEntity

    if (killed.typeId === 'minecraft:player' && killer.typeId === 'minecraft:player') {
        addScore(killer, 'killCounter', 1)
        killer.runCommand(`playsound random.orb @s ~~~ 1 0.5 1`)
        killer.runCommand(`title @s title §r`)
        if (getScore(killer, 'killCounter') < 2) {
            killer.runCommand(`titleraw @s subtitle {"rawtext":[{"text":"§aKilled §e"},{"score":{"name":"*","objective":"killCounter"}},{"text":" (+1) §aPlayer"}]}`)
        } else {
            killer.runCommand(`titleraw @s subtitle {"rawtext":[{"text":"§aKilled §e"},{"score":{"name":"*","objective":"killCounter"}},{"text":" (+1) §aPlayers"}]}`)
        }
    }
})