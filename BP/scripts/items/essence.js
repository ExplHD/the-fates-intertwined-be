import { world } from '@minecraft/server'
import { addScore, removeScore, setScore, getScore } from 'main.js'

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
    initEvent.itemComponentRegistry.registerCustomComponent("fec:essence_use", {
        onUse(event) {
            const player = event.source
            const itemStack = event.itemStack

            if (itemStack.typeId === 'fec:water_essence') {
                if (player.isSneaking == true) {
                    player.runCommandAsync('tag @p[r=16,rm=0.1] add healed')
                    player.runCommandAsync('effect @a[tag=healed] regeneration 3 4')
                    player.runCommandAsync('execute at @a[tag=healed] run particle fec:water_charge ~~~')
                    player.runCommandAsync('playsound bucket.fill_water @a[r=16]')
                    player.startItemCooldown("water_essence", 900)
                } else {
                    player.runCommandAsync('effect @a[r=3] regeneration 3 4')
                    player.runCommandAsync('particle fec:water_charge ~~~')
                    player.runCommandAsync('playsound bucket.fill_water @a[r=16]')
                    player.startItemCooldown("water_essence", 900)
                }
            }

            if (itemStack.typeId === 'fec:earth_essence') {
                player.runCommandAsync('tag @s add earth_iframe')
                player.runCommandAsync('effect @s resistance 3 255 true')
                player.runCommandAsync('playsound mob.zombie.remedy @a[r=16]')
                player.startItemCooldown("earth_essence", 600)
            }

            if (itemStack.typeId === 'fec:lightning_essence') {
                player.startItemCooldown("lightning_essence", 300)
                player.getComponent("minecraft:equippable").setEquipment("mainhand", "fec:lightning_essence")
            }

            if (itemStack.typeId === 'fec:fire_essence') {
                player.runCommandAsync('fill ~-5~-2~-5~5~5~5 fire replace air')
                player.runCommandAsync('effect @s fire_resistance 5 0 true')
                player.runCommandAsync('damage @e[r=6,rm=0.1] 4 magic entity @s')
                player.startItemCooldown("fire_essence", 400)
            }

            if (itemStack.typeId === 'fec:wind_essence') {
                if (player.isSneaking == true && getScore(player, "wind_essence_up") == 0) {
                    const IframeOptions = {
                        amplifier: 255,
                        showParticles: false
                    }
                    player.applyKnockback(player.getViewDirection().x, player.getViewDirection().z, 0.4, 1.1);
                    player.runCommandAsync(`playsound mob.enderdragon.flap "${player.name}"`);
                    player.runCommandAsync(`particle fec:dash_fx ~~~`);
                    player.runCommandAsync(`particle fec:dash_fx ~~1~`);
                    player.runCommandAsync(`particle fec:dash_fx ~~2~`);
                    player.runCommandAsync(`particle fec:dash_fx ~~3~`);
                    player.addEffect('resistance', 40, IframeOptions);
                    addScore(player, 'wind_essence_up', 5);
                }
                if (player.isSneaking == false && getScore(player, "wind_essence") == 0) {
                    player.applyKnockback(player.getViewDirection().x, player.getViewDirection().z, 3.1, 0.4);
                    player.runCommandAsync(`playsound mob.enderdragon.flap "${player.name}"`);
                    player.runCommandAsync(`particle fec:windblade_claymore_attack_3 ~~~`);
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
})