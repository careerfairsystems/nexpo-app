export default {
  name: 'Arkad',
  slug: 'nexpo-app',
  version: '1.2.1',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  //userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#F66628',
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    bundleIdentifier: "se.arkadtlth.nexpo",
    buildNumber: '1.2.1',
    supportsTablet: true,
    infoPlist: {
      NSCameraUsageDescription: 'Camera access is needed for the QR-code scanning functionality',
      NSPhotoLibraryUsageDescription: 'Photo library access is needed to choose a profile picture to upload',
    }
  },
  android: {
    package: 'se.arkadtlth.nexpo',
    versionCode: 10,
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#F66628',
    },
    permissions: ['CAMERA'],
  },
  web: {
    favicon: './assets/images/favicon.png'
  },
  extra: {
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV !== 'development',
    backendUrl: process.env.NODE_ENV === 'development' ? (process.env.BACKEND_URL ? process.env.BACKEND_URL : 'https://nexpo-dev.arkadtlth.se/api') : 'https://nexpo.arkadtlth.se/api',  
    //backendUrl: 'http://localhost:5000/api',
    //backendUrl: 'https://nexpo.arkadtlth.se/api',
  },
}

