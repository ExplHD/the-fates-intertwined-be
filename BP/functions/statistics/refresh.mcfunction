scoreboard objectives add stat_tick dummy
scoreboard players add tick stat_tick 0
execute if score tick stat_tick matches 0 run scoreboard players set tick stat_tick 2400
execute if score tick stat_tick matches 2 run scoreboard objectives remove deathCounterDisp
execute if score tick stat_tick matches 1 run scoreboard objectives setdisplay list deathCounterDisp descending
execute if score tick stat_tick matches 602 run scoreboard objectives remove jumpCounterDisp
execute if score tick stat_tick matches 601 run scoreboard objectives setdisplay list jumpCounterDisp descending
execute if score tick stat_tick matches 1202 run scoreboard objectives remove moveCounterDisp
execute if score tick stat_tick matches 1201 run scoreboard objectives setdisplay list moveCounterDisp descending
execute if score tick stat_tick matches 1802 run scoreboard objectives remove legendCounterDisp
execute if score tick stat_tick matches 1801 run scoreboard objectives setdisplay list legendCounterDisp descending
execute if score tick stat_tick matches 1 run titleraw @a actionbar {"rawtext":[{"text":"§aChanged Leaderboard to Most Deaths"}]}
execute if score tick stat_tick matches 601 run titleraw @a actionbar {"rawtext":[{"text":"§aChanged Leaderboard to Most Jumps"}]}
execute if score tick stat_tick matches 1201 run titleraw @a actionbar {"rawtext":[{"text":"§aChanged Leaderboard to Most Blocks Traveled"}]}
execute if score tick stat_tick matches 1801 run titleraw @a actionbar {"rawtext":[{"text":"§aChanged Leaderboard to Most Attacks with Legendary Weapons"}]}
execute if score tick stat_tick matches !0 run scoreboard players remove tick stat_tick 1