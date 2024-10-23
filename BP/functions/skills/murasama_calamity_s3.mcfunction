scoreboard objectives add murasamaTag dummy
scoreboard players add @e[tag=murasamaTag] murasamaTag 1
damage @e[tag=murasamaTag,type=player] 5 entity_attack
damage @e[tag=murasamaTag,type=ender_dragon] 15 entity_attack
damage @e[tag=murasamaTag,type=fec:elemental_legionnaire] 16 entity_attack
damage @e[tag=murasamaTag,type=fec:water_eidolon] 16 entity_attack
damage @e[tag=murasamaTag,type=wither] 8 entity_attack
damage @e[tag=murasamaTag,type=warden] 8 entity_attack
execute at @e[tag=murasamaTag] run particle fec:murasama_calamity_skill_2_3 ~~~
tag @e[tag=murasamaTag,scores={murasamaTag=100..}] remove murasamaTag
scoreboard players reset @e[tag=!murasamaTag] murasamaTag