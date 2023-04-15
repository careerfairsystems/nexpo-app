@echo off

echo Check if yarn is installed...
call yarn --version

echo Reinstall dependencies...
rmdir /S /Q node_modules 
call yarn install --frozen-lockfile

echo Check dependencies...
call yarn check

echo Run typecheck...
call yarn typecheck
