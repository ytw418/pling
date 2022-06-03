import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import Creator from '../pages/Creator';
import FlingBox from '../pages/FlingBox';
import MyDrawer from '../pages/MyDrawer';

const Stack = createStackNavigator();

const StackNavigator = () => {
   return (
      <Stack.Navigator
         screenOptions={{
            headerStyle: {
               backgroundColor: "white",
               borderBottomColor: "white",
               shadowColor: "white",
               height: 50
            },
            headerTitleAlign: 'left',
            headerTintColor: "#000",
            headerBackTitleVisible: false
         }}
      >
         <Stack.Screen name="Home" component={Home} />
         <Stack.Screen name="Creator" component={Creator} />
         <Stack.Screen name="FlingBox" component={FlingBox} />
         <Stack.Screen name="MyDrawer" component={MyDrawer} />

      </Stack.Navigator>
   )
}

export default StackNavigator;