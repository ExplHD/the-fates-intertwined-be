scoreboard objectives add spear_of_heart_skill_2 dummy
scoreboard players add @a[tag=entanglement] spear_of_heart_skill_2 1
scoreboard players set @a[tag=entanglement,scores={winterbloom_sword_skill_1=201..}] spear_of_heart_skill_2 0
tag @a[scores={spear_of_heart_skill_2=200..}] remove entanglement
inputpermission set @a[scores={spear_of_heart_skill_2=199..},tag=entanglement] movement enabled
inputpermission set @a[scores={spear_of_heart_skill_2=1..9},tag=entanglement] movement disabled