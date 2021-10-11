export default {
  name: 'Arkad',
  slug: 'nexpo-app',
  version: '1.0.0',
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
    supportsTablet: true
  },
  android: {
    package: 'se.arkadtlth.nexpo',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#022B5C',
    },
  },
  web: {
    favicon: './assets/images/favicon.png'
  },
  extra: {
    backendUrl: process.env.NEXPO_BACKEND_URL || 'https://nexpo.marfor.io/api',
  }
}
