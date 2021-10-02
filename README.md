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

### Common issues
#### Running scripts is disabled on Windows
```
> yarn -v
yarn : File C:\Users\Ika\AppData\Roaming\npm\yarn.ps1 cannot be loaded because running scripts is disabled on this system. For more  
information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1
+ yarn -v
+ ~~~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```
**Solution**: Run Powershell as administrator and run the command `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` (Read more [here](https:/go.microsoft.com/fwlink/?LinkID=135170))

## How to run the build
1. Run the build by writing `yarn start` in the terminal. Then you can launch the app on your phone using the Expo app by scanning the QR-code, alternatively you can run it directly in the browser window that opens by selecting "Run in web browser".