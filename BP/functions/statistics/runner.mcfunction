scoreboard objectives add deathCounter dummy
scoreboard objectives add jumpCounter dummy
scoreboard objectives add moveCounter dummy
scoreboard objectives add legendCounter dummy
scoreboard objectives add atkCounter dummy
scoreboard objectives add atkCounterDelay dummy
scoreboard objectives add placeBlockCounter dummy
scoreboard objectives add breakBlockCounter dummy
scoreboard objectives add itemInteractCounter dummy
scoreboard objectives add killCounter dummy
scoreboard players remove @a[scores={atkCounterDelay=1..}] atkCounterDelay 1
scoreboard players add @a atkCounterDelay 0