checkInstalled() {
    if ! [ -x "$(command -v $@)" ]; then
        echo "Error: $@ is not installed." >&2
        exit 1
    else
        echo "$@ is installed"
    fi
}

checkInstalled npm

sudo rm -rf node_modules 
npm install
npm install -g sharp-cli@^2.1.0
export NODE_OPTIONS=--openssl-legacy-provider 
npm run start 
# Första gången: Kör denna fil
# Sedan: Kör endast npm run start
# Vid problem med att VSCode inte kan öppnas: kör unset NODE_OPTIONS
