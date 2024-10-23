scoreboard objectives add winterbloom_sword_skill_1 dummy
scoreboard players add @a[tag=winterbloom_follow_area] winterbloom_sword_skill_1 1
scoreboard players set @a[tag=winterbloom_follow_area,scores={winterbloom_sword_skill_1=201..}] winterbloom_sword_skill_1 0
tag @a[scores={winterbloom_sword_skill_1=200..}] remove winterbloom_follow_area
scoreboard players reset @a[tag=!winterbloom_follow_area] winterbloom_sword_skill_1
execute at @a[tag=winterbloom_follow_area,scores={winterbloom_sword_skill_1=1..200}] run particle fec:winterbloom_skill_1 ~~~
execute as @a[tag=winterbloom_follow_area,scores={winterbloom_sword_skill_1=1..200}] at @s run effect @e[r=10,tag=!winterbloom_follow_area] slowness 3 3 false
execute as @a[tag=winterbloom_follow_area,scores={winterbloom_sword_skill_1=1..200}] at @s run damage @e[r=10,tag=!winterbloom_follow_area] 2 entity_attack entity @s