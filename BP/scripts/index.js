// Do not claim this as your own property of Verdant Studios © 
// Verdant Studios Discord Server: ADDING SOON

// We here at Verdant Studios allow people to look at our code and learn off of it. 
// By claiming this as your own you're allowing us to Cease and Desist you.

import {
  world,
  system,
  ItemStack,
  ItemTypes,
  DynamicPropertiesDefinition,
  CommandPermissionLevel,
  CustomCommandStatus,
  ModalFormData,
  MessageFormData,
  CustomCommandParamType
} from "@minecraft/server";

import { transferPlayer } from "@minecraft/server-admin";

// Store server list per player using dynamic property
world.beforeEvents.worldInitialize.subscribe((event) => {
  const def = new DynamicPropertiesDefinition();
  def.defineString("savedServers", 10000); // JSON string
  event.propertyRegistry.registerEntityTypeDynamicProperties(def, "minecraft:player");
});

// Register /verdant:join and /verdant:menu
system.beforeEvents.startup.subscribe((init) => {
  init.customCommandRegistry.registerCommand({
    name: "verdant:join",
    description: "Transfer to another server using IP and port.",
    permissionLevel: CommandPermissionLevel.Any,
    mandatoryParameters: [
      { type: CustomCommandParamType.String, name: "ip" }
    ],
    optionalParameters: [
      { type: CustomCommandParamType.Integer, name: "port" }
    ]
  }, joinCommand);

  init.customCommandRegistry.registerCommand({
    name: "verdant:menu",
    description: "Open the Verdant server menu.",
    permissionLevel: CommandPermissionLevel.Any,
    mandatoryParameters: [],
    optionalParameters: []
  }, openMainMenu);
});

// /verdant:join logic
function joinCommand(origin, ip, port) {
  if (port === undefined) port = 19132;
  world.sendMessage("§l§f» §7+1 Transfer");
  system.run(() => {
    transferPlayer(origin.sourceEntity, { hostname: ip, port });
  });
  return { status: CustomCommandStatus.Success };
}

// Right-click to open menu
world.afterEvents.itemUse.subscribe(({ itemStack, source: player }) => {
  if (itemStack.nameTag === "§aVerdant Menu §7(Right Click)") {
    openMainMenu({ sourceEntity: player });
  }
});

// Main menu
function openMainMenu(origin) {
  const player = origin.sourceEntity;
  if (!player) return { status: CustomCommandStatus.Failed };

  const form = new ModalFormData()
    .title("Verdant Server Menu")
    .button("Sponsored Servers")
    .button("My Saved Servers")
    .button("Add New Server");

  form.show(player).then((response) => {
    if (response.canceled) return;
    const choice = response.formValues[0];
    if (choice === 0) return openSponsoredMenu(player);
    if (choice === 1) return openSavedServers(player);
    if (choice === 2) return addNewServer(player);
  });

  return { status: CustomCommandStatus.Success };
}

// Sponsored servers list
function openSponsoredMenu(player) {
  const form = new ModalFormData()
    .title("Sponsored Servers")
    .button("The Hive", "textures/ui/Hive.png")
    .button("Lifeboat", "textures/ui/Life.png")
    .button("CubeCraft", "textures/ui/Cube.png")
    .button("Segamc", "textures/ui/Sega.png")
    .button("Zeqa", "textures/ui/Zeqa.png");

  form.show(player).then((response) => {
    if (response.canceled) return;
    const index = response.formValues[0];
    switch (index) {
      case 0: return connect(player, "geo.hivebedrock.network", 19132);
      case 1: return connect(player, "play.lbsg.net", 19132);
      case 2: return connect(player, "play.cubecraft.net", 19132);
      case 3: return connect(player, "segamc.net", 19132);
      case 4: return connect(player, "zeqa.net", 19132);
    }
  });
}

// Add new server and save it
function addNewServer(player) {
  const form = new ModalFormData()
    .title("Add New Server")
    .textField("Server IP", "example.aternos.me")
    .textField("Port (default 19132)", "19132");

  form.show(player).then((response) => {
    if (response.canceled) return;
    const ip = response.formValues[0];
    let port = parseInt(response.formValues[1]) || 19132;

    if (!ip) {
      player.sendMessage("§cInvalid IP.");
      return;
    }

    let list = JSON.parse(player.getDynamicProperty("savedServers") || "[]");
    list.push({ ip, port });
    player.setDynamicProperty("savedServers", JSON.stringify(list));
    player.sendMessage(`§aSaved server §f${ip}:${port}`);
  });
}

// Show saved servers and connect on click
function openSavedServers(player) {
  const list = JSON.parse(player.getDynamicProperty("savedServers") || "[]");

  if (list.length === 0) {
    player.sendMessage("§7You have no saved servers.");
    return;
  }

  const form = new ModalFormData().title("My Saved Servers");
  list.forEach((s) => form.button(`${s.ip}:${s.port}`));

  form.show(player).then((response) => {
    if (response.canceled) return;
    const selected = list[response.formValues[0]];
    connect(player, selected.ip, selected.port);
  });
}

// Transfer player to server
function connect(player, ip, port) {
  player.sendMessage(`§aConnecting to §f${ip}:${port}`);
  system.run(() => {
    transferPlayer(player, { hostname: ip, port });
  });
}
