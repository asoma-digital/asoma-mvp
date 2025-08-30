// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: 'clarifi',
    slug: 'clarifi-mvp',
    version: '1.0.0',
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    },
    platforms: ['ios', 'android', 'web'],
    web: {
      bundler: 'metro',
      output: 'static',
    },
  },
};