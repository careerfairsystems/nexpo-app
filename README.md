# Nexpo-app

## What is this project?

nexpo-app is the frontend and the graphical interface for the application at ARKAD. This app provides the user (students) with useable features for antending the career fair ARKAD with functionalites such as:

* List of attending companies
* Map of the fair
* Bookable events during the fair
* Student sessions
* Customizable profile

The app is built using the React Native framework and is using the Expo which is a framework for React Native to build mobile applications for Android and iOS.

## Required dependencies

- [Node.js](https://nodejs.org/en/download/) (currently running on v.16.14.0)
- Expo CLI
- yarn
- (optional) Expo (Go) mobile app (on [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US) or [IOS](https://apps.apple.com/us/app/expo-go/id982107779))

## How to setup a build environment

Recommended IDE: Visual Studio Code

If you don't have `yarn` installed you can simply install it with `npm install -g yarn`. `npm` is already on your computer if you have `Node.js`.
Here's how to setup the environment:

1. Clone the nexpo-app repository.
2. Open the terminal in the nexpo-app directory.
3. Run the command `yarn install`
4. Install Expo CLI by running `yarn install expo-cli --global`
5. Select the backend to use by setting the environment variable `BACKEND_URL` to the api endpoint to use. If none is set, the public development server will be used. In powershell, this is done by running `$env:BACKEND_URL='http://localhost/api'`, in BASH (Mac and Linux) this is done by running `BACKEND_URL='http://localhost/api'`. If you use the normal command prompt on Windows, switch to powershell or if you really want to use it, run: `set BACKEND_URL=http://localhost/api`

## Starting the project

With every dependency correctly installed to start the app run `yarn run start`. You will notice when the app have been correctly initialized. However, in order to access and view everything in the app you need to have the nexpo-app backend up and running correctly. For information regarding the backend please visit [nexpo-backend-nova](https://github.com/careerfairsystems/nexpo-backend-nova).

## Expo Go

Expo Go is a mobile app that allows you to preview and test the mobile apps developed with Expo. Expo is a development tool that makes it easier to build React Native apps by providing a set of pre-configured templates and a suite of developer tools. Expo Go is available for both iOS and Android devices and can be downloaded from the App Store or Google Play.

Once you have developed a mobile app using Expo, you can use Expo Go to test and preview the app on your mobile device without having to go through the process of building and publishing the app to the app store. With Expo Go, you can easily see how your app will look and function on a real device, test different features, and make adjustments to your code in real-time.

Expo Go also allows you to share your app with others by generating a QR code that others can scan to access your app. In order for this application to be available in Expo Go you need a Expo version installed on the project for version 46, 47 or 48. Also, your phone and computer need to be connected to the same network in order for this to work. There is a known issue that it's difficult to test Expo Go on school networks (or public ones).
