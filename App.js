import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import BottomTab from './navigation/BottomTab';

export default function App() {
  return ( 
    <NavigationContainer>
    <StatusBar style="black" />
    <BottomTab/>
    </NavigationContainer>
    );
}

//rsc