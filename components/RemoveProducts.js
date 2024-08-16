import { View, Text,Pressable,FlatList,Image} from 'react-native'
import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const EachProduct=({name,image_source,price,id})=>{
    const newCartProduct = {
      name,
      price,
      image_source }

      const supprimer =()=>{
        axios.delete(`https://jppshopbackend.onrender.com/deleteProduct/${name}`).catch((err) => {console.log(err)})
    }
    
    return (
      <View style={{marginTop:16,paddingLeft:16,paddingRight:16, paddingBottom:16,borderWidth:1,marginLeft:4,marginRight:4,width:128,borderRadius:10,backgroundColor:"white",shadowOffset:10,alignItems:"center",width:"33%"}}>
       <View><Image style={{width:100,height:200,objectFit:"fill"}} source={{uri:`https://res.cloudinary.com/dxvnon94f/image/upload/v1722297937/products_image/${image_source}` }} /></View>   
       <View><Text>{name}</Text></View>
       <View><Text>{price} FCFA</Text></View>
       <Pressable onPress={supprimer} style={{backgroundColor:"red",borderRadius:10,alignItems:"center",flexDirection:"row",padding:10,margin:1,bottom:0}}><View><Text>Supprimer</Text></View><MaterialCommunityIcons name="delete-outline" size={20} color="black" /></Pressable>
       
      </View>
    )
  }

const RemoveProducts = () => {
    const [data, setData]=useState([])
    useEffect(()=>{ 
      const fetchData = async ()=>{
      const data= await axios.get('https://jppshopbackend.onrender.com/home').catch(function (error) {console.log(error);})
        setData(data.data)
       }
      fetchData()
      } ,[data])
      const insets = useSafeAreaInsets();

  return (
    <View style={{backgroundColor:"#c2c9d6",marginTop:insets.top,marginBottom:50}}>
    <View>
      <Text style={{alignSelf:"center",fontSize:20,width:"80%"}}>Supprimer produit du catalogue</Text>
    </View>

    <FlatList
      data={data}
      horizontal={false} 
      keyExtractor={(item) => item.id}
      numColumns={3}
      renderItem={({item}) =><EachProduct name={item.name} price={item.price} image_source={item.image_source} id={item.id}

      />}
       />
    </View>
  )
}

export default RemoveProducts