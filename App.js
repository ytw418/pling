import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./navigation/BottomTab";
import styled, { ThemeProvider } from "styled-components";
import theme from './theme'
export default function App() {
  return (
    <ThemeProvider theme={theme}>
    <NavigationContainer>
      <StatusBar style="black" />
      <BottomTab />
    </NavigationContainer>
    </ThemeProvider>
  );
}

//rsc
