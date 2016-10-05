#!/bin/bash
src=/home/peter/git/microanim/lang/workbench/public/vendor/grammkit/_subdev
trg=/home/peter/git/microanim/lang/workbench/public/vendor/grammkit

cp -f $trg/grammkit.js $src/grammkit.bak.js
cat $src/grammkit_000.js $src/grammkit_200_module94.js $src/grammkit_400.js > $trg/grammkit.js
