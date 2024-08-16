import { View, Text, Pressable,StatusBar,SafeAreaView} from 'react-native'
import AwesomeButton from "react-native-really-awesome-button";
import RNPickerSelect from 'react-native-picker-select';
import { Card } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React from 'react'
import { ImageBackground,Dimensions,TextInput,Button } from 'react-native'
import { useState, useEffect } from 'react'
import { Formik } from 'formik'
import {MaterialCommunityIcons} from '@expo/vector-icons'
const images=["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg"]
const marginTopOfTheWholeView=StatusBar.currentHeight

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = ({ navigation }) => {
  const height=Dimensions.get("screen").height;
  const [currentindex,setcurrentindex]=useState(0)
  const updateindex=()=>{
    setcurrentindex((prevIndex)=>prevIndex===images.length -1 ?  0:  prevIndex+1
    )

  }
  useEffect(() =>{
    const interval = setInterval(updateindex,5000)
    
    return ()=> clearInterval(interval)
  },[])

  const [errorMessageState, setErrorMessageState]=useState(false)

  const [passwordVisibility, setPasswordVisibility]=useState(true) 
  
  return (
    <SafeAreaView style={{flex:1,justifyContent: "center",}}>
    <KeyboardAwareScrollView>
    <View style={{backgroundColor:"#FFE4B5",height: windowHeight,marginTop:marginTopOfTheWholeView}}>
      <ImageBackground
        source={{ uri: `https://res.cloudinary.com/dxvnon94f/image/upload/v1722297937/background/${currentindex}.jpg` }}
        resizeMode="stretch"
        resizeMethod="resize"
        
        
        style={{ width: windowWidth, height: windowHeight* 0.7 ,justifyContent: 'center',marginTop: 100,marginBottom: 100, }}
      >

        <Card
        containerStyle={{
            opacity: 0.8,
            alignSelf: "center",
            borderRadius:20,
            justifyContent: "center",
            height: "60%",
            alignItems: "center",
            width: "90%",

          }}
        >
          <Card.Title h1>Se connecter</Card.Title>
          <Card.Divider color='blue' width={2} />
          <View >
            <Formik
              initialValues={{ motDePasse: "",selectedValue:"Jean-Pierre" }}
              onSubmit={(values) => {
                console.log(values)
                if(values.motDePasse==="78800265" && values.selectedValue==="Jean-Pierre" || values.motDePasse==="70127925" && values.selectedValue==="Pascaline" ){
                  console.log("tout est ok")
                navigation.navigate("Bottom_Tabs")
                }else{
                  setErrorMessageState(true)
                }
                
                }}
            >

      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
        <View style={{flexDirection:"row",borderRadius:15,backgroundColor:"pink",margin:10,padding:10,height:"25%",width:"90%"}}>
        <View style={{}}>
        <MaterialCommunityIcons name="account" size={40} color="black"   />
        </View>
        <View style={{width:"80%",height:"20%"}}>
          <RNPickerSelect
      onValueChange={handleChange('selectedValue')}
      placeholder={{ label: "choisir l'utilisateur", value: null }}
      items={[
        { label: 'Jean-Pierre', value: 'Jean-Pierre' },
        { label: 'Pascaline', value: 'Pascaline' },
      ]}
      style={{width:40}}
    />
          </View>
          </View>

          <View style={{flexDirection:"row",flexDirection:"row",borderRadius:15,backgroundColor:"pink",width:"90%",height:"25%",margin:10,padding:10}}>
          <MaterialCommunityIcons name="lock-outline" size={40} color="black" />


          <TextInput
          secureTextEntry={passwordVisibility}
            onChangeText={handleChange("motDePasse")}
            onBlur={handleBlur("motDePasse")}
            value={values.motDePasse}
            placeholder="Entrez votre mot de passe"
            style={{ width: "70%",}}
          />
          <View>
          <Pressable onPress={()=>setPasswordVisibility(!passwordVisibility)}><MaterialCommunityIcons name="eye" size={40} color="black"  /></Pressable>
          </View>
          </View>
          {errorMessageState? <View ><Text style={{color:"red"}}>mot de passe ou non d'utilisateur incorrect </Text></View>:null}
          <AwesomeButton type="primary" onPress={handleSubmit} style={{alignSelf:"center"}}><Text>Connecter</Text></AwesomeButton>
        </View>
      )}
      </Formik>


          </View>
        </Card>
      </ImageBackground>
    </View>
    </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default Login