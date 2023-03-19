checkInstalled() {
    if ! [ -x "$(command -v $@)" ]; then
        echo "Error: $@ is not installed." >&2
        exit 1
    else
        echo "$@ is installed"
    fi
}

show_help() {
    echo "Usage: ./runFrondEnd [OPTIONS]"
    echo "Script for running the frontend"
    echo ""
    echo "Options:"
    echo "-h, --help     Display this help message and exit"
    echo "-n, --renode   Reinstall node_modules"
    echo "-c, --recli    Install sharp-cli"
    echo "-s, --ressl    Add ssl"
    echo ""
}

checkInstalled npm

while getopts ":h:n:c:s" opt; do
    case $opt in
    h|help)
        show_help
        exit 1
        ;;
    n|renode)
        # Reinstall node_modules
        sudo rm -rf node_modules 
        npm install
        ;;
    c|recli)
        # Install sharp-cli  
        npm install -g sharp-cli@^2.1.0
        ;;
    s|ressl)  
        # Lägg till vid problem med ssl. (opensslErrorStack)
        #Kan leda till att unset NODE_OPTIONS behöver köras innan VSCode kan köras igen
        export NODE_OPTIONS=--openssl-legacy-provider 
        ;;
    esac
done

npm run start 
