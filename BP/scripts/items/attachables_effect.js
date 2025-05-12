import { world, system } from '@minecraft/server'
import { addScore, getScore, setScore } from 'main.js'

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const equippedItem = player.getComponent("minecraft:equippable").getEquipment("Mainhand")
        const equippedChestplate = player.getComponent("minecraft:equippable").getEquipment("Chest")
        const equippedBoots = player.getComponent("minecraft:equippable").getEquipment("Feet")

        if (equippedBoots?.typeId === "fec:boots_of_escalation") {
            if (getScore(player, "dash_cooldown") > 0 && equippedItem?.typeId != "minecraft:feather") {
                const cooldownValue = getScore(player, "dash_cooldown")
                player.runCommand(`title @s actionbar Jump Cooldown : ${cooldownValue}`)
            }
            if (getScore(player, "boots_of_escalation_charge") < 60 && getScore(player, "dash_cooldown") == 0 && player.isSneaking == true) {
                addScore(player, "boots_of_escalation_charge", 1)
                player.runCommand(`title @s actionbar <<< CHARGING >>>`)
                player.spawnParticle("fec:boots_of_escalation_charging", player.location)
                player.playSound('mob.breeze.charge')
                if (player.isJumping == true && getScore(player, "boots_of_escalation_charge") < 60 && getScore(player, "dash_cooldown") == 0) {
                    setScore(player, "boots_of_escalation_charge", 0)
                    setScore(player, "dash_cooldown", 5)
                    player.applyKnockback({ x: player.getViewDirection().x * 0.1, z: player.getViewDirection().z * 0.1 }, 0.4)
                    player.spawnParticle("fec:boots_of_escalation_jump_weak", player.location)
                    player.playSound('mob.breeze.jump')
                    player.cancel = true
                }
            }
            if (getScore(player, "boots_of_escalation_charge") == 60 && getScore(player, "dash_cooldown") == 0 && player.isSneaking == true) {
                player.runCommand("title @s actionbar Charge Complete, You can jump or release sneak")
                player.spawnParticle("fec:boots_of_escalation_full_charge", player.location)
                player.playSound('random.orb')
                if (player.isJumping == true && getScore(player, "boots_of_escalation_charge") == 60 && getScore(player, "dash_cooldown") == 0) {
                    setScore(player, "boots_of_escalation_charge", 0)
                    setScore(player, "dash_cooldown", 5)
                    player.applyKnockback({ x: player.getViewDirection().x * 0.1, z: player.getViewDirection().z * 0.1 }, 1.6)
                    player.spawnParticle("fec:boots_of_escalation_jump_full", player.location)
                    player.addEffect("slow_falling", 100, {
                        amplifier: 1
                    })
                    player.playSound('mob.breeze.jump')
                    player.cancel = true
                }
            }
            if (player.isSneaking == false && getScore(player, "boots_of_escalation_charge") < 60 && getScore(player, "boots_of_escalation_charge") > 0) {
                setScore(player, "boots_of_escalation_charge", 0)
                player.playSound('mob.wither_shoot')
                player.addEffect("speed", 100, {
                    amplifier: 1
                })
            }
            if (player.isSneaking == false && getScore(player, "boots_of_escalation_charge") == 60) {
                setScore(player, "boots_of_escalation_charge", 0)
                player.playSound('mob.wither.shoot')
                player.addEffect("speed", 200, {
                    amplifier: 4
                })
            }
        }

        if (equippedChestplate?.typeId === 'fec:curium_corruption_purifier') {
            let randomValue = Math.floor(Math.random() * 50)
            if (randomValue == 0) {
                const playerCurrentHealth = player.getComponent("minecraft:health").currentValue

                player.getComponent("minecraft:health").setCurrentValue(playerCurrentHealth + 1)
                player.dimension.spawnParticle("fec:curium_heal", player.location)
            }
        }
    }
})

world.afterEvents.entityHitEntity.subscribe((callback) => {
    const source = callback.damagingEntity;
    const hurtEntity = callback.hitEntity;
    const offHandItem = source.getComponent("minecraft:equippable")?.getEquipment("Offhand");

    if (source?.typeId === 'minecraft:player' && offHandItem?.typeId === 'fec:ultra_core' && getScore(source, "atkCounterDelay") == 0) {
        const playerCurrentHealth = source.getComponent("minecraft:health").currentValue
        hurtEntity.applyDamage(2, {
            cause: "magic"
        })
        hurtEntity?.dimension.spawnParticle("fec:curium_damage", hurtEntity?.location)
        let randomValue = Math.floor(Math.random() * 100)
        if (randomValue < 25) { source.getComponent("minecraft:health").setCurrentValue(playerCurrentHealth + 2) }
    }
})