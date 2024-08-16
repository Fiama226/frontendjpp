import { View, Text, Image,ImageBackground,StatusBar, Pressable,SafeAreaView } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import React from "react";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const marginTopOfTheWholeView=StatusBar.currentHeight



const shareFile = async () => {
  axios.get('https://jppbackend.onrender.com/printpdf?data=yggig')
  .then(function (response) {})

}

const Debut = () => {
  return (
    
    <View>
    <ImageBackground source={{uri:"https://res.cloudinary.com/dxvnon94f/image/upload/v1722297937/background/0.jpg"}} style={{width:"100%",height:"100%"}} resizeMode="repeat">
      <View style={styles.debut}></View>
    </ImageBackground>
    </View>
  );
};

const Eachinfo = ({ info, personnalinfo, icone }) => {
  return (
    <View style={{width:"100%",backgroundColor:"white",borderRadius:10,marginTop:10, padding:10,alignSelf:"center",alignItems:"center" }} >
      <View style={{display:"flex", flexDirection:"row"}}>
        <View>
          <MaterialCommunityIcons name={icone} size={25} color="black" />
        </View>
        <View>
          <Text style={{fontWeight:"bold",fontSize:20}}> {info}</Text>
        </View>
      </View>
      <View>
        <Text style={{fontWeight:"condensedBold",fontSize:20}}>  {personnalinfo}</Text>
      </View>
    </View>
  );
};

const User = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{marginTop:insets.top}}>
      <Debut />
      <View
        style={{
          height: 200,
          width: 200,
          borderRadius: 10,
          zIndex:3,
          position:"absolute",
          alignSelf:"center",
          marginTop:50,
        }}
      >
        <Image
          source={{ uri: "https://res.cloudinary.com/dxvnon94f/image/upload/v1722297937/System_image/papa.jpg" }}
          style={{ width: 200, height: 200, borderRadius: 50}}
        />
      </View>
      <View style={{position:"absolute",zIndex:3,alignSelf:"center",marginTop:250,opacity:0.8}}>
      <Eachinfo
        info={"Nom"}
        personnalinfo={"KABORE jean-Pierre"}
        icone={"account"}
      />
      <Eachinfo
        info={"Boutique"}
        personnalinfo={"Sankaryare"}
        icone={"map-marker"}
      />
      <Eachinfo info={"Phone"} personnalinfo={"78800265"} icone={"cellphone"} />
      <Eachinfo
        info={"whatsapp"}
        personnalinfo={"+226 70 97 93 82"}
        icone={"whatsapp"}
      />
      <Eachinfo
        info={"Email"}
        personnalinfo={"jeanpierrekabore54@gmail.com"}
        icone={"email"}
      />
      </View>
      <View style={{width:"90%", height:550, position:"absolute", zIndex:1,alignSelf:"center",marginTop:150,borderRadius:20}}><Image source={{ uri: `https://res.cloudinary.com/dxvnon94f/image/upload/v1722297937/background/11.jpg` }} style={{width:"100%",height:"100%",borderRadius:10}} resizeMode="stretch"></Image></View>
    </View>
  );
};

const styles = StyleSheet.create({
  debut: {
    width: "100%",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    height: 200,
    zIndex:1
  },
});

export default User;
