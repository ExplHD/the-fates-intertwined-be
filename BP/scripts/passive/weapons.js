import { system, world, GameMode } from '@minecraft/server'
import { addScore, removeScore, setScore, getScore } from 'main.js'

let charges = [
    "murasama_calamity_c4",
    "shadow_revolver_rounds",
    "voltra_charge",
    "winterbloom_sword_ultimate_charge",
    "tenacity_c3_charge",
    "the_enigma_c2",
    "the_enigma_c4",
    "yamato_c1"
]

let cooldownListTick = [
    "stars_and_crescent_c1"
]

let cooldownList = [
    "blade_of_the_end_c1",
    "blade_of_the_end_c2",
    "blade_of_the_end_c3",
    "blade_of_the_end_c4",
    "winterbloom_sword_c1",
    "winterbloom_sword_c2",
    "winterbloom_sword_c3",
    "rage_of_sakura_c1",
    "rage_of_sakura_c2",
    "rage_of_sakura_c3",
    "murasama_calamity_c1",
    "murasama_calamity_c2",
    "murasama_calamity_c3",
    "windblade_claymore_c1",
    "windblade_claymore_c2",
    "windblade_claymore_c3",
    "spear_of_heart_c1",
    "spear_of_heart_c2",
    "spear_of_heart_c3",
    "zenith_c1",
    "zenith_c2",
    "zenith_c3",
    "zenith_c4",
    "zenith_c5",
    "eidolon_4_staff_c1",
    "eidolon_4_staff_c2",
    "eidolon_4_staff_c3",
    "stars_and_crescent_c2",
    "stars_and_crescent_c3",
    "stars_and_crescent_c4",
    "stars_and_crescent_c5",
    "shadow_revolver_c1",
    "shadow_revolver_c2",
    "shadow_revolver_c3",
    "shadow_revolver_c4",
    "tenacity_c1",
    "tenacity_c2",
    "tenacity_c3",
    "tenacity_c4",
    "tenacity_c2_axe",
    "tenacity_c3_axe",
    "tenacity_c4_axe",
    "reworked_tenacity_c1",
    "reworked_tenacity_c2",
    "reworked_tenacity_c3",
    "the_enigma_c1",
    "the_enigma_c3",
    "yamato_c2",
    "yamato_c3",
    "mythic_tenacity_shield",
    "wind_essence_up"
]

let skillSwitcher = [
    "winterbloom_sword",
    "rage_of_sakura",
    "murasama_calamity",
    "spear_of_heart",
    "blade_of_the_end",
    "windblade_claymore",
    "eidolon_4_staff",
    "zenith",
    "stars_and_crescent",
    "shadow_revolver",
    "mythic_tenacity",
    "reworked_tenacity",
    "the_enigma",
    "yamato"
]

let unique_weapons = [
    "fec:winterbloom_sword",
    "fec:rage_of_sakura",
    "fec:murasama_calamity",
    "fec:spear_of_heart",
    "fec:blade_of_the_end",
    "fec:windblade_claymore",
    "fec:eidolon_4_staff",
    "fec:zenith",
    "fec:stars_and_crescent",
    "fec:shadow_revolver",
    "fec:tenacity",
    "fec:reworked_tenacity",
    "fec:the_enigma"
]

world.afterEvents.worldLoad.subscribe((e) => {
    system.run(() => {
        for (const players of world.getPlayers()) {
            for (const cooldownSec of cooldownList) {
                if (!world.scoreboard.getObjective(cooldownSec)) {
                    world.scoreboard.addObjective(cooldownSec)
                    addScore(players, cooldownSec, 0)
                }
            }
            for (const cooldownTick of cooldownListTick) {
                if (!world.scoreboard.getObjective(cooldownTick)) {
                    world.scoreboard.addObjective(cooldownTick)
                    addScore(players, cooldownTick, 0)
                }
            }
            for (const charge of charges) {
                if (!world.scoreboard.getObjective(charge)) {
                    world.scoreboard.addObjective(charge)
                    addScore(players, charge, 0)
                }
            }
            for (const skills of skillSwitcher) {
                if (!world.scoreboard.getObjective(skills)) {
                    world.scoreboard.addObjective(skills)
                    addScore(players, skills, 0)
                }
            }
            if (!world.scoreboard.getObjective('atkp_delay')) {
                world.scoreboard.addObjective('atkp_delay')
            }
        }
    })
})

system.runInterval(() => {
    world.getDimension("overworld").runCommand('function weapons/base')
    for (const players of world.getPlayers()) {
        for (const cooldown of cooldownList) {
            addScore(players, cooldown, 0)
            if (getScore(players, cooldown) > 0) {
                // Inverse the number because of for looping glitch
                removeScore(players, cooldown, -1)
            }
        }

        if (players.getProperty("fec:shadow_revolver_state") == 1) {
            players.dimension.spawnParticle("fec:shadow_revolver_ultimate_burst_ring", players.location)
            players.runCommand(`title @s actionbar §c<<< SHOOT THEM FAST >>>`)
            switch (getScore(players, "shadow_revolver_c4")) {
                case 100:
                    players.onScreenDisplay.setTitle(" ")
                    players.runCommand(`titleraw @s subtitle {"rawtext":[{"text":"§c-= 5 Seconds before self destruct =-"}]}`)
                    break;
                case 99:
                    players.onScreenDisplay.setTitle(" ")
                    players.runCommand(`titleraw @s subtitle {"rawtext":[{"text":"§c-= 4 Seconds before self destruct =-"}]}`)
                    break;
                case 98:
                    players.onScreenDisplay.setTitle(" ")
                    players.runCommand(`titleraw @s subtitle {"rawtext":[{"text":"§c-= 3 Seconds before self destruct =-"}]}`)
                    break;
                case 97:
                    players.onScreenDisplay.setTitle(" ")
                    players.runCommand(`titleraw @s subtitle {"rawtext":[{"text":"§c-= 2 Seconds before self destruct =-"}]}`)
                    break;
                case 96:
                    players.onScreenDisplay.setTitle(" ")
                    players.runCommand(`titleraw @s subtitle {"rawtext":[{"text":"§c-= 1 Seconds before self destruct =-"}]}`)
                    break;
                case 95:
                    players.onScreenDisplay.setTitle(" ")
                    players.runCommand(`titleraw @s subtitle {"rawtext":[{"text":"§c-= SELF DESTRUCT INITIATED! =-"}]}`)
                    players.runCommand(`tellraw @a {"rawtext":[{"text":"§c"},{"selector":"@s"},{"text":" died because exposed to Shadow's radiation for too long"}]}`)
                    players.dimension.spawnParticle("fec:shadow_revolver_ultimate_explode", players.location)
                    players.dimension.spawnParticle("fec:paranoia", players.location)
                    players.applyDamage(9999, {
                        cause: 'magic'
                    })
                    players.setProperty("fec:shadow_revolver_state", 0)
                    break;
                default: continue;
            }
        }

        if (players.hasTag('tenacity_invulnerable') && getScore(players, 'mythic_tenacity_shield') > 0) {
            players.onScreenDisplay.setTitle(" ")
            players.runCommand(`titleraw @a[scores={mythic_tenacity_shield=1..}] subtitle {"rawtext":[{"text":"§b-= Invincibility : "},{"score":{"name":"*","objective":"mythic_tenacity_shield"}},{"text":" =-"}]}`)
            players.addEffect("resistance", 20, {
                amplifier: 255,
                showParticles: false
            });
            players.spawnParticle("fec:mythic_tenacity_shield", players.location);
        }

        // Archived Commands, DO NOT ENABLE IT OR YOU'LL GET ERROR SPAM MESSAGES

        /*
        for (const weapons of unique_weapons) {
            const item = players.getComponent("minecraft:equippable").getEquipment("mainhand")

            if (item.typeId != weapons) {
                players.runCommand(`title @a title Text.display_0`)
            }
        }
        */

        for (const charge of charges) {
            addScore(players, charge, 0)
        }

        for (const skillSwitch of skillSwitcher) {
            addScore(players, skillSwitch, 0)
        }
    }
}, 20)

system.runInterval(() => {
    for (const players of world.getPlayers()) {
        // Inversion was used due to a glitch with for each statements
        for (const cooldownTick of cooldownListTick) {
            addScore(players, cooldownTick, 0)
            if (getScore(players, cooldownTick) > 0) {
                removeScore(players, cooldownTick, -1)
            }
        }
    }
}, 0)

// Weapons Kill Effect
world.afterEvents.entityDie.subscribe((fx) => {
    const killer = fx.damageSource.damagingEntity
    const killed = fx.deadEntity

    if (killer?.typeId === "minecraft:player") {
        const itemEquipped = killer.getComponent("minecraft:equippable").getEquipment('Mainhand')
        if (killed?.typeId === "minecraft:player") {
            if (itemEquipped?.typeId === "fec:tenacity" || itemEquipped?.typeId === "fec:tenacity_axe") {
                killed.runCommand(`particle fec:tenacity_player_kill_fx ~~0.5~`)
                killed.runCommand(`particle fec:tenacity_player_kill_flash ~~0.5~`)
            }
            if (itemEquipped?.typeId === "fec:stars_and_crescent") {
                killed.runCommand(`particle fec:stars_and_crescent_player_kill_fx ~~1~`)
                killed.runCommand(`particle fec:stars_and_crescent_player_ping ~~1~`)
            }
            if (itemEquipped?.typeId === "fec:zenith") {
                killed.runCommand(`particle fec:zenith_entity_kill_fx ~~1~`)
                killed.runCommand(`particle fec:zenith_entity_kill_fx_vertical_x ~~1~`)
                killed.runCommand(`particle fec:zenith_entity_kill_fx_vertical_z ~~1~`)
                killed.runCommand(`particle fec:zenith_kill_flash ~~1~`)
            }
            if (itemEquipped?.typeId === "fec:shadow_revolver") {
                killed.runCommand(`particle fec:shadow_revolver_player_kill_fx ~~~`)
                killed.runCommand(`particle fec:shadow_revolver_entity_kill_fx ~~~`)
            }
        } else {
            if (itemEquipped?.typeId === "fec:tenacity" || itemEquipped?.typeId === "fec:tenacity_axe") {
                killed.runCommand(`particle fec:tenacity_entity_kill_fx ~~0.5~`)
                killed.runCommand(`particle fec:tenacity_entity_kill_flash ~~0.5~`)
            }
            if (itemEquipped?.typeId === "fec:stars_and_crescent") {
                killed.runCommand(`particle fec:stars_and_crescent_entity_kill_fx ~~1~`)
                killed.runCommand(`particle fec:stars_and_crescent_kill_flash ~~1~`)
            }
            if (itemEquipped?.typeId === "fec:zenith") {
                killed.runCommand(`particle fec:zenith_entity_kill_fx ~~1~`)
                killed.runCommand(`particle fec:zenith_kill_flash ~~1~`)
            }
            if (itemEquipped?.typeId === "fec:shadow_revolver") {
                killed.runCommand(`particle fec:shadow_revolver_entity_kill_fx ~~~`)
                killed.runCommand(`particle fec:shadow_revolver_muzzle_flash ~~~`)
            }
        }
    }

    // Other Entities Related to Weapon Kill Effect 
    if (killer?.typeId === "fec:shadow_revolver_bullet") {
        if (killed?.typeId === "minecraft:player" && killed.typeId != "fec:shadow_revolver_bullet") {
            killed.runCommand(`particle fec:shadow_revolver_player_kill_fx ~~~`)
            killed.runCommand(`particle fec:shadow_revolver_entity_kill_fx ~~~`)
        }
        if (killed.typeId != "fec:shadow_revolver_bullet") {
            killed.runCommand(`particle fec:shadow_revolver_entity_kill_fx ~~~`)
            killed.runCommand(`particle fec:shadow_revolver_muzzle_flash ~~~`)
        }
    }

    if (killer?.typeId === "fec:tenacity_blue_slash" || killer?.typeId === "fec:tenacity_orange_slash" || killer?.typeId === "fec:tenacity_sky_meteor") {
        if (killed?.typeId === "minecraft:player") {
            killed.runCommand(`particle fec:tenacity_player_kill_fx ~~0.5~`)
            killed.runCommand(`particle fec:tenacity_player_kill_flash ~~0.5~`)
        } else {
            killed.runCommand(`particle fec:tenacity_entity_kill_fx ~~0.5~`)
            killed.runCommand(`particle fec:tenacity_entity_kill_flash ~~0.5~`)
        }
    }

    if (killer?.typeId === "fec:crescent_pillar") {
        if (killed?.typeId === "minecrft:player") {
            killed.runCommand(`particle fec:stars_and_crescent_player_kill_fx ~~1~`)
            killed.runCommand(`particle fec:stars_and_crescent_player_ping ~~1~`)
        } else {
            killed.runCommand(`particle fec:stars_and_crescent_entity_kill_fx ~~1~`)
            killed.runCommand(`particle fec:stars_and_crescent_kill_flash ~~1~`)
        }
    }
})

// Other Mechanics
system.afterEvents.scriptEventReceive.subscribe((weaponEvent) => {
    const {
        id,
        player = weaponEvent.sourceEntity
    } = weaponEvent;

    if (id == 'fec:shadow_revolver_ultimate_knockback') {
        player.applyKnockback({ x: player.getViewDirection().x * -2, z: player.getViewDirection().z * -2 }, 1)
        player.runCommand(`particle fec:paranoia ~~~`)
    }

    if (id == 'fec:yamato_attack_3') {
        let randomValue = Math.floor(Math.random() * 10)
        if (randomValue > 5) { addScore(player, 'yamato_c1', 1) }
        system.runTimeout((e) => {
            player.applyKnockback({ x: player.getViewDirection().x * 4, z: player.getViewDirection().z * 4 }, 0.4)
            player.dimension.playSound("sword_slash.heavy_slash", player.location, {
                pitch: 0.8,
                volume: 1
            })
            player.runCommand(`damage @e[r=5,rm=0.1,family=!inanimate,type=!item] 14 entity_attack entity @s`)
            system.runTimeout(() => {
                player.runCommand(`damage @e[r=5,rm=0.1,family=!inanimate,type=!item] 14 entity_attack entity @s`)
            }, 7)
        }, 13)
    }
    if (id == 'fec:yamato_skill_2') {
        player.applyKnockback({ x: player.getViewDirection().x * 4, z: player.getViewDirection().z * 4 }, 0.4)
        system.runTimeout(() => {
            player.dimension.spawnParticle("fec:yamato_skill_2", player.location)
            player.runCommand(`damage @e[r=5,rm=0.1,family=!inanimate,type=!item] 2 entity_attack entity @s`)
        }, 10)
    }
    if (id == 'fec:death') {
        system.runTimeout((e) => {
            player.setGameMode(GameMode.spectator)
        }, 6)
    }
    /* DRAFT
    if (id == 'fec:the_enigma_flash') {
        const { entity } = player.getEntitiesFromViewDirection({ maxDistance: 32, type: 'fec:the_enigma_bullet' });
    
        if (!entity) return;
        console.log("FLASH!")
        player.runCommand(`camera "${player.name}" fade time 0 2 1 color 0 110 207`)
    }*/
})