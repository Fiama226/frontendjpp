import { View, Text,TextInput,Button,FlatList,Pressable,Modal,SafeAreaView } from 'react-native'
import { StyleSheet,StatusBar } from 'react-native';
import AwesomeButton from "react-native-really-awesome-button";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React from 'react'
import { DataTable,Provider } from 'react-native-paper';
import { Card } from '@rneui/themed';
import { Formik } from 'formik';
import { useEffect,useState } from 'react';
import axios from 'axios';
import {MaterialCommunityIcons} from '@expo/vector-icons'
const marginTopOfTheWholeView=StatusBar.currentHeight

const NewTable=({set_modale_to_confirm_delete_status,set_data_loan_to_be_deleted})=>{
  const [Today_Loan_Table,set_Today_Loan_Table] = useState([])
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );


  const [page, setPage] = useState(0);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, Today_Loan_Table.length);

  useEffect(() => {
     setPage(0);
  }, [itemsPerPage]);
  useEffect(()=>{
      const fetchData=  async()=>{
         const data= await axios.get('https://jppshopbackend.onrender.com/TodayLoanData').catch((err)=>{console.log(err)});
         set_Today_Loan_Table(data.data);
      }
      fetchData()
  },[Today_Loan_Table])

  return(
    <View >
    <DataTable>
    <DataTable.Header style={{backgroundColor:"#a47a71"}}>
        <View style={{width:"20%"}}><Text style={{textAlign:"center"}}>Nom</Text></View>
        <View style={{width:"20%"}} ><Text style={{textAlign:"center"}}>Prix</Text></View>
        <View style={{width:"35%"}} ><Text style={{textAlign:"center"}}>Commentaire</Text></View>
        <View style={{width:"20%"}} ><Text style={{textAlign:"center"}}>Heure</Text></View>
        <View style={{width:"10%"}}><Text style={{textAlign:"center"}}>Action</Text></View>
    </DataTable.Header>
    {Today_Loan_Table.slice(from, to).map((item) => (

        <DataTable.Row key={item.key}>
          <View style={{backgroundColor:"#E2DFD2",width:"20%",margin:1}}><Text>{item.nom}</Text></View>
          <View style={{backgroundColor:"#E2DFD2",width:"20%",margin:1}} ><Text>{item.prix}</Text></View>
          <View style={{backgroundColor:"#E2DFD2",width:"35%",margin:1}}><Text>{item.commentaire}</Text></View>
          <View style={{backgroundColor:"#E2DFD2",width:"20%",margin:1}} ><Text>{item.temps}</Text></View>
          <View style={{width:"10%",backgroundColor:"#E2DFD2",margin:1}} >
            <Pressable onPress={()=>{set_modale_to_confirm_delete_status(true);set_data_loan_to_be_deleted(item)}}>
            <MaterialCommunityIcons name="delete" size={20} color="red"   />
            </Pressable>
          </View>
        </DataTable.Row> ))
    }
    <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(Today_Loan_Table.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} de ${Today_Loan_Table.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'lignes par page'}
      />
    </DataTable>

    </View>
  )
}

const Form=({set_modale_to_confirm_add_status,set_data_of_new_loan})=>{
  const d = new Date();
  let dateString =d.toLocaleDateString('fr-FR',{
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hours: 'numeric',}
  )
  let timeString = d.toLocaleTimeString("en-US", {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
  
    return(
        <Card containerStyle={{backgroundColor:"#FFE4E1",marginTop:60,width:"90%",alignSelf:"center",height:"40%",padding:45}}>

        <Formik
          initialValues={{nom : '',prix : '',}}
          onSubmit={(values,{resetForm}) => {console.log(values),
            set_modale_to_confirm_add_status(true)
            set_data_of_new_loan({...values,"temps":`${dateString} a ${timeString}`})
        resetForm()
          }} >
        
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
          <Card.Title>Ajouter un pret</Card.Title>
          <Card.Divider/>
  
            <TextInput placeholder='Nom'  onChangeText={handleChange('nom')} value={values.nom}></TextInput>
            <TextInput placeholder='Prix'  onChangeText={handleChange('prix')} value={values.prix}></TextInput>
            <TextInput placeholder='Commentaire'  onChangeText={handleChange('commentaire')} value={values.commentaire}></TextInput>
            <Text style={{padding:10}} >Aujourd'hui {dateString} a {timeString},</Text>
            <AwesomeButton type="primary" onPress={handleSubmit} style={{alignSelf:"center"}}><Text>Enregistrer</Text></AwesomeButton>
          
          
        </View>
      )}
        </Formik> 

        </Card>
    )
}

const Modal_for_delete=({data_loan_to_be_deleted,modale_to_confirm_delete_status,set_modale_to_confirm_delete_status})=>{
    const supprimer =()=>{
        setmodalStatus(true)
    }
    return(
      <View >
      <Modal visible={modale_to_confirm_delete_status} transparent={true} onRequestClose={()=>setmodalStatus(false)}   >
      <View style={{justifyContent:'center',alignItems:'center',flex:1,width:"100%"}} >
          <View style={{backgroundColor:'white',width:300,height:300,borderRadius:20,justifyContent:'center',alignItems:'center',}}>
            <Text>Veuillez saisir votre mot de passe pour valider la suppression de la dette de Monsieur/Madame {data_loan_to_be_deleted.nom}, d'un montant de {data_loan_to_be_deleted.prix} FCFA, contractée le {data_loan_to_be_deleted.temps} </Text>
          
          <Formik
          initialValues={{password : '',username : ""}}
          onSubmit={(value) =>{
            if(value.username==="Jean-Pierre" && value.password=="78800265" || value.username==="Pascaline" && value.password=="70127925"){
              axios.delete(`https://jppshopbackend.onrender.com/DelTodayLoanData/${data_loan_to_be_deleted.id}`).catch((err) => {console.log(err)})
              set_modale_to_confirm_delete_status(false)
              console.log(data_loan_to_be_deleted)
            }
            else{
              console.log("wrong password")
            }
          }}

          >


            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View>
                <TextInput placeholder="nom d'utilisateur " onChangeText={handleChange('username')} value={values.username}></TextInput>
                <TextInput placeholder='Mot de passe'  onChangeText={handleChange('password')} value={values.password}></TextInput>
                <View style={{flexDirection:"row",alignSelf:"center"}}>
                <AwesomeButton type="primary" onPress={handleSubmit} style={{alignSelf:"center"}}><Text>Valider</Text></AwesomeButton>
                <View style={{width:10}}></View>
                <AwesomeButton type="primary" onPress={()=>set_modale_to_confirm_delete_status(false)} style={{alignSelf:"center"}}><Text>Annuler</Text></AwesomeButton>
                </View>

              </View>
            )}
          </Formik>
          </View>
          </View>
      </Modal>
      </View>
    )

}

const Modale_to_confirm_add=({modalStatus,setmodalStatus,data_of_new_loan})=>{
  const d = new Date();
  let dateString =d.toLocaleDateString('fr-FR',{
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hours: 'numeric',}
  )
  let timeString = d.toLocaleTimeString("en-US", {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });


  return(
    <Modal visible={modalStatus} transparent={true} onRequestClose={()=>setmodalStatus(false)} >
    <Card containerStyle={{marginTop:"50%"}}>
    <Card.Title>Confirmer ajout de pret</Card.Title>
    <Card.Divider/>

    <View><Text>ajouter à la liste le prêt de {data_of_new_loan.prix} FCFA contracté par Monsieur/Madame {data_of_new_loan.nom} aujourd'hui ,{data_of_new_loan.temps}</Text></View>
            <Formik
          initialValues={{password : '',username : ""}}
          onSubmit={(value) =>{
            if(value.username==="Jean Pierre" && value.password=="Sankaryare" || value.username==="Pascaline" && value.password=="70127925"){
              axios.post('https://jppshopbackend.onrender.com/Add_Loan_Today',{...data_of_new_loan,"temps":`${dateString} a ${timeString}`}).catch((err) => {console.log(err)})
              setmodalStatus(false)
            }
            else{
              console.log("wrong password")
            }
          }}

          >


            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View>
                <TextInput placeholder="nom d'utilisateur " onChangeText={handleChange('username')} value={values.username}></TextInput>
                <TextInput placeholder='Mot de passe'  onChangeText={handleChange('password')} value={values.password}></TextInput>
                <View style={{flexDirection:"row",alignSelf:"center"}}>
                <AwesomeButton type="primary" onPress={handleSubmit} style={{alignSelf:"center"}}><Text>Valider</Text></AwesomeButton>
                <View style={{width:10}}></View>
                <AwesomeButton type="primary" onPress={()=>setmodalStatus(false)} style={{alignSelf:"center"}}><Text>Annuler</Text></AwesomeButton>
                </View>
                
              </View>
            )}
          </Formik>

    </Card>
    </Modal>
  )
}


const TodayLoan =()=>{
    const [Today_Loan_Table,set_Today_Loan_Table] = useState([])
    const [data_of_new_loan,set_data_of_new_loan] = useState({})
    const [data_loan_to_be_deleted,set_data_loan_to_be_deleted]=useState({})
    const [modale_to_confirm_add_status, set_modale_to_confirm_add_status] = useState(false);
    const [modale_to_confirm_delete_status, set_modale_to_confirm_delete_status] = useState(false);
    //console.log(data_loan_to_be_deleted)


    useEffect(()=>{
        const fetchData=  async()=>{
           const data= await axios.get('https://jppshopbackend.onrender.com/TodayLoanData').catch((err)=>{console.log(err)});
           set_Today_Loan_Table(data.data);
        }
        fetchData()
    },[Today_Loan_Table])
    return (
      <View style={{marginTop:marginTopOfTheWholeView}}>
      <SafeAreaView>
      <KeyboardAwareScrollView>
        <View>
          <Text style={{fontSize:20,fontWeight:"bold",textAlign:"center",margin:20}}>Liste des prêts</Text>
        </View>
      <NewTable set_modale_to_confirm_delete_status={set_modale_to_confirm_delete_status} set_data_loan_to_be_deleted={set_data_loan_to_be_deleted}/>
      <Modale_to_confirm_add modalStatus={modale_to_confirm_add_status} setmodalStatus={set_modale_to_confirm_add_status} data_of_new_loan={data_of_new_loan} />
      <Modal_for_delete set_modale_to_confirm_delete_status={set_modale_to_confirm_delete_status} modale_to_confirm_delete_status={modale_to_confirm_delete_status} data={Today_Loan_Table} data_loan_to_be_deleted={data_loan_to_be_deleted}/>

      <Form set_modale_to_confirm_add_status={set_modale_to_confirm_add_status} set_data_of_new_loan={set_data_of_new_loan}  />
      </KeyboardAwareScrollView>
      </SafeAreaView>    
      </View>
    );
  }
  const styles = StyleSheet.create({

    cell:{
      borderColor:"black",
      borderWidth:1.5,
      width: "20%",
    }
  })


export default TodayLoan