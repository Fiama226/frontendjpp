import { View, Text, FlatList,Image,TextInput,StyleSheet,Pressable,Modal,SafeAreaView,Button } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import React, { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import LottieView from 'lottie-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';


const ValidationSchema = Yup.object().shape({
  nom: Yup.string()
  .required('Entrez nom du client pour continuer'),
  numero: Yup.number()
  .min(2, 'Trop court!')
  .required('Entrez le numero de telephone du client pour continuer'),
  ville: Yup.string()
  .min(2, 'Trop court!')
  .max(20, 'Trop Long!')
  .required("Entrez la ville d'origine  du client pour continuer"),
});


const TotalPriceView=({cart_products,turnonmodal,cleancard,settotalamountoforder})=>{
  const [TotalPrice,SetTotalPrice] = useState(0)
  const bottomHeight = useBottomTabBarHeight();
  console.log(bottomHeight)
  
  useEffect(()=>{
    const arrayForTotalPrice=cart_products.map(x=>x.prices)
   // console.log("the array to apply Sum is: ",arrayForTotalPrice)
    let sum=0
    arrayForTotalPrice.forEach(x => {
      sum += x;
  });
    SetTotalPrice(sum)
    settotalamountoforder(sum)
    

  },[cart_products])

  const displaymodal=()=>{
    turnonmodal(true)
  }
  
  return (
    <View
      style={{
        backgroundColor: "#FF7F50",
        height: "10%",
        alignSelf: "center",
        alignItems: "center",
        borderRadius:20,
        width:"60%",
        marginTop:40,

      }}
    >
      <View>
        <Text>le prix total est de: {TotalPrice} FCFA</Text>
      </View>
      <View style={{display:"flex",flexDirection:"row",marginTop:10}}>
      <Pressable style={{ backgroundColor: "yellow", borderRadius: 10,padding:5 }} onPress={()=>{cleancard([])}}>
      <Text>annuler</Text>
      </Pressable>

      <Pressable style={{ backgroundColor: "yellow", borderRadius: 10,padding:5,marginLeft:10 }} onPress={()=>{turnonmodal(true),console.log("holla")}}>
      <Text>continuer</Text>
      </Pressable>
      </View>
    </View>
  );
}

const Item=({name,price,image_source,setCart_products,cart_products})=>{
  const [quantity, setQuantity] = useState(0);
  //console.log("Total Prices: " , TotalPrice)
  
  
  const [category_price, setcategory_price] = useState(0);
  const prices= Number(price) * quantity;
  //console.log(price)

  const functionToUpdateCartProduct = ( array, nameOfProduct, quantity ,prices) => {
    const updatedArray = array && array.map(product => {
      //console.log(array);
        if (product.name === nameOfProduct) {
            // If the product matches, update its quantity
            return { ...product, quantity,prices };
        }
        // Otherwise, return the original product
        return product;
    });
    //console.log(array);
    return updatedArray;
}

useEffect(()=>{
  const updatedData =functionToUpdateCartProduct(cart_products,name,quantity,prices)
  //console.log(updatedData)
  setCart_products(updatedData)

},[quantity])

const handleRemoveProduct =()=>{
  const updatedData =cart_products.filter(x=>x.name !== name)
  setCart_products(updatedData)

}



  return (
    <View >
      <View style={{backgroundColor:"white", width:"90%",alignSelf:"center",borderRadius:20, marginTop:10}}>
      <View style={{flexDirection:'row'}}>
        <View>
          <Image
            source={{ uri: `https://res.cloudinary.com/dxvnon94f/image/upload/v1722297937/products_image/${image_source}` }}
            style={{ width: 100, height: 150 }}
          ></Image>
        </View>
        <View style={{alignSelf:"center",marginLeft:20}}>
          <View style={{margin:5}}>
            <Text> nom :{name}</Text>
          </View>
          <View style={{margin:5}}>
            <Text> Prix unitaire :{price} FCFA</Text>
          </View>
          <View style={{margin:5}}>
            <Text> Quantite :{quantity} pcs</Text>
          </View>      
          <View style={{margin:5}}> 
            <Text> Prix categorie :{prices} FCFA</Text>
          </View>
          </View>
        </View>
        <View style={{flexDirection:'row',padding:20,alignSelf:"center"}}>
        <View style={{flexDirection:'row',alignItems:"center"}}>
          <View>
            <Pressable style={styles.button} onPress={()=>{setQuantity(quantity-1)}}>
              <Text style={{textAlign:"center",fontSize:20}}>-</Text>
            </Pressable>
          </View>
          <View>
            <TextInput
              inputMode="numeric"
              //placeholder={quantity.toString()}
              placeholderTextColor={"#000000"}
              onChange={(newtext)=>{setQuantity(parseInt(newtext.nativeEvent.text))}}
              
            />
          </View>
          <View>
            <Pressable style={styles.button} onPress={()=>{setQuantity(quantity+1)}}>
              <Text style={{textAlign:"center",fontSize:20}}>+</Text>
            </Pressable>
          </View>
        </View>
        <View style={{marginLeft:10}}><Pressable onPress={handleRemoveProduct} style={{backgroundColor:"#8B0000",borderRadius:5,padding:5}}><Text>retirer du panier </Text></Pressable></View>
        </View>
      </View>
    </View>
  );
}

const Cart_view = ({cart_products,setCart_products}) => {
  const [totalamountoforder, settotalamountoforder] = useState(0);
  const [TotalPrice, SetTotalPrice] = useState(0);
  const [modal1,setmodal1]=useState(false);
  const bottomHeight = useBottomTabBarHeight();
  const HeadMargin = useSafeAreaInsets().top;

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString('fr-FR', options);
    
    
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const dateAndTime=`${currentDate} a ${hours}:${minutes} mn`



  if (cart_products.length ===0)  {
    return (
      <View style={{backgroundColor:"#c2c9d6",height:"100%",marginTop:HeadMargin}}>
        <View><Text style={{margin:50,textAlign:"center",fontSize:30}}>le panier est vide actuellement</Text></View>
        <View>
        <LottieView
        autoPlay
        //ref={animation}
        style={{
          width: "75%",
          height: "75%",
          marginTop: 50,
          marginBottom: 50,
          alignSelf: "center",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('./lottieanimation.json')}
      />
        </View>
      </View>

    );
  }
  else {
  return (
    <View style={{backgroundColor:"#c2c9d6",height:"100%",marginTop:HeadMargin}}>
      <View style={{alignItems:"center"}}><Text style={{fontSize:25,textDecorationLine:"underline"}}>Commande actuelle</Text></View>

      <FlatList
      data={cart_products}
      renderItem={({ item }) => <Item name={item.name}  image_source={item.image_source} price={item.price} cart_products={cart_products} setCart_products={setCart_products} />}
      style={{backgroundColor:"orange",height:"60%"}}
      
       />

      <TotalPriceView TotalPrice={TotalPrice} cart_products={cart_products} turnonmodal={setmodal1} cleancard={setCart_products} settotalamountoforder={settotalamountoforder}/>



       <KeyboardAwareScrollView>

       <Modal visible={modal1} transparent={true} style={{flex:1}}  >
         <View style={{width:"80%",alignSelf:"center",borderRadius:10,backgroundColor:"#F5DEB3",marginTop:"50%"}}>
         <View style={{padding:30}}>
         <View style={{marginBottom:10}}>
           <Text style={{fontSize:15}}>Veillez entrer les informations du client</Text>
           </View>

           <Formik
           validationSchema= {ValidationSchema}
           initialValues={{ nom: '',numero: '',ville: '',modedepayment: '',selectedValue:"cash"}}
          onSubmit={values =>{ 
           
            const numerodefacture="2547"
            const data2=[values]
            const data={cart_products,...values,dateAndTime,numerodefacture,totalamountoforder}
            console.log(data);
            axios.post("https://jppshopbackend.onrender.com/commandes",{...data},{headers: {'Content-Type': 'application/json'}}).then(res=>console.log(res)).catch(err=>console.log(err))
            setmodal1(false)

            }}
           
           >
           {({ handleChange, handleBlur, handleSubmit,errors, values,touched }) => (
       <View>
         <TextInput
           onChangeText={handleChange('nom')}
           onBlur={handleBlur('nom')}
           value={values.nom}
           placeholder='Entrez le nom du client'
           error={errors.nom}
         />
         {(errors.nom && touched.nom) &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.nom}</Text>
       }
          <TextInput
           onChangeText={handleChange('numero')}
           onBlur={handleBlur('numero')}
           value={values.numero}
           placeholder='Entrez le numero du client'
           inputMode='tel'
           maxLength={8}
           error={errors.numero}
         />
                  {(errors.numero && touched.numero) &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.numero}</Text>
       }
          <TextInput
           onChangeText={handleChange('ville')}
           onBlur={handleBlur('ville')}
           value={values.ville}
           placeholder='Entrez la ville du client'
         />
                {(errors.ville && touched.ville) &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.ville}</Text>
       }
         <View style={{marginTop:5}}>
          <Text style={{color:"#808080"}}>Selectionner le mode de payement:</Text>
         </View>
         <Picker
          selectedValue={values.selectedValue}
            onValueChange={handleChange('selectedValue')}
          
          >
          <Picker.Item label="Cash" value="cash" />
          <Picker.Item label="credit" value="credit" />
          <Picker.Item label="Orange Money" value="orange money" />
          </Picker>
          <View style={{flexDirection:"row",alignSelf:"center"}}>
          <Pressable style={{backgroundColor:"#2F4F4F",margin:7,borderRadius:5,padding:10}} onPress={()=>{setmodal1(false)}}><Text>return</Text></Pressable>
         <Pressable style={{backgroundColor:"#2F4F4F",margin:7,borderRadius:5,padding:10}} onPress={handleSubmit}><Text>Sauvegarder</Text></Pressable>
         </View>
       </View>
           )}

           </Formik>
           </View>
         
        
         </View>
       </Modal>
       </KeyboardAwareScrollView>
       
    </View>
  )
}
}

const styles = StyleSheet.create({
  button: {
    width: 20,
    backgroundColor: "blue",
    borderBottomLeftRadius:5,
    borderTopRightRadius:5,
    borderTopLeftRadius:5,
    borderBottomRightRadius:5,

  }
})

//export const dataToBePrinted= {cart_products,}
export default Cart_view