export default {
  name: "Arkad",
  slug: "nexpo-app",
  version: "2.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "se.arkadtlth.nexpo",
  displayName: "ARKAD",
  //userInterfaceStyle: 'automatic',
  splash: {
    resizeMode: "contain",
    backgroundColor: "#F66628",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  expo: {
    ios: {
      bundleIdentifier: "se.arkadtlth.nexpo",

      googleServicesFile: "./GoogleService-Info.plist",
      scheme: "se.arkadtlth.nexpo",
      target: "nexpoapp",
      buildNumber: "2.0.0",
      plugins: [
        "@react-native-firebase/app",
        [
          "expo-build-properties",
          {
            ios: {
              useFrameworks: "static",
            },
          },
        ],
      ],
      supportsTablet: true,
      infoPlist: {
        NSCameraUsageDescription:
          "Camera access is needed for the QR-code scanning functionality",
        NSPhotoLibraryUsageDescription:
          "Photo library access is needed to choose a profile picture to upload",
        UIBackgroundModes: ["fetch", "remote-notification"],
      },
    },
    android: {
      package: "se.arkadtlth.nexpo",
      googleServicesFile: "./google-services.json",
      buildNumber: "2.0.0",
      displayName: "ARKAD",
      appName: "ARKAD",
      env: {
        ANDROID_HOME: "/Users/victormikkelsen/Library/Android/sdk",
      },
      versionCode: 177,
      scheme: "se.arkadtlth.nexpo",
      adaptiveIcon: {
        foregroundImage: "./assets/images/android_icon.png",
        backgroundColor: "#F66628",
      },
      permissions: ["CAMERA"],
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_API_KEY,
        },
      },
    },

    plugins: ["@react-native-firebase/app"],
    web: {
      favicon: "./assets/images/favicon.png",
    },
    extra: {
      isDev: process.env.NODE_ENV === "false",
      isProd: process.env.NODE_ENV !== "true",
      backendUrl: "https://nexpo.arkadtlth.se/api",
      apiKey: process.env.API_KEY,

      //backendUrl: "http://localhost:5000/api",
      eas: {
        target: "nexpoapp",
        projectId: "736e5c8b-3245-43fc-9803-293e803f584e",
      },
    },
    name: "ARKAD",
    slug: "nexpo-app",
    version: "1.0.0",
    sdkVersion: "51.0.0",
    googleServicesFile: "./google-services.json",
    platforms: ["ios", "android", "web"],

  },
};
