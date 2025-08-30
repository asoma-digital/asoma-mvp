import 'dotenv/config';

export default {
  expo: {
    name: 'clarifi',
    slug: 'clarifi-mvp',
    version: '1.0.0',
    platforms: ['ios', 'android', 'web'],
    userInterfaceStyle: 'automatic',
    orientation: 'portrait',
    scheme: 'clarifimvp',
    icon: './assets/images/icon.png',
    splash: {
      image: './assets/images/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.clarifi.app',
      buildNumber: '8',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      package: 'com.clarifi.app',
    },
    userInterfaceStyle: 'automatic',
    assetBundlePatterns: ['**/*'],
    web: {
      basePath: '/',
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: ['expo-router'],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: process.env.EAS_PROJECT_ID,
      },
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    },
  },
};