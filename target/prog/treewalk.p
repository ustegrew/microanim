# ----------------------------------------------------------
#                   Treewalk animation
# A monkey walks the nodes of a directory tree, trying to 
# find the banana...
# ----------------------------------------------------------

# Load image resources (Sprites)
LoadImg             (img_tree,              ../../target/img/tree/11.png,                   0)
LoadImg             (img_banana,            ../../target/img/banana/banana.png,             1)
LoadImg             (img_monkey_happy_01,   ../../target/img/monkey/monkey.happy.01.png,    2)
LoadImg             (img_monkey_think_01,   ../../target/img/monkey/monkey.think.01.png,    2)
LoadImg             (img_monkey_think_02,   ../../target/img/monkey/monkey.think.02.png,    2)
LoadImg             (img_monkey_think_03,   ../../target/img/monkey/monkey.think.03.png,    2)
LoadImg             (img_monkey_walk_01,    ../../target/img/monkey/monkey.walk.01.png,     2)
LoadImg             (img_monkey_walk_02,    ../../target/img/monkey/monkey.walk.02.png,     2)

# Animation sequence
# 1. Prepare all sprites 

# 1.1. Move tree to canvas pos (0, 0), set to invisible
MoveTo              (img_tree, 0, 0, 0)
SetTransparency     (img_tree, 0.0, 0)

