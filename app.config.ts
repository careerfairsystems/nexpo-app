export default {
  name: "Arkad",
  slug: "nexpo-app",
  version: "2.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  //userInterfaceStyle: 'automatic',
  splash: {
    resizeMode: "contain",
    backgroundColor: "#F66628",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  "expo": { 
    ios: {
    bundleIdentifier: "se.arkadtlth.nexpo",
    googleServicesFile: "./GoogleService-Info.plist",
    target: 'nexpoapp',
    buildNumber: "2.0.0",
    supportsTablet: true,
    infoPlist: {
      NSCameraUsageDescription: "Camera access is needed for the QR-code scanning functionality",
      NSPhotoLibraryUsageDescription:
        "Photo library access is needed to choose a profile picture to upload",
      UIBackgroundModes: [
        "fetch",
        "remote-notification"
      ],
    },
  },
  android: {
    package: "se.arkadtlth.nexpo",
    googleServicesFile: "./google-services.json",
    versionCode: 14,
    adaptiveIcon: {
      foregroundImage: "./assets/images/android_icon.png",
      backgroundColor: "#F66628",
    },
    permissions: ["CAMERA"],
  },
  plugins: [
    "@react-native-firebase/app"
  ],
  web: {
    favicon: "./assets/images/favicon.png",
  },
  extra: {
    isDev: process.env.NODE_ENV === "development",
    isProd: process.env.NODE_ENV !== "development",
    backendUrl: 'https://nexpo.arkadtlth.se/api',
    //backendUrl: "http://localhost:5000/api",
  }
  },
};
