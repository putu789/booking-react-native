import React,{useState, useEffect} from 'react'
import { StyleSheet,Dimensions,StatusBar,Image,Modal, Text, TextInput,View,
    TouchableOpacity, SafeAreaView,ScrollView, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from "../Components/Loader";
import Galat from "../Components/Galat";
  
  
const Aduan = ({navigation,props}) => {
  const [loading, setLoading] = useState(false);
  const [modalKritik, setModalKritik] = useState(false);
  const [value, onChangeText] = useState('');
  const [textKritik, setTextKritik] = useState('');
  const [getValue1, setGetValue1] = useState('');
  const [galat, setGalat] = useState(false);
  const initialState = '';
  useEffect(() => {
    AsyncStorage.getItem('AppSession').then((getValue1) =>setGetValue1(getValue1));
    });
  const kirimPress =()=>{
    if (!textKritik) {
      Alert.alert('Tidak Boleh Kosong')
    }else{
     
      var dataSave = {
        user_email: getValue1,
        isi : textKritik,
      };
      setLoading(true);
      fetch('http://10.5.50.33/php/sendKritik.php', {
        method: 'POST',
        body: JSON.stringify(dataSave),
        headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json'
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setLoading(false);
          console.log(responseJson);
          if (responseJson.status === 'success') {
            Alert.alert('Terkirim');
            setModalKritik(!modalKritik);
            setTextKritik(...initialState);
         
          } else {
            console.log('Gagal');
          }
        })
        .catch((error) => {
          setLoading(false);
          setGalat(true);
          setTimeout(() => {
            setGalat(false);
          }, 2000);
        });
     
    }
    
  }
    return (
        <SafeAreaView style={styles.container}>
         
           <ScrollView
      keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <View style={styles.container}> 
           <TouchableOpacity style={styles.item} onPress={() => navigation.push('layanan', {
              itemId: 4,
              otherParam: 'anything you want here',
            })}>
               <Modal
          animationType={'none'}
          transparent={true}
          visible={modalKritik}
          onRequestClose={() => {
            setModalKritik(!modalKritik);
            setTextKritik(...initialState);
          }}>
             <View style={styles.centeredView}>
          <View style={styles.modal}>
          <Loader loading={loading} />
          <Galat galat={galat} />
          <Text style={styles.titleModal}>Kritik dan Saran</Text>
          <TextInput
            style={styles.inputStyle}
            {...props}
            onChangeText={(textKritik)=>setTextKritik(textKritik)}
            multiline
            numberOfLines={10}
            value={textKritik}
          />
          <View style={styles.contButtone}>
          <TouchableOpacity style={styles.openButton}
          onPress={kirimPress}
          >
              <Text style={styles.textStyle}>Kirim Kritik dan Saran</Text>
            </TouchableOpacity>
           <TouchableOpacity style={styles.batalButton}
              onPress={() => {
                setModalKritik(!modalKritik);
                setTextKritik(...initialState);
              }}
            >
              <Text style={styles.textStyle}>Batal</Text>
            </TouchableOpacity>
            </View>
          </View>
          </View>
        </Modal>
          <View style={styles.detButton}>
          <Text style={styles.title}>Layanan RSU ASY SYIFA SAMBI</Text>
          <Text style={styles.panah}>>></Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => navigation.push('gunakan', {
              itemId: 4,
              otherParam: 'anything you want here',
            })}>
          <View style={styles.detButton}>
          <Text style={styles.title}>Cara Menggunakan Aplikasi</Text>
          <Text style={styles.panah}>>></Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => navigation.push('statusBpjs', {
              itemId: 4,
              otherParam: 'anything you want here',
            })}>
          <View style={styles.detButton}>
          <Text style={styles.title}>Cek Status BPJS</Text>
          <Text style={styles.panah}>>></Text>
          </View>
          </TouchableOpacity>
       {/*  <TouchableOpacity style={styles.item} onPress={() => navigation.push('peta', {
              itemId: 4,
              otherParam: 'anything you want here',
            })}>
          <View style={styles.detButton}>
          <Text style={styles.title}>Peta RSU ASY SYIFA SAMBI</Text>
          <Image source={require('../../Image/white-map.png')} style={{
                    width: 32,
                    height:35,
                  }} />        
          </View>

          </TouchableOpacity> */}
          <TouchableOpacity style={styles.item} onPress={()=> setModalKritik(true)}>
          <View style={styles.detButton}>
          <Text style={styles.title}>Kritik Dan Saran</Text>
          <Image source={require('../../Image/kritik.png')} style={{
                    width: 35,
                    height:35,
                  }} />        
          </View>
          </TouchableOpacity>
          
          </View>
          <Image source={require('../../Image/bg.png')} style={styles.ImageBackground}/>
          </ScrollView>
          
    </SafeAreaView>
    )
}

export default Aduan
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 20,
      },
      card: {
       marginHorizontal: 30,
      },
      item: {
        backgroundColor: '#369cb3',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10
      },
      title: {
        fontSize: 16,
        fontFamily :"TitilliumWeb-Bold",
        color: "white",
      },
      titleModal: {
        fontSize: 15,
        fontFamily :"TitilliumWeb-Bold",
        color: "#555657",
        alignSelf:'center'
      },
      textStyle:{
        fontSize: 14,
        fontFamily :"TitilliumWeb-Bold",
        color: "white",
      },
      panah: {
        fontSize: 25,
        fontFamily :"TitilliumWeb-Bold",
        color: "white",
      },
      detButton :{
          flexDirection: 'row',
          justifyContent: 'space-between'
      },
      ImageBackground:{
        flexDirection:'column',
        justifyContent:'space-between',
        alignSelf:'center',
        width: 250,
        height:120,
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: '#00000060',
      },
      inputStyle: {
        color: '#000000',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#dadae8',
        width:'100%',
        minHeight: 50,
      },
      modal: {
        margin: 20,
        width:windowWidth*0.95,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        paddingBottom: 40,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      contButtone:{
        flexDirection: 'row',
        padding: 10,
        justifyContent:"space-between",
        
      },
      openButton: {
        backgroundColor: "#056e5d",
        borderRadius: 5,
        padding: 10
      },
      batalButton: {
        backgroundColor: "#bf0628",
        borderRadius: 5,
        padding: 10
      },
})
