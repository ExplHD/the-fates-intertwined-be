import { system, world, CustomCommandStatus } from '@minecraft/server'
import { ActionFormData, MessageFormData, ModalFormData } from '@minecraft/server-ui'
import { addScore, removeScore, setScore, getScore } from 'main.js'

export function statisticSelect(origin) {
    const player = origin.sourceEntity;
    if (!player) return { status: CustomCommandStatus.Failed };
    let statisticSelect = new ActionFormData;
    statisticSelect.title("Statistics Checker");
    statisticSelect.body("");
    statisticSelect.button("Check Your Statistics");
    statisticSelect.button("Check Other Statistics (BETA)");
    statisticSelect.button("Statistics Preference");
    system.run(() => {
        statisticSelect.show(player || origin).then(r => {
            if (r.canceled || r.selection === undefined) { };
            if (r.selection == 0) return statisticCheck(player);
            if (r.selection == 1) return statisticPlayer(player);
            if (r.selection == 2) return statisticSettings(player);
        })
    })
}

export function statisticCheck(origin) {
    const player = origin.sourceEntity;
    let statisticCheck = new ActionFormData;
    let death = getScore(origin, 'deathCounter');
    let jump = getScore(origin, 'jumpCounter');
    let move = getScore(origin, 'moveCounter');
    let legendatk = getScore(origin, 'legendCounter');
    let atk = getScore(origin, 'atkCounter');
    let placed = getScore(origin, 'placeBlockCounter');
    let destroyed = getScore(origin, 'breakBlockCounter');
    let itemInteract = getScore(origin, 'itemInteractCounter');
    let kill = getScore(origin, 'killCounter');
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
    system.run(() => {
        statisticCheck.show(origin).then(r => {
            if (r.canceled) return statisticSelect(player);
            if (r.selection == 0) return statisticSelect(player);
        })
    })
}

export function statisticPlayer(origin) {
    const player = origin.sourceEntity;
    const form = new ModalFormData();
    const playerNames = world.getAllPlayers().map(p => p.name)
    form.title('Select Players');
    form.dropdown('\nSelect The Player!', playerNames);
    system.run(() => {
        form.show(origin).then(result => {
            if (result.canceled) return statisticSelect(player);
            const targetName = playerNames[result.formValues[0]]
            statisticCheck(targetName)
        })
    })
}

export function statisticSettings(origin) {
    const player = origin.sourceEntity;
    const statisticSettings = new ModalFormData();
    statisticSettings.title("Statistics Settings");
    statisticSettings.toggle("Toggle Statistics Notification\n§7Toggle Notification being updated in actionbar", { defaultValue: origin.getDynamicProperty("fec:statistic_notification") });
    statisticSettings.toggle("Toggle Hit Health Remaining\n§7Toggle health indicator after hitting an entity", { defaultValue: origin.getDynamicProperty("fec:statistic_health_remaining") });
    statisticSettings.toggle("Toggle Where the Hit From\n§7Toggle where you have been hit, and your remaining HP", { defaultValue: origin.getDynamicProperty("fec:statistic_where_to_hit") });
    system.run(() => {
        statisticSettings.show(player || origin).then(r => {
            if (r.canceled) statisticSelect(player);
            if (r.formValues[0] == true) {
                origin.setDynamicProperty("fec:statistic_notification", true);
            } else {
                origin.setDynamicProperty("fec:statistic_notification", false);
            } if (r.formValues[1] == true) {
                origin.setDynamicProperty("fec:statistic_health_remaining", true);
            } else {
                origin.setDynamicProperty("fec:statistic_health_remaining", false);
            } if (r.formValues[2] == true) {
                origin.setDynamicProperty("fec:statistic_where_to_hit", true);
            } else {
                origin.setDynamicProperty("fec:statistic_where_to_hit", false);
            }
        })
    })
}