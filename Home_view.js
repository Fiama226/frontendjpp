import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { StyleSheet, Text, View, Image,TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Bottom_Tabs from './components/Bottom_Tabs';
import fetchData from './databasesetting';
import { SafeAreaView,SafeAreaProvider } from 'react-native-safe-area-context';

export default function Home_view() {
  return (
    <SafeAreaProvider style={{top:50}}>
    <NavigationContainer>
      <Bottom_Tabs/>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  
  
  });
