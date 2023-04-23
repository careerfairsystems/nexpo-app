import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppLoader from "./hooks/AppLoader";
import Navigation from "./navigation";

export default function App() {
  return (
    <AppLoader>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </AppLoader>
  );
}
