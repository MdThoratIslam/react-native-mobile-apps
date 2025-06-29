import { Stack } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { AuthProvider } from "../contexts/AuthContext";

export default function RootLayout() {
    const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
      unsavedChangesWarning: false,
    });
  return (
    <ConvexProvider client={convex}>
      <AuthProvider>
        <Stack screenOptions={{
          headerShown: false,
          }}>
          <Stack.Screen name="index"/>
          <Stack.Screen name="auth/SignIn"/>
          <Stack.Screen name="auth/SignUp"/>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </ConvexProvider>
  )
}