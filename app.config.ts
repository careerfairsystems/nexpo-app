export default {
  name: 'Arkad',
  slug: 'nexpo-app',
  version: '1.0.4',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  //userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    bundleIdentifier: "se.arkadtlth.nexpo",
    buildNumber: '1.0.4',
    supportsTablet: true,
    infoPlist: {
      NSCameraUsageDescription: 'Camera access is needed for the QR-code scanning functionality',
      NSPhotoLibraryUsageDescription: 'Photo library access is needed to choose a profile picture to upload',
    }
  },
  android: {
    package: 'se.arkadtlth.nexpo',
    versionCode: 4,
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#022B5C',
    },
    permissions: [ 'CAMERA' ],
  },
  web: {
    favicon: './assets/images/favicon.png'
  },
}
