# Add Cooldown Objectives, since the script cannot run system.run everytime the world is loading
## Cooldown Second
scoreboard objectives add blade_of_the_end_c1 dummy
scoreboard objectives add blade_of_the_end_c2 dummy
scoreboard objectives add blade_of_the_end_c3 dummy
scoreboard objectives add blade_of_the_end_c4 dummy
scoreboard objectives add winterbloom_sword_c1 dummy
scoreboard objectives add winterbloom_sword_c2 dummy
scoreboard objectives add winterbloom_sword_c3 dummy
scoreboard objectives add rage_of_sakura_c1 dummy
scoreboard objectives add rage_of_sakura_c2 dummy
scoreboard objectives add rage_of_sakura_c3 dummy
scoreboard objectives add murasama_calamity_c1 dummy
scoreboard objectives add murasama_calamity_c2 dummy
scoreboard objectives add murasama_calamity_c3 dummy
scoreboard objectives add windblade_claymore_c1 dummy
scoreboard objectives add windblade_claymore_c2 dummy
scoreboard objectives add windblade_claymore_c3 dummy
scoreboard objectives add spear_of_heart_c1 dummy
scoreboard objectives add spear_of_heart_c2 dummy
scoreboard objectives add spear_of_heart_c3 dummy
scoreboard objectives add zenith_c1 dummy
scoreboard objectives add zenith_c2 dummy
scoreboard objectives add zenith_c3 dummy
scoreboard objectives add zenith_c4 dummy
scoreboard objectives add zenith_c5 dummy
scoreboard objectives add eidolon_4_staff_c1 dummy
scoreboard objectives add eidolon_4_staff_c2 dummy
scoreboard objectives add eidolon_4_staff_c3 dummy
scoreboard objectives add stars_and_crescent_c2 dummy
scoreboard objectives add stars_and_crescent_c3 dummy
scoreboard objectives add shadow_revolver_c1 dummy
scoreboard objectives add shadow_revolver_c2 dummy
scoreboard objectives add shadow_revolver_c3 dummy
scoreboard objectives add shadow_revolver_c4 dummy
scoreboard objectives add tenacity_c1 dummy
scoreboard objectives add tenacity_c2 dummy
scoreboard objectives add tenacity_c3 dummy
scoreboard objectives add tenacity_c4 dummy
scoreboard objectives add tenacity_c2_axe dummy
scoreboard objectives add tenacity_c3_axe dummy
scoreboard objectives add tenacity_c4_axe dummy
scoreboard objectives add reworked_tenacity_c1 dummy
scoreboard objectives add reworked_tenacity_c2 dummy
scoreboard objectives add reworked_tenacity_c3 dummy

## Cooldown Tick
scoreboard objectives add stars_and_crescent_c1 dummy
scoreboard objectives add atkp_delay dummy

## Cooldown (Charge Type)
scoreboard objectives add murasama_calamity_c4 dummy
scoreboard objectives add shadow_revolver_rounds dummy
scoreboard objectives add voltra_charge dummy
scoreboard objectives add winterbloom_sword_ultimate_charge dummy
scoreboard objectives add tenacity_c3_charge dummy

## Skill Switcher for Weapons
scoreboard objectives add winterbloom_sword dummy
scoreboard objectives add rage_of_sakura dummy
scoreboard objectives add murasama_calamity dummy
scoreboard objectives add spear_of_heart dummy
scoreboard objectives add blade_of_the_end dummy
scoreboard objectives add windblade_claymore dummy
scoreboard objectives add eidolon_4_staff dummy
scoreboard objectives add zenith dummy
scoreboard objectives add stars_and_crescent dummy
scoreboard objectives add shadow_revolver dummy
scoreboard objectives add mythic_tenacity dummy
scoreboard objectives add reworked_tenacity dummy

# Additional Projectile Trails
execute at @e[type=fec:dragon_fireball_gravitational] run particle minecraft:dragon_breath_trail ~~~
execute at @e[type=arrow] run particle minecraft:balloon_gas_particle ~~~
execute at @e[type=fireball] run particle minecraft:mobflame_single ~~~
execute at @e[type=small_fireball] run particle minecraft:mobflame_single ~~~

# Ender Dragon Phase 2 Tick
scoreboard objectives add ender_dragon_p2 dummy
scoreboard players add @e[tag=ender_dragon_p2] ender_dragon_p2 1
scoreboard players set @e[tag=ender_dragon_p2,scores={ender_dragon_p2=1801..}] ender_dragon_p2 0

## Idle Animation (for mythic)
scoreboard objectives add idle_timeout dummy
scoreboard players add @a[hasitem={item=fec:zenith,location=slot.weapon.mainhand}] idle_timeout 1
effect @e[hasitem={item=fec:zenith,location=slot.weapon.mainhand}] resistance 1 0 true
effect @e[hasitem={item=fec:stars_and_crescent,location=slot.weapon.mainhand}] speed 1 3 true
execute at @e[hasitem={item=fec:stars_and_crescent,location=slot.weapon.mainhand}] run particle fec:light_idle ~~~

# Class Cooldown Tick
scoreboard objectives add atk_cooldown dummy
scoreboard objectives add dash_cooldown dummy
scoreboard objectives add wind_essence dummy
scoreboard objectives add wind_essence_up dummy
scoreboard objectives add cdtick dummy
scoreboard players add @a cdtick 1
scoreboard players remove @a[scores={cdtick=20}] atk_cooldown 1
scoreboard players remove @a[scores={cdtick=20}] dash_cooldown 1
scoreboard players remove @a wind_essence 1
scoreboard players set @a[scores={atk_cooldown=..0}] atk_cooldown 0
scoreboard players set @a[scores={dash_cooldown=..0}] dash_cooldown 0
scoreboard players set @a[scores={wind_essence=..0}] wind_essence 0
scoreboard players set @a[scores={wind_essence_up=..0}] wind_essence_up 0
scoreboard players set @a[scores={cdtick=21..}] cdtick 0
effect @a[tag=speed_ranger] speed 1 1 true
titleraw @a[hasitem={item=fec:wind_essence,location=slot.weapon.mainhand}] actionbar {"rawtext":[{"text":"Cooldown : \nUpdraft : §e"},{"score":{"name":"*","objective":"wind_essence_up"}},{"text":"s§r\nDash Forward : §e"},{"score":{"name":"*","objective":"wind_essence"}},{"text":" Ticks"}]}
titleraw @a[hasitem={item=feather,location=slot.weapon.mainhand},tag=speed_ranger] actionbar {"rawtext":[{"text":"Cooldown : §e"},{"score":{"name":"*","objective":"dash_cooldown"}},{"text":"s"}]}

# Entity Runtime
execute as @e[type=fec:eidolon_4_pillar] at @s run tp @s ^^^1
execute as @e[type=fec:eidolon_4_pillar] at @s run damage @e[type=!fec:eidolon_4_pillar,r=3,tag=!eidolon_iframe] 20 entity_attack entity @s
execute at @e[type=fec:eidolon_4_pillar] run particle fec:eidolon_4_pillar ~~~
execute as @e[type=fec:crescent_pillar] at @s run tp @s ^^^1 ~5 0
execute as @e[type=fec:crescent_pillar] at @s run damage @e[type=!fec:crescent_pillar,r=3] 15 entity_attack entity @s
execute at @e[type=fec:crescent_pillar] run particle fec:crescent_pillar ~~~
execute as @e[type=fec:zenith_base] at @s run tp @s ^^^ ~5 0
execute as @e[type=fec:shadow_slash] at @s run particle fec:shadow_slash ^^1.5^
execute as @e[type=fec:shadow_slash] at @s run tp @s ^^^1
execute as @e[type=fec:shadow_slash] at @s run damage @e[type=!fec:shadow_slash,r=6] 12 entity_attack entity @s
execute as @e[type=fec:tenacity_orange_slash] at @s run particle fec:tenacity_orange_emitter ^^1.5^
execute as @e[type=fec:tenacity_orange_slash] at @s run tp @s ^^^1
execute as @e[type=fec:tenacity_orange_slash] at @s run damage @e[type=!fec:tenacity_orange_slash,r=6] 24 entity_attack entity @s
execute as @e[type=fec:tenacity_blue_slash] at @s run particle fec:tenacity_blue_emitter ^^1.5^
execute as @e[type=fec:tenacity_blue_slash] at @s run tp @s ^^^1
execute as @e[type=fec:tenacity_blue_slash] at @s run damage @e[type=!fec:tenacity_blue_slash,r=6] 32 entity_attack entity @s
execute as @e[type=fec:corruption_expands_beam] at @s run particle fec:shadow_revolver_corruption_expands_beam ~~~
execute as @e[type=fec:corruption_expands_beam] at @s run fill ~-10~-3~-10~10~3~10 fec:shadow_corruption ["fec:spread_type"=1] replace grass_block
execute as @e[type=fec:corruption_expands_beam] at @s run tp @s ^^^0.3
execute as @e[type=fec:corruption_expands_beam] at @s run damage @e[type=!fec:corruption_expands_beam,r=10,tag=!corruption_immunity] 6 entity_attack entity @s

# Auto enchant Mending
enchant @a[hasitem={item=fec:stardust_armor_helmet,location=slot.weapon.mainhand}] mending
enchant @a[hasitem={item=fec:stardust_armor_boots,location=slot.weapon.mainhand}] mending
enchant @a[hasitem={item=fec:stardust_armor_chestplate,location=slot.weapon.mainhand}] mending
enchant @a[hasitem={item=fec:stardust_armor_leggings,location=slot.weapon.mainhand}] mending
enchant @a[hasitem={item=fec:stardust_clear_helmet,location=slot.weapon.mainhand}] mending
enchant @a[hasitem={item=fec:stardust_clear_boots,location=slot.weapon.mainhand}] mending
enchant @a[hasitem={item=fec:stardust_clear_chestplate,location=slot.weapon.mainhand}] mending
enchant @a[hasitem={item=fec:stardust_clear_leggings,location=slot.weapon.mainhand}] mending

# Gamemode switcher
execute as @e[type=fec:elemental_legionnaire] at @s run gamemode 2 @a[m=d,r=80]
execute as @e[type=fec:water_eidolon] at @s run gamemode 2 @a[m=d,r=64]
execute as @e[type=fec:shadowplague_guardian] at @s run gamemode 2 @a[m=d,r=80]
execute as @e[type=fec:elemental_legionnaire] at @s unless entity @a[r=80,m=2] run event entity @s despawn
execute as @e[type=fec:water_eidolon] at @s unless entity @a[r=64,m=2] run event entity @s despawn
execute as @e[type=fec:shadowplague_guardian] at @s unless entity @a[r=80,m=2] run event entity @s despawn

# Player Join Event
tellraw @a[tag=!joined] {"rawtext":[{"text": "Recommended Settings to Run This Pack :"}]}
tellraw @a[tag=!joined] {"rawtext":[{"text": "Simulation Distance : §e8"}]}
tellraw @a[tag=!joined] {"rawtext":[{"text": "Mob Grief : §cOFF"}]}
give @a[tag=!joined] compass
tellraw @a[tag=!joined] {"rawtext":[{"translate": "text.the_fates.welcome"}]}
tag @a[tag=!joined] add joined