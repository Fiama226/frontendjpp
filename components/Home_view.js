import { View, Text, Image,FlatList,Pressable,StyleSheet,TextInput,StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import React from 'react'
import axios from 'axios'
import { Card } from '@rneui/themed'; 
import { useEffect,useState,useRef } from 'react'
import { FontAwesome6 } from '@expo/vector-icons';
const marginTopOfTheWholeView=StatusBar.currentHeight
console.log(marginTopOfTheWholeView)
const EachProduct=({name,image_source,price,cart_products,setCart_products})=>{
  const newCartProduct = {
    name,
    price,
    image_source,
    "prices": 0, 
    "quantity": 0}
  
  return (
    <Card containerStyle={{marginTop:15,paddingLeft:16,paddingRight:16, paddingBottom:16,borderWidth:1,marginLeft:4,marginRight:4,width:"31.5%",borderRadius:10,backgroundColor:"white",shadowOffset:10}}>
     <View><Image  style={{width:"100%",height:200,objectFit:"fill"}} source={{uri:`https://res.cloudinary.com/dxvnon94f/image/upload/v1722297937/products_image/${image_source}` }} /></View>
     <View><Text style={{textAlign:"center"}}>{name}</Text></View>
     <View><Text style={{fontWeight:"bold",textAlign:"center"}}>{price} FCFA</Text></View>
     {cart_products.some(x=>x.name===name)?<Pressable style={{backgroundColor:"green",borderRadius:10,alignItems:"center",flexDirection:"row",padding:10,margin:1,bottom:0}} ><Text> Deja ajoute</Text></Pressable>:<Pressable style={{backgroundColor:"orange",borderRadius:10,alignItems:"center",flexDirection:"row",padding:10}} onPress={()=>setCart_products([newCartProduct,...cart_products])} ><FontAwesome6 name="cart-shopping" size={15} color="black" /><Text> ajouter</Text></Pressable>}

     
    </Card>
  )
}

const Home_view = ({cart_products,setCart_products}) => {
  const [data, setData]=useState([])
  const [dataToDisplayOnHomePage,setDataToDisplayOnHomePage]=useState([])
  const [animationCount, setAnimationCount] = useState(0);
  const [showHomeComponent, setShowHomeComponent] = useState(false);
  const animationRef = useRef(null);
  const onAnimationFinish = () => {
    setAnimationCount((prevCount) => prevCount + 1);
    if (animationCount === 4) {
      setShowHomeComponent(true);
      console.log("animationCount is :",animationCount)
    }
  };
  const handleonchange= (e) => {
    setDataToDisplayOnHomePage(data.filter(item=>item.name.toLowerCase().includes(e.nativeEvent.text.toLowerCase())))
  }

  const insets = useSafeAreaInsets();
  
  useEffect(()=>{ 
    const fetchData = async ()=>{
    const data= await axios.get('https://jppshopbackend.onrender.com/home').catch(function (error) {console.log(error);})
      setData(data.data)
     // console.log("the data is:",data)
      setDataToDisplayOnHomePage(data.data)
     }
    fetchData()
    } ,[])

    useEffect(() => {
      let counter=0
      const playfunction=()=>{
        animationRef.current?.play();
        counter++
        console.log("The counter is: ",counter)
        if(counter===15){
          animationRef.current?.pause();
          setShowHomeComponent(true)
          clearInterval(interval)
        }
      }
      const interval = setInterval(playfunction, 500)
 
 
    }, []);

   // console.log("The data is:",data)

 
     
  return (
    <View style={{ flex: 1 }}>
    {!showHomeComponent?
    <View>
        <LottieView
          source={require('./loadingelephantanimation.json')}
          style={{
          width: "75%",
          height: "75%",
          marginTop: "25%",
          alignSelf: "center",
        }}
        
        ref={animationRef}
        loop={false}
        />
    </View>
    
    :
    <View style={{backgroundColor:"#c2c9d6",height:"100%",marginTop:insets.top}}>
    <View style={styles.SearchBarSpace}>
    <Ionicons name="search" size={24} color="black" style={{padding:10}} />
      <TextInput placeholder='Quel produits vous recherchez ?' style={styles.imput} onChange={handleonchange}></TextInput>
    </View>
      <View style={{paddingBottom: insets.bottom}} >
      <FlatList
      data={dataToDisplayOnHomePage}
      horizontal={false} 
      keyExtractor={item => item.id}
      numColumns={3}
      renderItem={({item}) =><EachProduct name={item.name} price={item.price} image_source={item.image_source} cart_products={cart_products} setCart_products={setCart_products}/>}
       />
       </View>
       
    </View>
  
  }
    </View>
  )
}

const styles = StyleSheet.create({
    
    SearchBarSpace:{
      backgroundColor: '#DCDCDC',
      width: 300,
      height: 50,
      borderRadius:10,
      margin:10,
      flexDirection:"row",
      alignSelf:"center"
    },


});

export default Home_view