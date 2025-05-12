import { system, world, ItemStack } from '@minecraft/server'
import { addScore, removeScore, setScore, getScore } from 'main.js'
import { shoot } from './custom_function.js'

system.beforeEvents.startup.subscribe((initEvent) => {
    initEvent.itemComponentRegistry.registerCustomComponent("fec:essence_use", {
        onUse(event) {
            const player = event.source
            const itemStack = event.itemStack

            if (itemStack.typeId === 'fec:water_essence') {
                if (player.isSneaking == true) {
                    player.runCommand('tag @p[r=16,rm=0.1] add healed')
                    player.runCommand('effect @a[tag=healed] regeneration 3 4')
                    player.runCommand('execute at @a[tag=healed] run particle fec:water_charge ~~~')
                    player.runCommand('playsound bucket.fill_water @a[r=16]')
                    player.startItemCooldown("water_essence", 900)
                } else {
                    player.runCommand('effect @a[r=3] regeneration 3 4')
                    player.runCommand('particle fec:water_charge ~~~')
                    player.runCommand('playsound bucket.fill_water @a[r=16]')
                    player.startItemCooldown("water_essence", 900)
                }
            }

            if (itemStack.typeId === 'fec:earth_essence') {
                player.runCommand('tag @s add earth_iframe')
                player.runCommand('effect @s resistance 3 255 true')
                player.runCommand('playsound mob.zombie.remedy @a[r=16]')
                player.startItemCooldown("earth_essence", 600)
            }

            if (itemStack.typeId === 'fec:lightning_essence') {
                player.startItemCooldown("lightning_essence", 100)
                const launchVel = 5;
                const velocity = player.getViewDirection();
                let headLoc = player.getHeadLocation();
                const arrow = player.dimension.spawnEntity(`fec:thrown_lightning_essence`, { x: headLoc.x + velocity.x, y: headLoc.y + velocity.y, z: headLoc.z + velocity.z });
                const projectileComp = arrow.getComponent('minecraft:projectile');
                projectileComp?.shoot({ x: velocity.x * launchVel, y: velocity.y * launchVel, z: velocity.z * launchVel });
            }

            if (itemStack.typeId === 'fec:fire_essence') {
                player.runCommand('fill ~-5~-2~-5~5~5~5 fire replace air')
                player.runCommand('effect @s fire_resistance 5 0 true')
                player.runCommand('damage @e[r=6,rm=0.1] 4 magic entity @s')
                player.startItemCooldown("fire_essence", 400)
            }

            if (itemStack.typeId === 'fec:wind_essence') {
                if (player.isSneaking == true && getScore(player, "wind_essence_up") == 0) {
                    const IframeOptions = {
                        amplifier: 255,
                        showParticles: false
                    }
                    player.applyKnockback({ x: player.getViewDirection().x * 0.1, z: player.getViewDirection().z * 0.1 }, 1.4)
                    player.runCommand(`playsound mob.enderdragon.flap "${player.name}"`);
                    player.runCommand(`particle fec:dash_fx ~~~`);
                    player.runCommand(`particle fec:dash_fx ~~1~`);
                    player.runCommand(`particle fec:dash_fx ~~2~`);
                    player.runCommand(`particle fec:dash_fx ~~3~`);
                    player.addEffect('resistance', 40, IframeOptions);
                    addScore(player, 'wind_essence_up', 5);
                }

                if (player.isSneaking == false && getScore(player, "wind_essence") == 0) {
                    player.applyKnockback({ x: player.getViewDirection().x * 3.1, z: player.getViewDirection().z * 3.1 }, 0.3)
                    player.runCommand(`playsound mob.enderdragon.flap "${player.name}"`);
                    player.runCommand(`particle fec:windblade_claymore_attack_3 ~~~`);
                    addScore(player, 'wind_essence', 20);
                }
            }

            if (itemStack.typeId === 'fec:shadowcore') {
                player.addEffect('resistance', 100, {
                    amplifier: 255
                })
                player.addEffect('regeneration', 100, {
                    amplifier: 2
                })
                player.addEffect('speed', 100, {
                    amplifier: 3
                })
                player.startItemCooldown('shadowcore', 6000)
            }
        }
    })

    initEvent.itemComponentRegistry.registerCustomComponent("fec:consumables", {
        onConsume({ itemStack, source }) {
            if (itemStack?.typeId === "fec:capsule_of_life_extender") {
                const playerHealthLevel = source.getProperty("fec:player_health_level")
                switch (playerHealthLevel) {
                    case 1:
                        source.triggerEvent("fec:capsule_of_life_used")
                        source.sendMessage(`§bCapsule of Life Extender Used :`)
                        source.sendMessage(`Current HP : 20 (lv1) -> 30 (lv2)`)
                        source.sendMessage(`§eNext Level : 30 (lv2) -> 40 (lv3)`)
                        source.sendMessage(`§aYou can use it again`)
                        source.playSound("random.levelup")
                        break;
                    case 2:
                        source.triggerEvent("fec:capsule_of_life_used")
                        source.sendMessage(`§bCapsule of Life Extender Used :`)
                        source.sendMessage(`Current HP : 30 (lv2) -> 40 (lv3)`)
                        source.sendMessage(`§eNext Level : 40 (lv3) -> 50 (lv4)`)
                        source.sendMessage(`§aYou can use it again`)
                        source.playSound("random.levelup")
                        break;
                    case 3:
                        source.triggerEvent("fec:capsule_of_life_used")
                        source.sendMessage(`§bCapsule of Life Extender Used :`)
                        source.sendMessage(`Current HP : 40 (lv3) -> 50 (lv4)`)
                        source.sendMessage(`§eNext Level : 50 (lv4) -> 60 (lv5)`)
                        source.sendMessage(`§aYou can use it again`)
                        source.playSound("random.levelup")
                        break;
                    case 4:
                        source.triggerEvent("fec:capsule_of_life_used")
                        source.sendMessage(`§aCapsule of Life Extender Used :`)
                        source.sendMessage(`Current HP : 50 (lv4) -> 60 (lv5)`)
                        source.sendMessage(`§cMaximum Level Reached, using it may cause the item dissapear`)
                        source.playSound("random.levelup")
                        break;
                    case 5:
                        source.sendMessage(`§aCapsule of Life Extender Used :`)
                        source.sendMessage(`§cMaximum level reached, an item is wasted because of your greediness`)
                        source.playSound("random.break")
                        break;
                    default: break;
                }
            }

            if (itemStack?.typeId === "fec:anchor_potion_bottle") {
                const playerSpawnPoint = source?.getSpawnPoint()
                const worldSpawn = world.getDefaultSpawnLocation()

                function playTeleportSoundToSelf() {
                    source.dimension.playSound("custom_sfx.teleport", source.location);
                }

                if (!playerSpawnPoint) {
                    source.teleport({ x: worldSpawn.x, y: source.location.y, z: worldSpawn.z });
                    world.getDimension("overworld").spawnParticle("fec:anchor_potion_teleport", { x: worldSpawn.x, y: source.location.y, z: worldSpawn.z });
                    source.dimension.spawnParticle("fec:anchor_potion_teleport", source.location)
                    source.dimension.playSound("custom_sfx.teleport", source.location);
                    system.runTimeout(playTeleportSoundToSelf, 2)
                    return;
                }

                source.teleport({ x: playerSpawnPoint.x, y: playerSpawnPoint.y, z: playerSpawnPoint.z })
                world.getDimension("overworld").spawnParticle("fec:anchor_potion_teleport", playerSpawnPoint);
                source.dimension.spawnParticle("fec:anchor_potion_teleport", source.location)
                source.dimension.playSound("custom_sfx.teleport", source.location);
                system.runTimeout(playTeleportSoundToSelf, 2)
                source.camera.fade({
                    fadeColor: {
                        blue: 0.77,
                        green: 1,
                        red: 0
                    },
                    fadeTime: {
                        fadeInTime: 0,
                        fadeOutTime: 2,
                        holdTime: 2
                    }
                })
            }
        },
        onUse({ itemStack, source }) {
            if (itemStack?.typeId === "fec:anchor_potion_bottle") {
                const playerSpawnPoint = source?.getSpawnPoint()
                const worldSpawn = world.getDefaultSpawnLocation()

                if (!playerSpawnPoint) {
                    world.getDimension("overworld").spawnParticle("fec:anchor_potion_swirl_1", { x: worldSpawn.x, y: source.location.y, z: worldSpawn.z });
                    source.dimension.spawnParticle("fec:anchor_potion_swirl_1", source.location)
                    return;
                }

                world.getDimension("overworld").spawnParticle("fec:anchor_potion_swirl_1", playerSpawnPoint);
                source.dimension.spawnParticle("fec:anchor_potion_swirl_1", source.location)
            }
        }
    })
})