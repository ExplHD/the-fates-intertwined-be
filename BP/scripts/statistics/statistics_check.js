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
        statisticSelect.button("Statistics Preference (BETA, Unavailable)");
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
        let kill = getScore(player, 'killCounter');
        statisticCheck.title("Your Statistics");
        statisticCheck.body(`Death : ${death}\nJumps : ${jump}\nBlocks Traveled : ${move}\nAttack with Legendary Item : ${legendatk}\nAttack : ${atk}\nBlocks Placed : ${placed}\nBlocks Destroyed : ${destroyed}\nPlayers Killed : ${kill}`);
        statisticCheck.button("Exit")
        statisticCheck.show(player).then(r => {
            if (r.canceled) statisticSelect(player);
            if (r.selection == 0) statisticSelect(player);
        })
    }

    function statisticPlayer() {
        let statisticPlayer = new ActionFormData;
        let playerDyn = world.getAllPlayers();
        statisticPlayer.title("Select Player");
        playerDyn.forEach((buttons) => {
            if (player.getDynamicProperty('hide_statistic')) null;
            else {
                statisticPlayer.button(`${player.name}`)
            }
        })
        statisticPlayer.show(player).then(({ selection, canceled }) => {
            if (canceled) return;
            statisticCheck(playerList[selection])
        })
    }

    function statisticSettings() {
        let statisticSettings = new ModalFormData();
    }
})