import { system, world } from '@minecraft/server'
import { addScore, removeScore, setScore, getScore } from 'main.js'

world.afterEvents.entityHitEntity.subscribe((hurtEvent) => {
    const source = hurtEvent.damagingEntity;
    const damagedEntity = hurtEvent.hitEntity;

    if (source.hasTag('healer') && getScore(source, 'atk_cooldown') == 0) {
        source.runCommandAsync(`playsound random.orb ${source.name}`);
        source.runCommandAsync(`particle fec:winterbloom_sword_attack_4_area ~~~`);
        source.runCommandAsync(`effect @s regeneration 3 3`);
        setScore(source, 'atk_cooldown', 8);
    }

    if (source.hasTag('initiator')) {
        if (source.hasTag('initiator') && getScore(source, 'atk_cooldown') == 0) {
            const initiateDmg = {
                cause: "entity_attack",
                damagingEntity: source,
                damagingProjectile: source
            }
            const strengthMultiplier = {
                amplifier: 1,
                showParticles: false
            }
            damagedEntity.applyDamage(10, initiateDmg)
            source.addEffect('strength', 100, strengthMultiplier)
            damagedEntity.dimension.spawnParticle('minecraft:critical_hit_emitter', damagedEntity.location)
            source.runCommandAsync('playsound mob.zombie.woodbreak @p[r=12]')
        }
        setScore(source, 'atk_cooldown', 15)
    }

    if (source.hasTag('penetrator') && getScore(source, 'atk_cooldown') == 0) {
        const breachDmg = {
            cause: "freezing",
            damagingEntity: source,
            damagingProjectile: source
        }
        damagedEntity.applyDamage(2, breachDmg)
        damagedEntity.applyKnockback(source.getViewDirection().x, source.getViewDirection().z, 3, 1)
        setScore(source, 'atk_cooldown', 5)
    }
})

world.afterEvents.itemUse.subscribe((use) => {
    const player = use.source

    if (player.hasTag("speed_ranger") && use.itemStack.typeId === 'minecraft:feather') {
        if (getScore(player, 'dash_cooldown') == 0) {
            if (player.isSneaking == true) {
                player.applyKnockback(player.getViewDirection().x, player.getViewDirection().z, -3.5, 0.4);
                player.runCommandAsync(`playsound mob.enderdragon.flap "${player.name}"`);
                player.runCommandAsync(`particle fec:dash_fx ~~~`);
                return addScore(player, 'dash_cooldown', 14);
            } else {
                player.applyKnockback(player.getViewDirection().x, player.getViewDirection().z, 3, 0.4);
                player.runCommandAsync(`playsound mob.enderdragon.flap "${player.name}"`);
                player.runCommandAsync(`particle fec:dash_fx ~~~`);
                return addScore(player, 'dash_cooldown', 14);
            }
        } else {
            const soundSettings = {
                location: player.location,
                volume: 1,
                pitch: 1
            }
            player.runCommandAsync(`tellraw "${player.name}" {"rawtext":[{"text":"Wait §c"},{"score":{"name":"*","objective":"dash_cooldown"}},{"text":" §rSeconds"}]}`)
            player.playSound("note.bass", soundSettings)
        }
    }
})