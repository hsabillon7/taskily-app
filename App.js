import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import theme from "./src/theme";
import Navigation from "./src/components/navigation";
import { Provider as AuthProvider } from "./src/providers/AuthContext";
import LongTimers from "./src/utils/LongTimer";

export default function App() {
  LongTimers();

  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <Navigation />
      </PaperProvider>
    </AuthProvider>
  );
}
