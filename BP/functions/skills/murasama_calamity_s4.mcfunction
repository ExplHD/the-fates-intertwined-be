execute at @e[type=fec:murasama_expansion] run particle fec:murasama_calamity_skill_3_sphere ~~~
execute as @e[type=fec:murasama_expansion] at @s run damage @a[tag=murasama_expansion,rm=32,r=128] 8 void
execute as @e[type=fec:murasama_expansion] at @s run damage @a[tag=!murasama_expansion,r=32] 2 entity_attack
execute as @e[type=fec:murasama_expansion] at @s run scoreboard players set @a[r=32] murasama_calamity_c4 0
scoreboard objectives add murasama_expansion dummy
scoreboard players add @a[tag=murasama_expansion] murasama_expansion 1
scoreboard players add @a[tag=murasama_expansion,hasitem={item=fec:murasama_calamity,location=slot.weapon.mainhand}] voltra_charge 1
execute at @a[tag=murasama_expansion] if entity @a[tag=murasama_expansion,scores={murasama_expansion=1199}] run event entity @e[type=fec:murasama_expansion] despawn
execute at @a[tag=murasama_expansion] if entity @a[tag=murasama_expansion,scores={murasama_expansion=1200}] run scoreboard players reset @a murasama_expansion
execute at @a[tag=murasama_expansion] if entity @a[tag=murasama_expansion,scores={murasama_expansion=1199}] run tag @a remove murasama_expansion
execute at @a[tag=murasama_expansion] if entity @a[tag=murasama_expansion,m=!0] run event entity @e[type=fec:murasama_expansion] despawn
execute at @a[tag=murasama_expansion] if entity @a[tag=murasama_expansion,m=!0] run scoreboard players reset @a murasama_expansion
execute at @a[tag=murasama_expansion] if entity @a[tag=murasama_expansion,m=!0] run tag @a remove murasama_expansion