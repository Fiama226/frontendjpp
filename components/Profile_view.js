import { View, Text } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TodayLoan from './Today_Loan';
import AddProduct from './AddProduct';
import User from './User';
import RemoveProducts from './RemoveProducts';
import { StatusBar } from 'react-native';
const marginTopOfTheWholeView=StatusBar.currentHeight





const Drawer = createDrawerNavigator();

const Profile_view = () => {
  return (
    
    <Drawer.Navigator initialRouteName="AddProduct"   screenOptions={{
        drawerStyle: {
          backgroundColor: '#7FFFD4',
          width: 200,
          marginTop: marginTopOfTheWholeView,
          borderBottomRightRadius:10,
          borderTopRightRadius:10

        },
        headerShown: false
      }}>
    
        <Drawer.Screen name="Ajouter un produit" component={AddProduct}  />
        <Drawer.Screen name="Supprimer un produit" component={RemoveProducts} />
        <Drawer.Screen name="Cahier de credit" component={TodayLoan} />
        <Drawer.Screen name="Utilisateur" component={User} />
      </Drawer.Navigator>
      
  )
}



export default Profile_view