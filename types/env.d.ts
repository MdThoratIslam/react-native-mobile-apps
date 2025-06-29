declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_CONVEX_URL: string;
      EXPO_PUBLIC_FIREBASE_API_KEY: string;
    }
  }
}

// Ensure this file is treated as a module
export {};