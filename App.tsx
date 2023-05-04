import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppLoader from "./screens/AppLoader";
import Navigation from "./navigation";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <AppLoader>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar style="dark" />
      </SafeAreaProvider>

      <Toast />
    </AppLoader>
    
  );
}
