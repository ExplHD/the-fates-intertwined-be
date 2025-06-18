	import { system, world } from '@minecraft/server'
import { ActionFormData, MessageFormData } from '@minecraft/server-ui'

export function recipeUI(player) {
    let ui = new ActionFormData()
        .title("Select Tables")
        .body("Select the table that you want to browse")
        .button("Legendary Fabricator")
        .button("Shadow Bench")
        .button("Zenith Fabricator");

    ui.show(player).then(response => {
        if (response.cancelationReason === "UserBusy") {
            return system.runTimeout(() => {
                recipeUI(player);
            }, 10);
        }
        if (response.selection === undefined) return;
        switch (response.selection) {
            case 0:
                legendaryFabricator(player);
                break;
            case 1:
                shadowBench(player);
                break;
            case 2:
                player.sendMessage("Find Zenith Fabricator Altar that is spread throughout the world. In the structure, you will find the guidebook about the recipe for crafting Zenith.");
                break;
        }
    });
}

export function legendaryFabricator(player) {
    let ui = new ActionFormData()
        .title("Select Item")
        .body("Select the item :")
        .button("Winterbloom Weeping Keris")
        .button("Rage of Sakura")
        .button("Murasama Calamity")
        .button("Spear of Heart")
        .button("Yamato")
        .button("Legionnaire Medalion")
        .button("Stardust Armor Set")
        .button("Tenacity")
        .button("Awakened Stars")
    ui.show(player).then((r) => {
        if (r.canceled || r.selection === undefined) recipeUI(player);
        if (r.selection == 0) winterbloomSword(player);
        if (r.selection == 1) rageOfSakura(player);
        if (r.selection == 2) murasamaCalamity(player);
        if (r.selection == 3) spearOfHeart(player);
        if (r.selection == 4) yamato(player);
        if (r.selection == 5) legionnaireMedalion(player);
        if (r.selection == 6) stardustArmor(player);
        if (r.selection == 7) tenacity(player);
        if (r.selection == 8) awakenedStars(player);
    })
}

export function winterbloomSword(player) {
    const winterbloomSword = new MessageFormData();
    winterbloomSword.title("Winterbloom Weeping Keris");
    winterbloomSword.body("Recipe that you need :\n\n1 Winterbloom Medalion\n1 Netherite Sword\n1 Pink Petals");
    winterbloomSword.button1("Exit");
    winterbloomSword.button2("Back");
    winterbloomSword.show(player).then((r) => {
        if (r.canceled || r.selection === undefined || r.selection == 0) return;
        if (r.selection == 1) legendaryFabricator(player);
    })
}

export function rageOfSakura(player) {
    const winterbloomSword = new MessageFormData();
    winterbloomSword.title("Rage of Sakura");
    winterbloomSword.body("Recipe that you need :\n\n1 Loving Sakura Medalion\n1 Netherite Sword\n1 Redstone Dust");
    winterbloomSword.button1("Exit");
    winterbloomSword.button2("Back");
    winterbloomSword.show(player).then((r) => {
        if (r.canceled || r.selection === undefined || r.selection == 0) return;
        if (r.selection == 1) legendaryFabricator(player);
    })
}

export function murasamaCalamity(player) {
    const winterbloomSword = new MessageFormData();
    winterbloomSword.title("Winterbloom Weeping Keris");
    winterbloomSword.body("Recipe that you need :\n\n1 Lightning Tajador Medalion\n1 Netherite Sword\n1 Redstone Dust");
    winterbloomSword.button1("Exit");
    winterbloomSword.button2("Back");
    winterbloomSword.show(player).then((r) => {
        if (r.canceled || r.selection === undefined || r.selection == 0) return;
        if (r.selection == 1) legendaryFabricator(player);
    })
}

export function spearOfHeart(player) {
    const winterbloomSword = new MessageFormData();
    winterbloomSword.title("Spear of Heart");
    winterbloomSword.body("Recipe that you need :\n\n1 Land of Peace Medalion\n1 Netherite Sword\n1 Water Bucket");
    winterbloomSword.button1("Exit");
    winterbloomSword.button2("Back");
    winterbloomSword.show(player).then((r) => {
        if (r.canceled || r.selection === undefined || r.selection == 0) return;
        if (r.selection == 1) legendaryFabricator(player);
    })
}

export function tenacity(player) {
    const winterbloomSword = new MessageFormData();
    winterbloomSword.title("Tenacity");
    winterbloomSword.body("Recipe that you need :\n\n1 Weapon Billet\n1 Weapon Billet Nether\n1 Weapon Billet End\n1 Nether Star\n1 FReworked Tenacity\n1 Awakened Stars\n1 Winterbloom Tundra Keris\n1 The Enigma\n1 Eidolon 4 Staff : Water Sakura\nFor the pattern details, you can check the table");
    winterbloomSword.button1("Exit");
    winterbloomSword.button2("Back");
    winterbloomSword.show(player).then((r) => {
        if (r.canceled || r.selection === undefined || r.selection == 0) return;
        if (r.selection == 1) legendaryFabricator(player);
    })
}

export function legionnaireMedalion(player) {
    const winterbloomSword = new MessageFormData();
    winterbloomSword.title("Legionnaire Medalion");
    winterbloomSword.body("Recipe that you need :\n\n1 Nether Star\n1 Wind Essence\n1 Earth Essence\n1 Lightning Essence\n1 Fire Essence\nFor the pattern details, you can check the table");
    winterbloomSword.button1("Exit");
    winterbloomSword.button2("Back");
    winterbloomSword.show(player).then((r) => {
        if (r.canceled || r.selection === undefined || r.selection == 0) return;
        if (r.selection == 1) legendaryFabricator(player);
    })
}

export function awakenedStars(player) {
    const winterbloomSword = new MessageFormData();
    winterbloomSword.title("Awakened Stars");
    winterbloomSword.body("Recipe that you need :\n\n8 Star Shard\n1 End Crystal");
    winterbloomSword.button1("Exit");
    winterbloomSword.button2("Back");
    winterbloomSword.show(player).then((r) => {
        if (r.canceled || r.selection === undefined || r.selection == 0) return;
        if (r.selection == 1) legendaryFabricator(player);
    })
}

export function stardustArmor(player) {
    const winterbloomSword = new MessageFormData();
    winterbloomSword.title("Stardust Armor Set");
    winterbloomSword.body("Recipe that you need :\n\n1 Netherite Armor Piece\n1 Stardust Smithing Template\n1 Quartz\n1 Amethyst Shard (optional, for craft the invisible variant)");
    winterbloomSword.button1("Exit");
    winterbloomSword.button2("Back");
    winterbloomSword.show(player).then((r) => {
        if (r.canceled || r.selection === undefined || r.selection == 0) return;
        if (r.selection == 1) legendaryFabricator(player);
    })
}

export function yamato(player) {
    const winterbloomSword = new MessageFormData();
    winterbloomSword.title("Winterbloom Weeping Keris");
    winterbloomSword.body("Recipe that you need :\n\n1 Javanesia Medalion\n1 Netherite Sword\n1 Trident");
    winterbloomSword.button1("Exit");
    winterbloomSword.button2("Back");
    winterbloomSword.show(player).then((r) => {
        if (r.canceled || r.selection === undefined || r.selection == 0) return;
        if (r.selection == 1) legendaryFabricator(player);
    })
}

export function shadowBench(player) {
    const shadowBench = new ActionFormData();
    shadowBench.title("Select Crafting Mode");
    shadowBench.body("Select the table mode :");
    shadowBench.button("Shadow Revolver Crafting");
    shadowBench.button("Shadow Conversion");
    shadowBench.button("Material Reducer");
    shadowBench.show(player).then((r) => {
        if (r.canceled || r.selection === undefined) recipeUI(player);
        if (r.selection == 0) shadowBench1(player);
        if (r.selection == 1) shadowBench2(player);
        if (r.selection == 2) shadowBench3(player);
    })
}

export function shadowBench1(player) {
    const shadowBench1 = new MessageFormData();
    shadowBench1.title("Shadow Revolver");
    shadowBench1.body("Recipe that you need :\n\n1 Reworked Tenacity\n6Shadow Core\n1 Nether Star\nPLace them in the correct order");
    shadowBench1.button1("Exit");
    shadowBench1.button2("Back");
    shadowBench1.show(player).then((r) => {
        if (r.canceled || r.selection === undefined || r.selection == 0) return;
        if (r.selection == 1) shadowBench(player);
    })
}

export function shadowBench2(player) {
    const shadowBench1 = new MessageFormData();
    shadowBench1.title("Shadow Conversion");
    shadowBench1.body("Recipe List :\n\nShadow Corruption > Grass Block\nGrass Block > Shadow Corruption");
    shadowBench1.button1("Exit");
    shadowBench1.button2("Back");
    shadowBench1.show(player).then((r) => {
        if (r.canceled || r.selection === undefined || r.selection == 0) return;
        if (r.selection == 1) shadowBench(player);
    })
}

export function shadowBench3(player) {
    const shadowBench1 = new MessageFormData();
    shadowBench1.title("Shadow Conversion");
    shadowBench1.body("Recipe List :\n\nShadow Corruption > Curium");
    shadowBench1.button1("Exit");
    shadowBench1.button2("Back");
    shadowBench1.show(player).then((r) => {
        if (r.canceled || r.selection === undefined || r.selection == 0) return;
        if (r.selection == 1) shadowBench(player);
    })
}