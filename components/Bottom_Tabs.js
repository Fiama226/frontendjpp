import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart_view from './Cart_view'
import History_view from './History_view'
import Home_view from './Home_view'
import Profile_view from './Profile_view'
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();


const Bottom_Tabs = () => {
  const [cart_products, setCart_products]=useState([])
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} >
        <Tab.Screen  name="Acceille" children={()=><Home_view cart_products={cart_products} setCart_products={setCart_products} />}  options={{tabBarIcon: (tabInfo) => (
            <MaterialCommunityIcons name="home" color={tabInfo.focused ? "#006600" : "#8e8e93"} size={30} />
          ),}}   />
        <Tab.Screen name="Panier" children={()=><Cart_view cart_products={cart_products} setCart_products={setCart_products} />} options={{tabBarIcon: (tabInfo) => (
            <MaterialCommunityIcons name="cart" color={tabInfo.focused ? "#006600" : "#8e8e93"} size={30} />
          ),}}   />
        <Tab.Screen name="Historique" component={History_view}  options={{tabBarIcon: (tabInfo) => (
            <MaterialCommunityIcons name="history" color={tabInfo.focused ? "#006600" : "#8e8e93"} size={30} />
          ),}} />
        <Tab.Screen name="Profile" component={Profile_view}  options={{tabBarIcon: (tabInfo) => (
            <MaterialCommunityIcons name="account" color={tabInfo.focused ? "#006600" : "#8e8e93"} size={30} />
          ),}} />
    </Tab.Navigator>
  )
}

export default Bottom_Tabs