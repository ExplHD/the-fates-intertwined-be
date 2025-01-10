import { system, world } from '@minecraft/server'
import { ActionFormData, MessageFormData, ModalFormData } from '@minecraft/server-ui'
import { addScore, removeScore, setScore, getScore } from 'main.js'

world.afterEvents.itemUse.subscribe((use) => {
    const player = use.source
    const item = use.itemStack

    if (player.hasTag("class_selected") && item.typeId === 'minecraft:compass') statisticSelect(player);

    // Function UI
    function statisticSelect() {
        let statisticSelect = new ActionFormData;
        statisticSelect.title("Statistics Checker");
        statisticSelect.body("");
        statisticSelect.button("Check Your Statistics");
        statisticSelect.button("Check Other Statistics (BETA)");
        statisticSelect.button("Statistics Preference");
        statisticSelect.show(player).then(r => {
            if (r.canceled || r.selection === undefined) { };
            if (r.selection == 0) statisticCheck(player);
            if (r.selection == 1) statisticPlayer(player);
            if (r.selection == 2) statisticSettings(player);
        })
    }

    function statisticCheck() {
        let statisticCheck = new ActionFormData;
        let death = getScore(player, 'deathCounter');
        let jump = getScore(player, 'jumpCounter');
        let move = getScore(player, 'moveCounter');
        let legendatk = getScore(player, 'legendCounter');
        let atk = getScore(player, 'atkCounter');
        let placed = getScore(player, 'placeBlockCounter');
        let destroyed = getScore(player, 'breakBlockCounter');
        let itemInteract = getScore(player, 'itemInteractCounter');
        let kill = getScore(player, 'killCounter');
        statisticCheck.title("Your Statistics");
        statisticCheck.body(`Death : ${death}
Jumps : ${jump}
Blocks Traveled : ${move}
Attack with Legendary Item : ${legendatk}
Attack : ${atk}
Blocks Placed : ${placed}
Blocks Destroyed : ${destroyed}
Item Interaction : ${itemInteract}
Players Killed : ${kill}`);
        statisticCheck.button("Exit")
        statisticCheck.show(player).then(r => {
            if (r.canceled) statisticSelect(player);
            if (r.selection == 0) statisticSelect(player);
        })
    }

    function statisticPlayer() {
        const form = new ModalFormData();
        const playerNames = world.getAllPlayers().map(p => p.name)
        form.title('Select Players');
        form.dropdown('\nSelect The Player!', playerNames);
        form.show(player).then(result => {
            if (result.canceled) statisticPlayer(player);
            const targetName = playerNames[result.formValues[0]]
            statisticCheck(targetName.name)
        })
    }

    function statisticSettings() {
        const statisticSettings = new ModalFormData();
        statisticSettings.title("Statistics Settings");
        statisticSettings.toggle("Toggle Statistics Notification\n§7Toggle Notification being updated in actionbar", player.getDynamicProperty("fec:statistic_notification"));
        statisticSettings.toggle("Toggle Hit Health Remaining\n§7Toggle health indicator after hitting an entity", player.getDynamicProperty("fec:statistic_health_remaining"));
        statisticSettings.toggle("Toggle Where the Hit From\n§7Toggle where you have been hit, and your remaining HP", player.getDynamicProperty("fec:statistic_where_to_hit"));
        statisticSettings.show(player).then(r => {
            if (r.canceled) statisticSelect(player);
            if (r.formValues[0] == true) {
                player.setDynamicProperty("fec:statistic_notification", true);
            } else {
                player.setDynamicProperty("fec:statistic_notification", false);
            } if (r.formValues[1] == true) {
                player.setDynamicProperty("fec:statistic_health_remaining", true);
            } else {
                player.setDynamicProperty("fec:statistic_health_remaining", false);
            } if (r.formValues[2] == true) {
                player.setDynamicProperty("fec:statistic_where_to_hit", true);
            } else {
                player.setDynamicProperty("fec:statistic_where_to_hit", false);
            }
        })
    }
})