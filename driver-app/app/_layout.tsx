import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
// @ts-ignore: Cannot find module or type declarations for side-effect import of './global.css'.
import "../global.css";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#1a1a1a",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="delivery-detail"
          options={{
            title: "Delivery Details",
            presentation: "modal",
          }}
        />
      </Stack>
    </>
  );
}
