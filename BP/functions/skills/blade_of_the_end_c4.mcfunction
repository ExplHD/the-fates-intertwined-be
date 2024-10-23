scoreboard objectives add cosmic_tag_buffed dummy
scoreboard players add @e[tag=cosmic_tag_buffed] cosmic_tag_buffed 1
tag @e[scores={cosmic_tag_buffed=300..}] remove cosmic_tag_buffed
scoreboard players reset @e[tag=!cosmic_tag_buffed] cosmic_tag_buffed