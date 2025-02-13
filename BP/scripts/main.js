import { system, world } from '@minecraft/server'
import { ActionFormData, MessageFormData } from '@minecraft/server-ui'
import { } from './items/items_custom_components'
import { } from './items/boss_summon'
import { } from './items/attachables_effect'
import { } from './items/custom_function'
import { } from './blocks/baseComponent'
import { } from './blocks/legendary_fabricator'
import { } from './blocks/zenith_fabricator'
import { } from './blocks/shadow_bench'
import { } from './passive/class_passive'
import { } from './passive/weapons'
import { } from './statistics/statistics_runner'
import { } from './statistics/statistics_check'
import { recipeUI, legendaryFabricator, shadowBench, winterbloomSword, rageOfSakura, murasamaCalamity, spearOfHeart, legionnaireMedalion, stardustArmor, shadowBench1, shadowBench2, shadowBench3 } from 'recipe.js'

// General Functions
export function addScore(target, objective, score) {
    try {
        world.scoreboard.getObjective(objective).addScore(target, score)
    } catch (e) {
        target.runCommandAsync(`scoreboard players add "${target.name}" ${objective} ${score}`)
    }
}

export function removeScore(target, objective, score) {
    try {
        world.scoreboard.getObjective(objective).addScore(target, score)
    } catch (e) {
        target.runCommandAsync(`scoreboard players remove "${target.name}" ${objective} ${score}`)
    }
}

export function setScore(target, objective, score) {
    try {
        world.scoreboard.getObjective(objective).setScore(target, score)
    } catch (e) {
        target.runCommandAsync(`scoreboard players set "${target.name}" ${objective} ${score}`)
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

// Detects an Item Use
world.afterEvents.itemUse.subscribe((starting) => {
    const player = starting.source

    if (player.hasTag("class_selected") && starting.itemStack.typeId === 'minecraft:nether_star') {
        const soundOpt = {
            location: player.location,
            volume: 1,
            pitch: 1
        }
        player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cRemoving all of your Impurity"}]}`);
        player.runCommandAsync(`particle fec:paranoia ~~~`);
        player.runCommandAsync(`tag @s remove class_selected`);
        player.runCommandAsync(`tag @s remove joined`);
        player.runCommandAsync(`tag @s remove speed_ranger`);
        player.runCommandAsync(`tag @s remove healer`);
        player.runCommandAsync(`tag @s remove initiator`);
        player.runCommandAsync(`tag @s remove penetrator`);
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
            player.runCommandAsync(`give "${player.name}" fec:winterbloom_medal`);
            player.runCommandAsync(`give "${player.name}" bow`);
            player.runCommandAsync(`give "${player.name}" arrow 32`);
            player.runCommandAsync(`give "${player.name}" cooked_beef 32`);
            player.addTag('class_selected');
            player.addTag('speed_ranger');
            player.runCommandAsync(`give "${player.name}" compass`);
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
            player.runCommandAsync(`give "${player.name}" fec:loving_sakura_medal`);
            player.runCommandAsync(`give "${player.name}" wooden_sword`);
            player.runCommandAsync(`give "${player.name}" bread 32`);
            player.runCommandAsync(`give "${player.name}" leather_helmet 1`);
            player.runCommandAsync(`give "${player.name}" leather_chestplate 1`);
            player.runCommandAsync(`give "${player.name}" leather_leggings 1`);
            player.runCommandAsync(`give "${player.name}" leather_boots 1`);
            player.addTag('class_selected');
            player.addTag('healer');
            player.runCommandAsync(`give "${player.name}" compass`);
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
            player.runCommandAsync(`give "${player.name}" fec:murasama_medal`)
            player.runCommandAsync(`give "${player.name}" stone_sword`);
            player.runCommandAsync(`give "${player.name}" bread 16`);
            player.runCommandAsync(`give "${player.name}" leather_helmet 1`);
            player.runCommandAsync(`give "${player.name}" chainmail_chestplate 1`);
            player.runCommandAsync(`give "${player.name}" leather_leggings 1`);
            player.runCommandAsync(`give "${player.name}" leather_boots 1`);
            player.addTag('class_selected');
            player.addTag('initiator');
            player.runCommandAsync(`give "${player.name}" compass`);
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
            player.runCommandAsync(`give "${player.name}" fec:land_of_peace_medal`)
            player.runCommandAsync(`give "${player.name}" wooden_sword`);
            player.runCommandAsync(`give "${player.name}" bread 16`);
            player.runCommandAsync(`give "${player.name}" chainmail_helmet 1`);
            player.runCommandAsync(`give "${player.name}" chainmail_chestplate 1`);
            player.runCommandAsync(`give "${player.name}" chainmail_leggings 1`);
            player.runCommandAsync(`give "${player.name}" chainmail_boots 1`);
            player.addTag('class_selected');
            player.addTag('penetrator');
            player.runCommandAsync(`give "${player.name}" compass`);
            player.addTag('joined');
        }
    })
}

world.afterEvents.playerSpawn.subscribe(async ({ player, initialSpawn }) => {
    if (!initialSpawn) { return } else {
        player.sendMessage("Use .help to search for Fates Command,");
        player.sendMessage("use .recipe to browse recipe that not on crafting table,");
        player.sendMessage("and use .reset_bug if you have trouble using the legendary weapon");
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
        case '.help':
            commandData.cancel = true;
            player.sendMessage(`.help - For command list`);
            player.sendMessage(`.recipe - For showing recipes from The Fates Intertwined from the outside the crafting tables, like Legendary Fabricator, or Zenith Fabricator`);
            player.sendMessage(`.reset_bug - For fixing bugs caused by Legendary Weapons`);
            player.sendMessage(`.statistic check - Used to check the statistics like Blocks traveled, Attacks with Legendary Weapons, etc`);
            player.sendMessage(`.reset_leaderboard (Needs Admin Permission) - For Reset the Leaderboards, useful for server`);
            break;
        case '.recipe':
            commandData.cancel = true;
            player.sendMessage(`Close the chat UI to open the crafting UI.`);
            system.run(() => {
                recipeUI(player);
            });
            break;
        case '.reset_bug':
            commandData.cancel = true;
            player.runCommandAsync('function reset_bug');
            player.sendMessage(`Bugs caused by Legendary Weapons is fixed`);
            break;
        case '.statistic check':
            commandData.cancel = true;
            player.sendMessage(`Now this command is retired, the command is moved into the Compass Item, after selecting the class`)
            break;
        case '.reset_leaderboard':
            commandData.cancel = true;
            if (!players.hasTag('fatesadmin')) players.sendMessage(`You do not have the permission for this command, Add tag "fatesadmin" first before you using the command`);
            else {
                player.runCommandAsync('function reset_leaderboard');
                player.sendMessage(`The Leaderboards has beed reseted`);
            }
            break;
        default: break;
    }
})
