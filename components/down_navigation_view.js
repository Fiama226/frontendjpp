import 'react-native-gesture-handler';
import axios from 'axios';
import { StyleSheet, Text, View, Image,TextInput,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Bottom_Tabs from './Bottom_Tabs';

export default function Down_navigation_view() {
  return (
    <View style={{marginTop:50}} edges={top}>
      <Bottom_Tabs/>
    </View>
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
