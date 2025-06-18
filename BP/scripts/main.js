import { system, world, CommandPermissionLevel, CustomCommandParamType, CustomCommandStatus } from '@minecraft/server'
import { ActionFormData, MessageFormData } from '@minecraft/server-ui'
import { } from './items/items_custom_components'
import { } from './items/boss_summon'
import { } from './items/attachables_effect'
import { } from './items/custom_function'
import { } from './blocks/baseComponent'
import { } from './blocks/legendary_fabricator'
import { } from './blocks/zenith_fabricator'
import { } from './blocks/shadow_bench'
import { } from './blocks/stars_altar'
import { } from './entity/stars_boss'
import { } from './passive/class_passive'
import { } from './passive/weapons'
import { } from './passive/food_regen'
import { } from './statistics/statistics_runner'
import { statisticSelect, statisticCheck, statisticPlayer, statisticSettings } from './statistics/statistics_check'
import { } from './statistics/statistics_check_compass'
import { recipeUI, legendaryFabricator, shadowBench, winterbloomSword, rageOfSakura, murasamaCalamity, spearOfHeart, legionnaireMedalion, stardustArmor, shadowBench1, shadowBench2, shadowBench3 } from 'recipe.js'

// General Functions
export function addScore(target, objective, score) {
    try {
        world.scoreboard.getObjective(objective).addScore(target, score)
    } catch (e) {
        target.runCommand(`scoreboard players add "${target.name}" ${objective} ${score}`)
    }
}

export function removeScore(target, objective, score) {
    try {
        world.scoreboard.getObjective(objective).addScore(target, score)
    } catch (e) {
        target.runCommand(`scoreboard players remove "${target.name}" ${objective} ${score}`)
    }
}

export function setScore(target, objective, score) {
    try {
        world.scoreboard.getObjective(objective).setScore(target, score)
    } catch (e) {
        target.runCommand(`scoreboard players set "${target.name}" ${objective} ${score}`)
    }
}

export function getScore(target, objective) {
    try {
        return world.scoreboard.getObjective(objective).getScore(target)
    } catch (error) {
        return 0;
    }
}

export function wait(time) {
    return new Promise((resolve) => {
        const waitTimeout = system.runTimeout(() => {
            system.clearRun(waitTimeout);
            resolve();
        }, time)
    })
}

let lastTime = Date.now();
let TPS = 0
let tickCount = 0;

function updateTPS() {
    let currentTime = Date.now();
    let currentTick = system.currentTick;

    // Calculate real-world time difference in seconds
    let timeDifferenceInSeconds = (currentTime - lastTime) / 1000;

    // Calculate TPS (ticks per second)
    let tps = tickCount / timeDifferenceInSeconds;

    // Reset the tick count and update the last tick time
    tickCount = 0;
    lastTime = currentTime;

    // Update TPS Global variable according to tps local variable
    TPS = tps
}

function tickHandler() {
    tickCount++; // Increment tick count for each tick

    if (tickCount % 20 === 0) {
        updateTPS(); // Update TPS calculation and logging every 20 ticks
    }
}

// Register the tickHandler function to be called every 1 tick
system.runInterval(tickHandler, 1);

// Detects an Item Use
world.afterEvents.itemUse.subscribe((starting) => {
    const player = starting.source

    if (player.hasTag("class_selected") && starting.itemStack.typeId === 'minecraft:nether_star') {
        const soundOpt = {
            location: player.location,
            volume: 1,
            pitch: 1
        }
        player.runCommand(`tellraw @s {"rawtext":[{"text":"§cRemoving all of your Impurity"}]}`);
        player.runCommand(`particle fec:paranoia ~~~`);
        player.runCommand(`tag @s remove class_selected`);
        player.runCommand(`tag @s remove joined`);
        player.runCommand(`tag @s remove speed_ranger`);
        player.runCommand(`tag @s remove healer`);
        player.runCommand(`tag @s remove initiator`);
        player.runCommand(`tag @s remove penetrator`);
        player.playSound("random.toast", soundOpt);
        classForm(player)
    }
});

// UI Functions 
// Class Forms
function classForm(player) {
    let classForms = new ActionFormData;
    classForms.title("Select Your Class");
    classForms.body(`${player.name}, Select your class here to start your journey, every class have different perks to differentiate starting gear`);
    classForms.button("The Speed Ranger", "textures/items/medals/winterbloom_medal");
    classForms.button("The Healer Mage", "textures/items/medals/loving_sakura_medal");
    classForms.button("The Melee Initiator", "textures/items/medals/lightning_phoenix_medal");
    classForms.button("The Heavy Penetrator", "textures/items/medals/land_of_peace_medal");

    classForms.show(player).then(r => {
        if (r.canceled || r.selection === undefined) return classForm(player)
        if (r.selection == 0) speedRanger(player);
        if (r.selection == 1) healerMage(player);
        if (r.selection == 2) meleeInitiator(player);
        if (r.selection == 3) heavyPenetrator(player);
    })
}

function speedRanger(player) {
    let speedRanger = new MessageFormData;
    speedRanger.title("Confirmation");
    speedRanger.body("Are you sure you want to select Speed Ranger? You cannot change until you use Nether Star\n This Class have :\n\n Perks : Improved Speed (Dashes with Feather)\n You will receive :\n  1 Bow\n  32 Arrow\n  32 Steak\n  1 Exclusive Medalion (Winterbloom)");
    speedRanger.button1("No, Let me think again");
    speedRanger.button2("Yes, Sure");

    speedRanger.show(player).then(r => {
        if (r.canceled || r.selection === undefined || r.selection === 0) classForm(player);
        if (r.selection === 1) {
            player.sendMessage(`Class Selected, You cannot change change class again until you have a Nether Star`);
            player.runCommand(`give "${player.name}" fec:winterbloom_medal`);
            player.runCommand(`give "${player.name}" bow`);
            player.runCommand(`give "${player.name}" arrow 32`);
            player.runCommand(`give "${player.name}" cooked_beef 32`);
            player.addTag('class_selected');
            player.addTag('speed_ranger');
            player.runCommand(`give "${player.name}" compass`);
            player.addTag('joined');
        }
    })
}

function healerMage(player) {
    let healerMage = new MessageFormData;
    healerMage.title("Confirmation");
    healerMage.body("Are you sure you want to select Healer Mage?\nThis class have :\n Perks : Improved Healing (Healing Aura when hit, Cooldown 8 Second)\n\n This Class have :\n  1 Wooden Sword\n  1 Leather Armor Set\n  32 Bread\n  1 Exclusive Medalion (Loving Sakura)");
    healerMage.button1("No, Let me think again");
    healerMage.button2("Yes, Sure");

    healerMage.show(player).then(r => {
        if (r.canceled || r.selection === undefined || r.selection === 0) classForm(player);
        if (r.selection === 1) {
            player.sendMessage(`Class Selected, You cannot change change class again until you have a Nether Star`);
            player.runCommand(`give "${player.name}" fec:loving_sakura_medal`);
            player.runCommand(`give "${player.name}" wooden_sword`);
            player.runCommand(`give "${player.name}" bread 32`);
            player.runCommand(`give "${player.name}" leather_helmet 1`);
            player.runCommand(`give "${player.name}" leather_chestplate 1`);
            player.runCommand(`give "${player.name}" leather_leggings 1`);
            player.runCommand(`give "${player.name}" leather_boots 1`);
            player.addTag('class_selected');
            player.addTag('healer');
            player.runCommand(`give "${player.name}" compass`);
            player.addTag('joined');
        }
    })
}

function meleeInitiator(player) {
    let meleeInitiator = new MessageFormData;
    meleeInitiator.title("Confirmation");
    meleeInitiator.body("Are you sure you want to select Melee Initiator?\nThis class have :\n Perks : Initiator Strike (Increased damage when entering combat)\n\n This Class have :\n  1 Stone Sword\n  1 Chainmail with Leather Armor Set\n  16 Steak\n  1 Exclusive Medalion (Lightning Tajador)");
    meleeInitiator.button1("No, Let me think again");
    meleeInitiator.button2("Yes, Sure");
    meleeInitiator.show(player).then(r => {
        if (r.canceled || r.selection === undefined || r.selection === 0) classForm(player);
        if (r.selection === 1) {
            player.sendMessage(`Class Selected, You cannot change change class again until you have a Nether Star`);
            player.runCommand(`give "${player.name}" fec:murasama_medal`)
            player.runCommand(`give "${player.name}" stone_sword`);
            player.runCommand(`give "${player.name}" bread 16`);
            player.runCommand(`give "${player.name}" leather_helmet 1`);
            player.runCommand(`give "${player.name}" chainmail_chestplate 1`);
            player.runCommand(`give "${player.name}" leather_leggings 1`);
            player.runCommand(`give "${player.name}" leather_boots 1`);
            player.addTag('class_selected');
            player.addTag('initiator');
            player.runCommand(`give "${player.name}" compass`);
            player.addTag('joined');
        }
    })
}

function heavyPenetrator(player) {
    let heavyPenetrator = new MessageFormData;
    heavyPenetrator.title("Confirmation");
    heavyPenetrator.body("Are you sure you want to select Heavy Penetrator?\nThis class have :\n Perks : Brute Windforce (Massive knockbacks and Armor Penetrating Damage with cooldown for 5 Seconds)\n\n This Class have :\n  1 Wooden Sword\n 1 Chainmail Armor Set\n  16 Steak\n  1 Exclusive Medalion (Land of Peace)");
    heavyPenetrator.button1("No, Let me think again");
    heavyPenetrator.button2("Yes, Sure");
    heavyPenetrator.show(player).then(r => {
        if (r.canceled || r.selection === undefined || r.selection === 0) classForm(player);
        if (r.selection === 1) {
            player.sendMessage(`Class Selected, You cannot change change class again until you have a Nether Star`);
            player.runCommand(`give "${player.name}" fec:land_of_peace_medal`)
            player.runCommand(`give "${player.name}" wooden_sword`);
            player.runCommand(`give "${player.name}" bread 16`);
            player.runCommand(`give "${player.name}" chainmail_helmet 1`);
            player.runCommand(`give "${player.name}" chainmail_chestplate 1`);
            player.runCommand(`give "${player.name}" chainmail_leggings 1`);
            player.runCommand(`give "${player.name}" chainmail_boots 1`);
            player.addTag('class_selected');
            player.addTag('penetrator');
            player.runCommand(`give "${player.name}" compass`);
            player.addTag('joined');
        }
    })
}

world.afterEvents.playerSpawn.subscribe(async ({ player, initialSpawn }) => {
    if (!initialSpawn) { return } else {
        player.sendMessage("Use ft.help to search for Fates Command,");
        player.sendMessage("use ft.recipe to browse recipe that not on crafting table,");
        player.sendMessage("and use ft.reset_bug if you have trouble using the legendary weapon");
    };
    await wait(100);
    if (!player.hasTag('joined')) {
        classForm(player);
        player.setDynamicProperty("fec:statistic_notification", true);
        player.setDynamicProperty("fec:statistic_health_remaining", true);
        player.setDynamicProperty("fec:statistic_where_to_hit", true);
        player.sendMessage("Recommended Settings to Run This Pack :");
        player.sendMessage("Simulation Distance : §e8 Chunks");
        player.sendMessage("Mob Grief : §cOFF (Optional, because the boss can break blocks too)");
    }
})

// Detects a chat, then turn it into commands
world.beforeEvents.chatSend.subscribe((commandData) => {
    const player = commandData.sender;
    switch (commandData.message) {
        case 'ft.help':
            commandData.cancel = true;
            player.sendMessage(`ft.help - For command list`);
            player.sendMessage(`ft.recipe - For showing recipes from The Fates Intertwined from the outside the crafting tables, like Legendary Fabricator, or Zenith Fabricator`);
            player.sendMessage(`ft.reset_bug - For fixing bugs caused by Legendary Weapons`);
            player.sendMessage(`ft.statistic check - Used to check the statistics like Blocks traveled, Attacks with Legendary Weapons, etc`);
            player.sendMessage(`ft.reset_leaderboard (Needs Admin Permission) - For Reset the Leaderboards, useful for server`);
            break;
        case 'ft.recipe':
            commandData.cancel = true;
            player.sendMessage(`Close the chat UI to open the crafting UI.`);
            system.run(() => {
                recipeUI(player);
            });
            break;
        case 'ft.reset_bug':
            commandData.cancel = true;
            system.run(() => {
                for (const player of world.getPlayers()) {
                    player.runCommand('function reset_bug');
                    player.sendMessage(`Bugs caused by Legendary Weapons is fixed`);
                }
            })
            break;
        case 'ft.statistic check':
            commandData.cancel = true;
            player.sendMessage(`Now this command is retired, the command is moved into the Compass Item, after selecting the class`)
            break;
        case 'ft.reset_leaderboard':
            commandData.cancel = true;
            if (!players.hasTag('fatesadmin')) players.sendMessage(`You do not have the permission for this command, Add tag "fatesadmin" first before you using the command`);
            else {
                player.runCommand('function reset_leaderboard');
                player.sendMessage(`The Leaderboards has beed reseted`);
            }
            break;
        case 'ft.tps':
            commandData.cancel = true;
            player.sendMessage(`Current Ticks per second is : ${TPS.toFixed(2)}`)
            break;
        default: break;
    }
})

// CUSTOM COMMANDS (literally)
system.beforeEvents.startup.subscribe((init) => {
    const help = {
        name: 'fec:help',
        description: 'For browsing Command List',
        permissionLevel: CommandPermissionLevel.Any
    }

    function helpReturn() {
        system.run(() => {
            for (const player of world.getPlayers()) {
                player.sendMessage(`/fec:help - For command list`);
                player.sendMessage(`/fec:recipe - For showing recipes from The Fates Intertwined from the outside the crafting tables, like Legendary Fabricator, or Zenith Fabricator`);
                player.sendMessage(`/fec:reset_bug - For fixing bugs caused by Legendary Weapons`);
                player.sendMessage(`/fec:statistic - Used to check the statistics like Blocks traveled, Attacks with Legendary Weapons, etc`);
                player.sendMessage(`/fec:reset_leaderboard (Needs Admin Permission) - For Reset the Leaderboards, useful for server`);
            }
        })
    }
    init.customCommandRegistry.registerCommand(help, helpReturn)

    const resetBug = {
        name: 'fec:reset_bug',
        description: 'fixing some fixable ingame bugs caused by Legendary Weapons',
        permissionLevel: CommandPermissionLevel.Any
    }

    function resetBugReturn() {
        system.run(() => {
            for (const player of world.getPlayers()) {
                player.runCommand('function reset_bug');
                player.sendMessage(`Bugs caused by Legendary Weapons is fixed`);
            }
        })
    }
    init.customCommandRegistry.registerCommand(resetBug, resetBugReturn)

    const tps = {
        name: 'fec:tps',
        description: 'Checks the server / world ticks per second performance',
        permissionLevel: CommandPermissionLevel.Any
    }

    function tpsReturn() {
        system.run(() => {
            for (const player of world.getPlayers()) {
                player.sendMessage(`Current Ticks per second is : ${TPS.toFixed(2)}`)
                console.log(`Current Ticks per second is : ${TPS.toFixed(2)}`)
            }
        })
    }
    init.customCommandRegistry.registerCommand(tps, tpsReturn)

    const statistic = {
        name: 'fec:statistic',
        description: 'Command to open the statistics UI, from checking, to setting the notification',
        permissionLevel: CommandPermissionLevel.Any,
        cheatsRequired: false
    }

    init.customCommandRegistry.registerCommand(statistic, statisticSelect)
})