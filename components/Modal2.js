import { View, Text,Pressable } from 'react-native'
import React from 'react'
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import axios from 'axios';



const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString('fr-FR', options);
    console.log(currentDate);
    
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const data = [
        { article:"Outre", quantite: 100 , prix_unitaire: 1150 , total: 115000},
        { article:"Amaka", quantite: 5 , prix_unitaire: 1600 , total: 8000},
        { article:"Daniela", quantite: 5 , prix_unitaire: 1600 , total: 8000},
        { article:"Peruque", quantite: 2 , prix_unitaire: 1500 , total: 3000},
        { article:"Razor cut", quantite: 4 , prix_unitaire: 1250 , total: 5000},
        { article:"meche boucle", quantite: 10 , prix_unitaire: 1050 , total: 10500},
        { article:"Louisa", quantite: 10 , prix_unitaire: 2750 , total: 27500},
        { article:"Calypso", quantite: 3 , prix_unitaire: 1750 , total: 5250},
      ];

const receipt=`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
    body {
    font-family: Arial, sans-serif;
    color: #333;
    padding: 20px;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f7f7f7;
}
tr{
    border-top: 1px solid black;

}

.invoice-container {
    background: #fff;
    padding: 30px;
    width: 600px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.invoice-header {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin-top: 100px;
}

.invoice-info  {
    margin: 50px;
    font-size: 16px;
    font-weight: normal;
}


.billed-to  {
    margin: 50px;
    font-size: 16px;
    font-weight: normal;
}


#invoice-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

 td {
    text-align: left;
    padding: 8;
    text-align: center; 
}
th {
    background-color: gray;
}

    </style>
</head>
<body>
    <div class="invoice-container">
        <header class="invoice-header">

            <section class="billed-to">
                <h2>Facture de:</h2>
                <p>nom du client</p>
                <p>numero du client</p>
                <p>ville du client</p>
            </section>

            <section class="invoice-info">
                <h1>FACTURE</h1>
                <p>Facture No: 12345</p>
                <p id="timming"></p>
                <p id="heure_minute"></p>
            </section>        
    </header>

        <table id="invoice-table">
            <thead>
                <tr>
                    <th>Article</th>
                    <th>Quantite</th>
                    <th>Prix unitaire</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>

        <div style="display: flex;justify-content: right ; text-decoration-line: underline;">
            <div >
                <span>Total:</span>
                <span>500 FCFA</span>
            </div>
        </div>

        <section class="thank-you">
            <p>Merci!</p>
        </section>

        <div style="display: flex;flex-direction: row;">

        <div style="width: 50%;"  >
            <h3>Informations Payements</h3>
            <p>KABORE Jean-Pierre/Pascaline</p>
            <p>Orange Money: 70127825</p>
            <p>MOOV Money.: 78800265</p>
        </div>

        <div style="width: 50%;" >
            <br><br><br><br>
            <p style="text-align: right;">KABORE Jean-Pierre/Pascaline</p>
            <p style="text-align: right;">Sankaryare/Roodwooko</p>
        </div>

        </div>
    </div>
</body>


<script>
    
    const currentTime = ${hours}:${minutes}mn;
    document.getElementById('heure_minute').innerHTML = currentTime;
    document.getElementById('timming').innerHTML = currentDate;

    
// Select the table body where rows will be inserted
const tableBody = document.getElementById('invoice-table');

// Map over the data array and create rows
const rows = ${data}.map(item => {
  // Create a new row element
  const row = document.createElement('tr');

  // Create cells for each property in the object
  const articleCell = document.createElement('td');
  articleCell.textContent = item.article;
  row.appendChild(articleCell);

  const quantiteCell = document.createElement('td');
  quantiteCell.textContent = item.quantite + " pcs";
  row.appendChild(quantiteCell);

  const prix_unitaireCell = document.createElement('td');
  prix_unitaireCell.textContent = item.prix_unitaire + " FCFA";
  row.appendChild(prix_unitaireCell);
  
  const totalCell = document.createElement('td');
  totalCell.textContent = item.total + " FCFA";
  row.appendChild(totalCell);

  // Append the row to the table body
  tableBody.appendChild(row);

  // Return the row in case it's needed
  return row;
});

</script>
</html>
`

const Modal2 = ({setmodal1,setmodal2,datatobesend}) => {
    const senddata= async ()=>{
        try{
            await axios.post("https://jppbackend.onrender.com/commandes",datatobesend).then(res=>console.log(res))
        }catch(err){
            console.log("l'erreur lors de l'envoie de la commande: ",err)
        }
    }


    const printToFile = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        const { uri } = await Print.printToFileAsync({ receipt });
        console.log('File has been saved to:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
      };

  return (
        <View style={{marginTop:"70%",width:"80%",alignSelf:"center",borderRadius:10,backgroundColor:"#F5DEB3",padding:30}}>
         <View>
           <Text style={{alignSelf:'center',fontSize:20}}>vous desirez?</Text>
           </View>
           <View style={{padding:10}}>

          
         <Pressable onPress={senddata}><Text>Ajouter a la liste des commandes</Text></Pressable>
         <Pressable onPress={printToFile}><Text>confirmer la commande</Text></Pressable>
         <Pressable style={{backgroundColor:"blue"}}  onPress={()=>{setmodal2(false),setmodal1(true)}}><Text>return</Text></Pressable>
         <Pressable onPress={()=>{setmodal2(false)}}><Text>confirmer</Text></Pressable>
         </View>
         </View>
  )
}

export default Modal2