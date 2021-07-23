import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Context as AuthContext } from "../../providers/AuthContext";
import * as SplashScreen from "expo-splash-screen";
import Signin from "../screens/Signin";
import Signup from "../screens/Signup";
import Home from "../screens/Home";
import CreateProject from "../screens/CreateProject";

const Stack = createStackNavigator();

function Navigation() {
  const { state, persistLogin } = useContext(AuthContext);

  // Verificar si existe un token de autenticación
  useEffect(() => {
    persistLogin();
  }, []);

  // Prevenir que la pantalla de splash se oculte automáticamente
  SplashScreen.preventAutoHideAsync();

  // Ocultar la pantalla de splash hasta finalizar la verificación del token
  if (!state.loading) SplashScreen.hideAsync();

  return (
    <NavigationContainer>
      {!state.loading && (
        <>
          {state.loggedIn ? (
            <Stack.Navigator>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="CreateProject" component={CreateProject} />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Signin" component={Signin} />
              <Stack.Screen name="Signup" component={Signup} />
            </Stack.Navigator>
          )}
        </>
      )}
    </NavigationContainer>
  );
}

export default Navigation;
