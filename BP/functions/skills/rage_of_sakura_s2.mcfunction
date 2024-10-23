scoreboard objectives add rage_of_sakura_skill_2 dummy
scoreboard players add @a[tag=rage_of_sakura] rage_of_sakura_skill_2 1
scoreboard players set @a[tag=rage_of_sakura,scores={rage_of_sakura_skill_2=201..}] rage_of_sakura_skill_2 0
tag @a[scores={rage_of_sakura_skill_2=200..}] remove rage_of_sakura
execute at @a[tag=rage_of_sakura,scores={rage_of_sakura_skill_2=1..200}] run particle fec:rage_of_sakura_skill_2 ~~~
execute as @a[tag=rage_of_sakura,scores={rage_of_sakura_skill_2=1..200}] at @s run effect @e[r=10,tag=!rage_of_sakura] slowness 3 3 false
execute as @a[tag=rage_of_sakura,scores={rage_of_sakura_skill_2=1..200}] at @s run effect @e[r=10,tag=!rage_of_sakura] hunger 3 0 false