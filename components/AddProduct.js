import { View, Text,Image,Button,TextInput,Pressable,ImageBackground,StatusBar } from 'react-native'
import { useState } from 'react';
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

const marginTopOfTheWholeView=StatusBar.currentHeight

const FormSchema= Yup.object().shape({
  name: Yup.string()
   .min(2, 'Le nom fourni est trop court!')
   .max(50, 'Le nom fourni est trop long!')
   .required('Required'),
  price: Yup.number()
   .min(2, 'Too Short!')
   .max(50, 'Too Long!')
   .required('Required'),
  brand: Yup.string()
   .min(2, 'Too Short!')
   .max(50, 'Too Long!')
   .required('Required'),
  type: Yup.string()
   .min(2, 'Too Short!')
   .max(50, 'Too Long!')
   .required('Required'),
  description: Yup.string()
   .min(2, 'Too Short!')
   .max(50, 'Too Long!')
   .required('Required'),
})



const uploadTotheServer= async(filePath,name,price,brand,type,description)=>{

  const name_of_file=name.replaceAll(" ", "")
  
  
  const formData= new FormData()
  formData.append('file',{
    uri: filePath,
    type: 'image/jpeg', 
    name: `${name}.jpg`, 
  })
  formData.append("name",name)
  formData.append("price",price)
  formData.append("brand",brand)
  formData.append("type",type)
  formData.append("description",description)
  formData.append("image",`${name_of_file}.jpg`)

  //const data= {"file":filePath, "name":name, "price":price, "brand":brand,"type":type ,"description":description}
  //console.log('the new  data is: '+JSON.stringify(data))


     axios.post("https://jppshopbackend.onrender.com/addProduct",formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res=>console.log(res)).catch(err=>console.log(err))
  console.log(response)
  }


const Formulaire=()=>{
  const [selectedImage, setSelectedImage] = useState('http://10.0.2.2:5000/System_image/upload.gif');
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result.assets[0]);

    if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View>

    <Pressable onPress={pickImage} style={{alignSelf:"center",borderStyle:"dotted",borderWidth:5}}>
    {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
    </Pressable>
      <Formik
        initialValues={{
          name: '',
          price: '',
          description: '',
          brand: '',
          type: '',
        }}
        //validationSchema={FormSchema}
        onSubmit={values => {console.log("The values added are:",values)
          uploadTotheServer(selectedImage,values.name,values.price,values.brand,values.type,values.description)
        }}
      
      >
        {({ handleChange, handleSubmit, values,errors,touched }) => (
          <View style={{alignSelf:"center"}}>
          <View><Text>Nom</Text></View>
            <TextInput placeholder='Entrez le nom du produit'  onChangeText={handleChange('name')} value={values.name} style={styles.Inputfield}></TextInput>
            {errors.name && touched.name && <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text> }
            <View><Text>Prix</Text></View>
            <TextInput placeholder='Entrez le prix du produit'  onChangeText={handleChange('price')} value={values.price} style={styles.Inputfield} inputMode='numeric'></TextInput>
            {errors.price && touched.price && <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text> }
            <View><Text>marque</Text></View>
            <TextInput placeholder='Entrez la marque du produit'  onChangeText={handleChange('brand')} value={values.brand} style={styles.Inputfield}></TextInput>
            {errors.brand && touched.brand && <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text> }
            <View><Text>Type</Text></View>
            <TextInput placeholder='Entrez le type du produit'  onChangeText={handleChange('type')} value={values.type} style={styles.Inputfield}></TextInput>
            {errors.type && touched.type && <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text> }
            <View><Text>Description</Text></View>
            <TextInput placeholder='decrire le produit'  onChangeText={handleChange('description')} value={values.description} style={styles.Inputfield}></TextInput>
            {errors.description && touched.description && <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text> }
            <View style={{ marginTop: 20 }}>
            </View>
            <Button onPress={handleSubmit} title='Enregistrer' />
          </View>
          
        )}
      </Formik>
    </View>
  );
}

const AddProduct = () => {
  return (
    <View style={{marginTop:marginTopOfTheWholeView}}>
        <ImageBackground
        source={{ uri: `http://10.0.2.2:5000/background/20.jpg` }}
      style={{ width: "100%", height: "100%" }}
      resizeMode="stretch"
        >
    
    <View style={{backgroundColor:"#c2c9d6",borderRadius:20,width:"90%",alignSelf:"center",top:"15%",opacity:0.7,padding:15}}>
    <View>
    <Text style={{fontSize:20,fontWeight:"bold",textAlign:"center",color:"white"}}>remplir le formulaire pour ajouter un produit au catalogue</Text>
    </View>
      <Formulaire/>
    </View>
    </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  Inputfield:{
    backgroundColor:"white",
  borderRadius:5,
  textAlign: "center",
}
});

export default AddProduct