import React,{useState} from 'react'
import {  StyleSheet,SafeAreaView,Dimensions,
  StatusBar,
    Text,
    View,
    ImageBackground} from 'react-native'
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import { useFocusEffect } from '@react-navigation/native';
const Kartu = () => {
  const [getValue1, setGetValue1] = useState('');
  const [dataNama1, setNama1] = useState('');
  const [dataAlamat1, setAlamat1] = useState('');
  const [dataNoRm1, setNoRm1] = useState('');
  useFocusEffect(
      
    React.useCallback(() => {
    AsyncStorage.getItem('AppSession').then((getValue1) =>setGetValue1(getValue1));
    const fetchUser = () =>{
    var puk = {user_email: getValue1};
    fetch('http://daftar.asysyifa-sambi.com/php/select-user.php', {
    method: 'POST',
    body: JSON.stringify(puk),
    headers: {
      Accept: 'application/json',
              'Content-Type': 'application/json'
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
    if (responseJson.status === 'success') {
      setNama1(responseJson.data.nama);
      console.log(responseJson.data.nama);
      setNoRm1(responseJson.data.no_rm);
      setAlamat1(responseJson.data.alamat);
    } else {
      console.log('Tidak Ada Data');
    }
  })
  .catch((error) => {
    console.log(error);
  });
}
  fetchUser();
})
);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor='#2ba631'/>
        <View style={styles.container}>
          <ImageBackground
              source={{
                uri: 'http://daftar.asysyifa-sambi.com/php/img/karturs.png',
              }}
              style={{
                width: '100%',
                height: 216,
                resizeMode: 'center',
                margin: 5
              }}>
            <Text style={styles.text}>Nama : {dataNama1}</Text>
            <Text style={styles.text1}>No Rm : {dataNoRm1}</Text>
            <Text style={styles.text1}>Alamat : {dataAlamat1}</Text>
          </ImageBackground>
        </View>
    </SafeAreaView>
  );
};
export default Kartu
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 10,
      },
      button: {
        backgroundColor: '#235796',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        marginVertical: 15,
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 10,
        marginBottom: 0,
      },
      text: {
        color: '#000000',
        fontSize: 12,
        marginLeft: windowWidth*0.4,
        alignSelf: 'flex-start',
        padding: 5,
        marginTop:90,
        fontFamily :"TitilliumWeb-Regular",
      },
      text1: {
        color: '#000000',
        fontSize: 12,
        marginLeft: windowWidth*0.4,
        marginRight: 50,
        alignSelf: 'flex-start',
        padding: 5,
        fontFamily :"TitilliumWeb-Regular",
      },
})
