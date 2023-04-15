@echo off

echo "Check if yarn is installed..."
yarn "--version"
echo "Reinstall dependencies..."
DEL /S "node_modules" && yarn "install" "--frozen-lockfile"
echo "Check dependencies..."
yarn "check"
echo "Run typecheck..."
yarn "typecheck"