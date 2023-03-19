# Instruktioner:
# Första gången: Kör denna fil
# Sedan: Kör endast npm run start

checkInstalled() {
    if ! [ -x "$(command -v $@)" ]; then
        echo "Error: $@ is not installed." >&2
        exit 1
    else
        echo "$@ is installed"
    fi
}

checkInstalled npm

while getopts ":n:c:s" opt; do
    case $opt in
    n)
        # Reinstall node_modules
        sudo rm -rf node_modules 
        npm install
        ;;
    c)
        # Install sharp-cli  
        npm install -g sharp-cli@^2.1.0
        ;;
    s)  
        # Lägg till vid problem med ssl. (opensslErrorStack)
        #Kan leda till att unset NODE_OPTIONS behöver köras innan VSCode kan köras igen
        export NODE_OPTIONS=--openssl-legacy-provider 
    esac
done

npm run start 
