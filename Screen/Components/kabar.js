import React, {useEffect, useState} from 'react'
import { StyleSheet, View,Image,Text,Dimensions,FlatList} from 'react-native'
import {WebView}  from "react-native-webview";
const Kabar = () => {
const [isLoading, setLoading] = useState(true);
const [data, setData] = useState('');
const [jipuk, setJipuk] = useState([]);
const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetch('http://daftar.asysyifa-sambi.com/php/getPengumuman.php', {
              method: 'POST',
              body: JSON.stringify(),
              headers: {
                Accept: 'application/json',
                        'Content-Type': 'application/json'
              },
            })
            .then((response) => response.json())
            .then((responseJson) => {
              setLoading(false);
              if (responseJson.status === 'success') {
                console.log(responseJson.data);
                setJipuk(responseJson.data);
              } else {
                console.log('Tidak Ada Data');
              }
            })
            .catch((error) => {
              setLoading(false);
              setTimeout(() => {
              }, 2000);
            });
     
  },[]);
  var styleE = '<style>p{ font-size: 60px;font-weight: bold; width: 100%;color: #eb4034;font-family:"TitilliumWeb-Bold"}</style>';
  const Item = ({ item, onPress, style }) => (
    <View style={styles.isi}>
         <WebView source={{html : styleE+item.info}}  
    originWhitelist={['*']} style={{padding: 100,height:100, width:250}}/>  
    </View>
       
  ); 
    return (
       <View style={styles.container}>
            <Text style={styles.header}>Pengumuman !</Text>
            <FlatList
                      data={jipuk}
                      renderItem={Item}
                      keyExtractor={(item) => item.id}
                      extraData={selectedId}
                    />  
            
          </View>
    )
}


export default Kabar
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
        backgroundColor:"#ffffff",
        alignItems:'flex-start',
        width: '100%'
    },
    header:{
      fontFamily:"TitilliumWeb-Bold",
      fontSize: 24,
      alignSelf:'center',
      marginBottom: 10,
      marginHorizontal: 20,
      color: '#195db0',
    },
    isi:{
      width: '100%',
      alignItems:'center',
      marginHorizontal: 10,
    },
    

})
