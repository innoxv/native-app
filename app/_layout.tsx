// app/_layout.tsx
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css"; // Tailwind entry point

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Slot />
    </SafeAreaProvider>
  );
}