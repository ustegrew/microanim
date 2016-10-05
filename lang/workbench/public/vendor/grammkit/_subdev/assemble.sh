#!/bin/bash
src=/home/peter/git/microanim/lang/workbench/public/vendor/grammkit/_subdev
trg=/home/peter/git/microanim/lang/workbench/public/vendor/grammkit

cp -f $trg/grammkit.js $src/grammkit.bak.js
cat $src/grammkit_000.js $src/grammkit_093_module-94.js $src/grammkit_094.js $src/grammkit_096_module-97.js $src/grammkit_097.js > $trg/grammkit.js
