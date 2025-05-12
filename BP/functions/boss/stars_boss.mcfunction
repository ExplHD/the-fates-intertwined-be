## Star Warrior
execute at @e[type=fec:star_warrior,tag=stars_ultimate_warning] run particle fec:star_warrior_ultimate_warning ~~~
execute as @e[type=fec:star_warrior,tag=stars_ultimate_strike] at @s run damage @e[r=8,rm=0.1] 25 entity_attack entity @e[type=fec:star_warrior,c=1]
execute at @e[type=fec:star_warrior,tag=stars_ultimate_strike] run particle fec:star_warrior_ultimate ~~~
execute as @e[type=fec:star_warrior] at @s if entity @e[type=player,c=1,rm=32] run tp @s @e[type=player,c=1]

## Crescent Mage
execute as @e[type=fec:crescent_mage] at @s unless entity @e[type=fec:star_warrior,r=32] run tp @s @e[type=fec:star_warrior,c=1]

## Corvus