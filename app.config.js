// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: 'clarifi',
    slug: 'clarifi-mvp',
    version: '1.0.0',
    platforms: ['ios', 'android', 'web'],
    userInterfaceStyle: 'automatic',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      eas: {
        projectId: process.env.EAS_PROJECT_ID,
      },
    },
    web: {
      bundler: 'metro',
      output: 'static',
      build: {
        babel: {
          dangerouslyAddModulePathsToTranspile: [],
        },
      },
      output: {
        publicPath: '/',
      },
    },
  },
};