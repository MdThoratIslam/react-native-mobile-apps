import { Stack } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { AuthProvider } from "../contexts/AuthContext";
import { useFrameworkReady } from '../hooks/useFrameworkReady'
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();
  
  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
    unsavedChangesWarning: false,
  });

  return (
    <ConvexProvider client={convex}>
      <AuthProvider>
        <Stack screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="auth/SignIn" />
          <Stack.Screen name="auth/SignUp" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </ConvexProvider>
  );
}