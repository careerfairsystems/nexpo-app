rm -rf node_modules 
npm install
npm install -g sharp-cli@^2.1.0
export NODE_OPTIONS=--openssl-legacy-provider 
npm run start 
# Första gången: Kör denna fil
# Sedan: Kör endas npm run start
