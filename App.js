import { View, Text} from 'react-native'
import React from 'react'
import Login from './components/Login'
import Down_navigation_view from './components/down_navigation_view'
import Bottom_Tabs from './components/Bottom_Tabs'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {PaperProvider} from 'react-native-paper';


const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <PaperProvider>
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Down_navigation_view" component={Down_navigation_view} />
        <Stack.Screen name="Bottom_Tabs" component={Bottom_Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
    
  )
}

export default App