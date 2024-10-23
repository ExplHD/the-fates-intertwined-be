scoreboard objectives add earth_iframe dummy
scoreboard players add @e[tag=earth_iframe] earth_iframe 1
execute at @e[tag=earth_iframe] run particle fec:earth_shield ~~1~
tag @e[scores={earth_iframe=60..}] remove earth_iframe
scoreboard players reset @e[tag=!earth_iframe] earth_iframe