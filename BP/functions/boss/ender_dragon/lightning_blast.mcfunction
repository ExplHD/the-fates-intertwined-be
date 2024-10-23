execute as @e[type=ender_dragon] at @e[r=256,type=enderman] run summon lightning_bolt ~~~
execute as @e[type=ender_dragon] at @e[r=256,type=enderman] run summon ender_crystal ~~~ 0 0 minecraft:crystal_explode
execute as @e[type=ender_dragon] at @e[r=256,type=enderman] run fill ~-5~~-5~5~~5 fire replace air
tellraw @a[r=256] {"rawtext":[{"text":"§d<Ender Dragon> Take This!"}]}
playsound mob.enderdragon.growl @a[r=256]