# Nexpo-app
## What is this project?
## The dependencies which are required to work on the project.
- npm (included in [Node.js](https://nodejs.org/en/download/)).
- Expo CLI
- (optional) Expo (Go) mobile app (on [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US) or [IOS](https://apps.apple.com/us/app/expo-go/id982107779))

## How to setup a build environment
Recommended IDE: Visual Studio Code

1. Clone the nexpo-app repository.
2. Open the terminal in the nexpo-app directory.
3. Run the command `npm install`
4. Install Expo CLI by running `npm install --global expo-cli`
5. Select the backend to use by setting the environment variable `BACKEND_URL` to the api endpoint to use. If none is set, the public development server will be used. In powershell, this is done by running `$env:BACKEND_URL='http://localhost/api'`, in BASH (Mac and Linux) this is done by running `BACKEND_URL='http://localhost/api'`. If you use the normal command prompt on Windows, switch to powershell or if you really want to use it, run: `set BACKEND_URL=http://localhost/api`
6. Start the development server with `npm start`
