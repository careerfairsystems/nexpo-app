#!/bin/bash
# Instructions: Run this script to test the actions of the program.
# If something fails, fix it before pushing your code

echo "Check if yarn is installed..."
yarn --version

echo "Reinstall dependencies..."
rm -rf node_modules && yarn install --frozen-lockfile

echo "Check dependencies..."
yarn check

echo "Run typecheck..."
yarn typecheck