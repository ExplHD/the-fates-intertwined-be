	import { world, system } from '@minecraft/server'

export function shoot(typeId, power) {
    world.afterEvents.itemUse.subscribe(({ source, itemStack }) => {
        const launchVel = power;
        const velocity = source.getViewDirection();
        let headLoc = source.getHeadLocation();
        const arrow = source.dimension.spawnEntity(`${typeId}`, { x: headLoc.x + velocity.x, y: headLoc.y + velocity.y, z: headLoc.z + velocity.z });
        const projectileComp = arrow.getComponent('minecraft:projectile');
        projectileComp?.shoot({ x: velocity.x * launchVel, y: velocity.y * launchVel, z: velocity.z * launchVel });
    })
}

world.afterEvents.projectileHitBlock.subscribe((data) => {
    const projectile = data.projectile;
    const { x, y, z } = data.location;

    if (projectile?.typeId === "fec:thrown_lightning_essence") {
        data.dimension.runCommand(`summon lightning_bolt ${x} ${y} ${z}`)
        data.dimension.runCommand(`summon lightning_bolt ${x + 4} ${y} ${z}`)
        data.dimension.runCommand(`summon lightning_bolt ${x - 4} ${y} ${z}`)
        data.dimension.runCommand(`summon lightning_bolt ${x} ${y} ${z + 4}`)
        data.dimension.runCommand(`summon lightning_bolt ${x} ${y} ${z - 4}`)
    }
})