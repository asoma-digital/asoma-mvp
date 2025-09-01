import 'dotenv/config';

export default {
  expo: {
    name: 'clarifi',
    slug: 'clarifi-mvp',
    version: '1.0.0',
    owner: 'maz.wakes',
    platforms: ['ios', 'android', 'web'],
    userInterfaceStyle: 'automatic',
    orientation: 'portrait',
    scheme: 'clarifimvp',
    icon: './assets/images/clarifi-logo.png',
    splash: {
      image: './assets/images/clarifi-logo.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
      icon: './assets/images/clarifi-logo.png',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/clarifi-logo.png',
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
      favicon: './assets/images/clarifi-logo.png',
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