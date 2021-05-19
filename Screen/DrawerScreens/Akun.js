import React,{useState, useEffect} from 'react'
import { ScrollView,Dimensions, 
  StyleSheet, Text, View, Alert,Modal,Image, 
  TouchableOpacity,TextInput,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from "../Components/Loader";
import { useFocusEffect } from '@react-navigation/native';

const AkunScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataNama, setNama] = useState('');
  const [dataEmail, setEmail] = useState('');
  const [dataAlamat, setAlamat] = useState('');
  const [dataHp, setHp] = useState('');
  const [dataNoRm, setNoRm] = useState('');
  
  const [modalUbahAkun, setModalUbahAkun] = useState(false);
  const [modalUbahPassword, setModalUbahPassword] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [errortext1, setErrortext1] = useState('');
  const [isUpdateSukses, setSukses] = useState(false);
  const [passLama, setPassLama] = useState('');
  const [passBaru, setPassBaru] = useState('');
  const [passBaruUlang, setPassBaruUlang] = useState('');

    const [getValue1, setGetValue1] = useState('');
    const [dataNama1, setNama1] = useState('');
    const [dataEmail1, setEmail1] = useState('');
    const [dataAlamat1, setAlamat1] = useState('');
    const [dataHp1, setHp1] = useState('');
    const [dataNoRm1, setNoRm1] = useState('');
    const [getSink,setStatusSink] = useState('');
  
    
    useFocusEffect(
      
      React.useCallback(() => {
        let isActive = true;
        
      AsyncStorage.getItem('AppSession').then((getValue1) =>setGetValue1(getValue1));
       const fetchUser = () =>{
            var puk = {user_email: getValue1};
            fetch('http://10.5.50.33/php/select-userAkun.php', {
            method: 'POST',
            body: JSON.stringify(puk),
            headers: {
              Accept: 'application/json',
                      'Content-Type': 'application/json'
            },
          })
          .then((response) => response.json())
          .then((responseJson) => {
            setLoading(false);
            if (responseJson.status === 'success') {
              setNama1(responseJson.data.nama);
              setEmail1(responseJson.data.email);
              setNoRm1(responseJson.data.no_rm);
              setHp1(responseJson.data.nohp);
              setAlamat1(responseJson.data.alamat);
            } else {
              console.log('Tidak Ada Data');
            }
          })
          .catch((error) => {
            setLoading(false);
            Alert.alert('Tidak dapat terhubung');
          });
       }
       
       fetchUser();
      })
    );
    
  

  
  
 
   const saveUbah = () => {
    setLoading(true);
    var dataSave = {
      user_name: dataNama,
      user_email: dataEmail,
      user_address: dataAlamat,
      user_telepon: dataHp,
      user_norm : dataNoRm,
    };
    fetch('http://10.5.50.33/php/ubah-akun.php', {
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
          setErrortext('');
          setModalUbahAkun(!modalUbahAkun);
          Alert.alert('Akun Berhasil Dirubah');
        }else if(responseJson.status == 'ada'){
            setErrortext('No Rm Tidak Ditemukan, Masukan No RM yang valid');
        } else {
          console.log('Gagal');
        }
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert('Tidak dapat terhubung');
      });
   }
   const handleUbah = () => {
        setLoading(true);
        let dataToSend = {user_email: getValue1};
        fetch('http://10.5.50.33/php/select-userUbah.php', {
          method: 'POST',
          body: JSON.stringify(dataToSend),
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
              console.log(responseJson.data.no_rm);
              setModalUbahAkun(true);
              setNama(responseJson.data.nama);
              setEmail(responseJson.data.email);
              setNoRm(responseJson.data.no_rm);
              setHp(responseJson.data.nohp);
              setAlamat(responseJson.data.alamat);
              setStatusSink(responseJson.data.sink)
            } else {
              console.log('Tidak Ada Data');
            }
          })
          .catch((error) => {
            setLoading(false);
            Alert.alert('Tidak dapat terhubung');
          });
        
  }
  
  const saveUbahPassword = () =>{
    if (!passLama) {
      Alert.alert('Password Lama Wajib Di Isi');
      return;
    }
    if (passBaru != passBaruUlang){
      Alert.alert('Password dan Ulangi Password tidak sama');
      return;
    }
    if (passBaru.length < 8){
      Alert.alert('Password harus 8 angka atau lebih');
      return;
    }
    setLoading(true);
    var savePwd = {
      user_passLama: passLama,
      user_passBaru: passBaru,
      user_email: getValue1,
    };
    fetch('http://10.5.50.33/php/ubah-password.php', {
      method: 'POST',
      body: JSON.stringify(savePwd),
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
          setErrortext1('');
          setModalUbahPassword(!modalUbahPassword);
          AsyncStorage.clear();
          props.navigation.replace('Auth');
        }else if(responseJson.status == 'taksama'){
            setErrortext1('Password Lama Tidak Cocok');
        } else {
          console.log('Gagal');
        }
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert('Tidak dapat terhubung');
      });
  }
      return (
      

      <ScrollView
      keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <View style={styles.container}> 
      <Loader loading={loading} />
      <Modal
          animationType={'none'}
          transparent={true}
          visible={modalUbahAkun}
          onRequestClose={() => {
            setModalUbahAkun(!modalUbahAkun);
          }}>
             <View style={styles.centeredView}>
          <View style={styles.modal}>
          <Loader loading={loading} />
          <View style={styles.headerLine}>
            <Text style={styles.headerText}>Detail Akun</Text>
          </View>
          
          <Text style={styles.modalText}>Email</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyleDisable}
              onChangeText={(dataEmail) => setEmail(dataEmail)}
              underlineColorAndroid="#f000"
              placeholder="Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={false}
              value={dataEmail}
              editable = {false}
            />
          </View>
          <Text style={styles.modalText}>Nama</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(dataNama) => setNama(dataNama)}
              underlineColorAndroid="#f000"
              placeholder="Nama"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
              value={dataNama}
            />
          </View>
          
          <Text style={styles.modalText}>Alamat</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(dataAlamat) => setAlamat(dataAlamat)}
              underlineColorAndroid="#f000"
              placeholder="Alamat"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
              value={dataAlamat}
            />
          </View>
          <Text style={styles.modalText}>Nomor Telepon</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(dataHp) => setHp(dataHp)}
              underlineColorAndroid="#f000"
              placeholder="Nomor Hp / Telepon"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              keyboardType = 'numeric'
              blurOnSubmit={false}
              value={dataHp}
            />
          </View>
          <Text style={styles.modalTextmini}>*Nomor Rekam Medis Hanya dapat diubah satu kali. Masukan Nomor Rekam Medis Dengan Benar</Text>
          <Text style={styles.modalText}>Nomor Rekam Medis</Text>
          <View style={styles.SectionStyle}>
          {getSink == '1' ? (
              <TextInput
              style={styles.inputStyleDisable}
              onChangeText={(dataNoRm) => setNoRm(dataNoRm)}
              underlineColorAndroid="#f000"
              placeholder="Nomor Rekam Medis"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              keyboardType = 'numeric'
              blurOnSubmit={false}
              editable = {false}
              value={dataNoRm}
            />
            ) : 
            <TextInput
              style={styles.inputStyle}
              onChangeText={(dataNoRm) => setNoRm(dataNoRm)}
              underlineColorAndroid="#f000"
              placeholder="Nomor Rekam Medis"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              keyboardType = 'numeric'
              blurOnSubmit={false}
              value={dataNoRm}
            />
            }
            
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
          <View style={styles.contButtone}>
          <TouchableOpacity style={styles.openButton}
              onPress={saveUbah}
            >
              <Text style={styles.textStyle}>Simpan Perubahan</Text>
            </TouchableOpacity>
           <TouchableOpacity style={styles.batalButton}
              onPress={() => {
                setModalUbahAkun(!modalUbahAkun);
              }}
            >
              <Text style={styles.textStyle}>Batal</Text>
            </TouchableOpacity>
          </View>
          </View>
          </View>
        </Modal>
        <Loader loading={loading} />
      <Modal
          animationType={'none'}
          transparent={true}
          visible={modalUbahPassword}
          onRequestClose={() => {
            setModalUbahPassword(!modalUbahPassword);
          }}>
             <View style={styles.centeredView}>
          <View style={styles.modal}>
          <Loader loading={loading} />
          <Text style={styles.modalText}>Password Lama</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(passLama) => setPassLama(passLama)}
              underlineColorAndroid="#f000"
              placeholderTextColor="#8b9cb5"
              secureTextEntry={true}
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <Text style={styles.modalText}>Password Baru</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(passBaru) => setPassBaru(passBaru)}
              underlineColorAndroid="#f000"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
              secureTextEntry={true}
            />
          </View>
          <Text style={styles.modalText}>Ulangi Password</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(passBaruUlang) => setPassBaruUlang(passBaruUlang)}
              underlineColorAndroid="#f000"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
              secureTextEntry={true}
            />
          </View>
          {errortext1 != '' ? (
            <Text style={styles.errorTextStyle}> {errortext1} </Text>
          ) : null}
          <View style={styles.contButtone}>
          <TouchableOpacity style={styles.openButton}
              onPress={saveUbahPassword}
            >
              <Text style={styles.textStyle}>Simpan Perubahan</Text>
            </TouchableOpacity>
           <TouchableOpacity style={styles.batalButton}
              onPress={() => {
                setModalUbahPassword(!modalUbahPassword);
              }}
            >
              <Text style={styles.textStyle}>Batal</Text>
            </TouchableOpacity>
            </View>
          </View>
          </View>
        </Modal>
            <View style={styles.header}>
                <Text style={styles.textHead}>Akun</Text>
            </View>
            <Image source={require('../../Image/user.png')} style={styles.pp} />
            <View style={styles.box}>
              
              <View style={styles.detailUser}>
                <View style={styles.textDet}>
                  <Text style={styles.label}>Username / Email</Text>
                </View>
                <View style={styles.textDet}>
                <Text style={styles.label1}>{getValue1}</Text> 
                </View>
              </View>
               <View style={styles.detailUser}>
                <View style={styles.textDet}>
                  <Text style={styles.label}>Nama</Text>
                </View>
                <View style={styles.textDet}>
                <Text style={styles.label1}>{dataNama1}</Text> 
                </View>
              </View>
              <View style={styles.detailUser}>
                <View style={styles.textDet}>
                  <Text style={styles.label}>Alamat</Text>
                </View>
                <View style={styles.textDet}>
                <Text style={styles.label1}>{dataAlamat1}</Text> 
                </View>
              </View>
              <View style={styles.detailUser}>
                <View style={styles.textDet}>
                  <Text style={styles.label}>No Hp</Text>
                </View>
                <View style={styles.textDet}>
                <Text style={styles.label1}>{dataHp1}</Text> 
                </View>
              </View>
              <View style={styles.detailUser}>
                <View style={styles.textDet}>
                  <Text style={styles.label}>Nomor Rekam Medis</Text>
                </View>
                <View style={styles.textDet}>
                <Text style={styles.label1}>{dataNoRm1}</Text> 
                </View>
              </View> 
                <Text style={{color:'red',fontFamily :"TitilliumWeb-Bold",}}>*Untuk melakukan 
                sinkronisasi No rekam medis akun anda silahkan  tekan tombol Ubah Data
                </Text>

              
                <View style={styles.contButton}>
                 
                  <TouchableOpacity style={styles.buttonUbah}
                onPress={handleUbah}
                >
                   <View style={styles.tetIcon}>
                   <Text style={styles.buttonTextStyle}>Ubah Data</Text>
                   <Image source={require('../../Image/edit.png')} style={{width: 20, height:20, alignSelf: 'center', marginLeft: 10,}} />
                   </View>
                </TouchableOpacity>
               
                <TouchableOpacity style={styles.buttonUbPass}
                onPress={()=> setModalUbahPassword(!modalUbahPassword)}
                >
                  <View style={styles.tetIcon}>
                  <Text style={styles.buttonTextStyle}>Ubah Password</Text>
                 <Image source={require('../../Image/lock.png')} style={{width: 20, height:20, alignSelf: 'center', marginLeft: 10,}} />
                 </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle}  {...props}  onPress={() => {
            Alert.alert(
              'Logout',
              'Apakah anda yakin akan logout?',
              [
                {
                  text: 'Tidak',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Iya',
                  onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.replace('Auth');
                  },
                },
              ],
              {cancelable: false},
            );}} >
              <View style={styles.tetIcon}>
              <Text style={styles.buttonTextStyle}>Logout</Text>
              <Image source={require('../../Image/logout.png')} style={{width: 20, height:20, alignSelf: 'center', marginLeft: 10,}} />
              </View>
               
            </TouchableOpacity>
            
           </View>
           <Image source={require('../../Image/bg.png')} style={styles.ImageBackground}/>
            </View>
        </View>
        </ScrollView>
        
    )
}
export default AkunScreen
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    buttonStyle: {
      
        backgroundColor: '#e0524a',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        marginVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10
        
      },
      buttonUbah: {
      
        backgroundColor: '#33a652',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        marginVertical: 5,
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 10
      },
      buttonUbPass: {
      
        backgroundColor: '#e3b432',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        marginVertical: 5,
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 10
      },
      buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
      },
      container :{
        flex:1 ,
        marginBottom: 10
    },
    bg :{
        width:windowWidth*1,
        height:windowHeight*1,
    },
    header:{
        backgroundColor:'#2ba631',
        height : windowHeight*0.10,
        
    },
    tetIcon :{
      flexDirection: 'row'
    },
    textHead :{
        color: '#ffffff',
        fontSize: 24,
        fontFamily:"TitilliumWeb-Bold",
        paddingVertical: 20,
        paddingLeft:30,
    },
    
    pp:{
        marginTop: 20,
        alignSelf:'center',
        width: 100,
        height: 100,
        marginBottom: 30,
    },
    box:{
        backgroundColor:'#ffffff',
        borderRadius: 20,
        padding: 20,
        marginHorizontal:15,
        marginTop: 15,
        
    },
    label:{
        fontFamily:"TitilliumWeb-Bold",
        fontSize: 14,
        marginVertical: 5,
        color: '#000000' ,
    },
    label1 :{
      fontFamily:"TitilliumWeb-Bold",
      fontSize: 14,
      marginVertical:5,
      color: '#1b618f',
  },
    contButton:{
      flexDirection: 'column',
      padding: 10,
    },
    contButtone:{
      flexDirection: 'row',
      padding: 10,
      justifyContent:"space-between",
      
    },
    detailUser:{
      flexDirection:'row',
    },
    textDet:{
      width : windowWidth*0.4,
    },
    headerText:{
      fontFamily :"TitilliumWeb-Bold",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 17,
      marginVertical: 10,
    },
    headerLine:{
      width: '80%',
      padding: 10,
      borderBottomColor: '#d1cfcf',
      borderBottomWidth: 1,
      marginBottom: 15,
    },
    ImageBackground:{
      flexDirection:'column',
      justifyContent:'space-between',
      alignSelf:'center',
      width: 300,
      height:100,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: '#00000060',
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
    textStyle: {
      fontFamily :"TitilliumWeb-Bold",
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      fontFamily :"TitilliumWeb-Bold",
      alignSelf: 'flex-start',
      marginHorizontal: 35,

    },
    inputStyle: {
      flex: 1,
      color: '#000000',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#dadae8',
    },
    SectionStyle: {
      flexDirection: 'row',
      height: 40,
      marginHorizontal: 30,
      margin: 10,
    },
    errorTextStyle: {
      color: 'red',
      textAlign: 'center',
      fontSize: 14,
    },
    modalTextmini:{
      fontFamily :"TitilliumWeb-Regular",
      alignSelf: 'flex-start',
      marginHorizontal: 35,
      fontSize: 11,
      color: 'red'
    },
    inputStyleDisable:{
      flex: 1,
      color: '#000000',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#dadae8',
      backgroundColor:'#b6b7b8',
    }
})
