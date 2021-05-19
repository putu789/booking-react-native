import React,{useState, useEffect} from 'react';
import {View,Modal, Text, 
  SafeAreaView, Button,StyleSheet, ImageBackground,
  Dimensions, StatusBar, Image, RefreshControl,
  Alert,TouchableOpacity,ScrollView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Loader from "../Components/Loader";
import moment from 'moment';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
const Stack = createStackNavigator();
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const HomeScreen = ({props, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [getValue1, setGetValue1] = useState('');
  const [getValue, setGetValue] = useState('');
  const [norm, setnorm]= useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [dataNama1, setNama1] = useState('');
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const jam = moment().format('HH:mm:ss');
  var selamat = '';
  if (jam < '12:00:00:00'&& jam > '03:00:00:00' ) {
    selamat = 'Selamat Pagi';
  }else if (jam > '12:00:00:00' && jam < '15:00:00:00') {
    selamat = 'Selamat Siang';
  }else if (jam > '15:00:00:00' && jam < '18:00:00:00') {
    selamat = 'Selamat Sore';
  }else{
    selamat = 'Selamat Malam';
  }
  useEffect(() => {
    AsyncStorage.getItem('AppSession').then(
      (value) =>
        setGetValue1(value),
    );
    AsyncStorage.getItem('AppSession1').then(
      (value) =>
        setGetValue(value),
    );
  }, []);
  useFocusEffect(
      
    React.useCallback(() => {
      
    })
  )
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
  const handleDaftar = (valuene) => {
      setLoading(true);
      let dataToSend = {user_email: getValue1};
      fetch('http://10.5.50.33/php/select-user.php', {
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
            var valuene = responseJson.data.no_rm;
            setnorm(valuene);
            console.log(responseJson.data.no_rm);
            navigation.navigate('RegisterStepOne',{
              paramKey: getValue1,
            });
          } else {
            Alert.alert(
              'Gagal',
              'No rekam medis Belum Di sinkronkan, sinkronkan Sekarang?',
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
                    navigation.navigate('Akun');
                  },
                },
              ],
              {cancelable: false},);
            console.log('Tidak Ada Data');
          }
        })
        .catch((error) => {
          setLoading(false);
          Alert.alert('Tidak dapat terhubung');
        });
    
    
  }
  const jadwalPress = () =>{
      navigation.navigate('Jadwal');
    
  }
  const riwayatPress=()=>{
      setLoading(true);
      let dataToSend = {user_email: getValue1};
      fetch('http://10.5.50.33/php/select-user.php', {
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
            navigation.navigate('Riwayat');
          } else {
            Alert.alert(
              'Gagal',
              'Akun anda belum sinkron, Riwayat tidak dapat diakses. sinkronkan Sekarang?',
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
                    navigation.navigate('Akun');
                  },
                },
              ],
              {cancelable: false},);
            console.log('Tidak Ada Data');
          }
        })
        .catch((error) => {
          setLoading(false);
          Alert.alert('Tidak dapat terhubung');
        });
    
   
  }

  const kartuPress = () => {
      setLoading(true);
      let dataToSend = {user_email: getValue1};
      fetch('http://10.5.50.33/php/select-user.php', {
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
            setnorm(responseJson.data.no_rm);
            navigation.navigate('Kartu',{paramKey : norm,});
          } else {
            Alert.alert(
              'Gagal',
              'No rekam medis Belum Di sinkronkan, sinkronkan Sekarang?',
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
                    navigation.navigate('Akun');
                  },
                },
              ],
              {cancelable: false},);
            console.log('Tidak Ada Data');
          }
        })
        .catch((error) => {
          setLoading(false);
          Alert.alert('Tidak dapat terhubung');
        });
   
    
  }
  const notifPress=()=>{
    navigation.navigate('Akun');
  }
  return (
    
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
      <Loader loading={loading} />
        <StatusBar backgroundColor='#2ba631'/>
        <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false} 
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      >
        <View style={styles.header}>
          <View style={styles.contUser}>
          
          <Image source={require('../../Image/userDefault.png')}style={{
                  width: '20%',
                  resizeMode: 'contain',
                  marginVertical: -230
                }}/>
                
          <View style={styles.contSubUser}>
          <Text style={styles.jam}>Halo , {selamat} </Text>
            <Text style={styles.userName}> {dataNama1}</Text>
          </View>
          </View>
          
          <View style={{marginTop: -100,
            marginRight:20,
            alignItems: 'flex-end',}}> 
            <TouchableOpacity onPress={notifPress}>
            <Image source={require('../../Image/bell.png')}style={{
                  width: 50,
                  height:50,
                  
                }}/>
                </TouchableOpacity>
                <View style={{marginTop:-35,marginRight:5}}>
                
                <Badge status="error"  value={<Text style={styles.badgeText}>1</Text>}  />
                </View>
            
            </View>
           
          {/* <Image source={require('../../Image/bell.png')}style={{
                  width: 70,
                  resizeMode: 'contain',
                  marginVertical: -230,
                  alignSelf: 'flex-end',
                  marginRight: 10,
                }}/>
        
          <ImageBackground source={require('../../Image/badge.png')}style={{
            width: 25,
            height:25,
            marginTop: 65,
            marginRight:20,
            alignSelf: 'flex-end',
          }}/>
          <Text style={styles.badgeText}>10</Text>  */}
        </View>
        <View style={styles.container}> 
        <View style={styles.contDaftar}>
          <Image source={require('../../Image/logoBeranda.png')} style={{
                  width: 32,
                  height:35,
                }}/>
          <View style={styles.contSubDaftar}>
              <Text style={styles.textDaftarHead}>Booking Pendaftaran</Text>
              <Text style={styles.textDaftarbody}>Booking periksa dengan mudah dan cepat</Text>
          </View>
          <TouchableOpacity style={styles.btnDaftar}  onPress={handleDaftar}>
            <Text style={styles.txtBtn}>Daftar</Text>
          </TouchableOpacity>
        </View>
            <View style={styles.contMenuIcon}>
              <TouchableOpacity onPress={()=>navigation.navigate('Kamar')} >
              <View style={styles.button}>
                <Image style={styles.iconBtn} source={require('../../Image/hospital-bed.png')} />
                </View>
                <Text style={styles.titleIcon}>Kamar</Text>
              </TouchableOpacity>
              <TouchableOpacity  onPress={jadwalPress}>
              <View style={styles.button}>
                <Image style={styles.iconBtn} source={require('../../Image/Calendar.png')} />
                </View>
                <Text style={styles.titleIcon}>Jadwal Dokter</Text>
              </TouchableOpacity >
              <TouchableOpacity onPress={riwayatPress}>
                <View style={styles.button}>
                <Image style={styles.iconBtn} source={require('../../Image/riwayat.png')} />
                </View>
                <Text style={styles.titleIcon}>Riwayat</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate('Resep')}>
                <View style={styles.button}>
                <Image style={styles.iconBtn} source={require('../../Image/resep.png')} />
                </View>
                <Text style={styles.titleIcon}>Cek Kode Booking</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contMenuIcon}>
              <TouchableOpacity onPress={kartuPress}>
              <View style={styles.button}>
                <Image style={styles.iconBtn} source={require('../../Image/card.png')} />
                </View>
                <Text style={styles.titleIcon}>Kartu Pasien</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate('Keluarga')}>
              <View style={styles.button}>
                <Image style={styles.iconBtn} source={require('../../Image/family.png')} />
                </View>
                <Text style={styles.titleIcon}>Daftar Keluarga</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate('Aduan')}>
              <View style={styles.button}>
                <Image style={styles.iconBtn} source={require('../../Image/info.png')} />
                </View>
                <Text style={styles.titleIcon}>Info Lain</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate('About')}>
              <View style={styles.button}>
                <Image style={styles.iconBtn} source={require('../../Image/about.png')} />
                </View>
                <Text style={styles.titleIcon}>About</Text>
              </TouchableOpacity>
            </View>
        </View>
        <View style={styles.compSlideTop}>
        <Image style={{width:'100%',height: 60}}  source={{uri: 'http://10.5.50.33/php/img/pengu.png'}} />
        </View>
        <View style={styles.compSlideBot}>
                <View style={styles.contBottomSlide}>
                  <ScrollView 
                  horizontal={true} 
                  showsHorizontalScrollIndicator={false} 
                  decelerationRate='fast'
                  pagingEnabled
                  >
                  <View style={styles.itemImage}>
                  <TouchableOpacity>
                  <Image source={{uri: 'http://10.5.50.33/php/img/news.jpg'}} style={{width: 200, height: 200}}  />
                  </TouchableOpacity>
                  </View>
                  <View style={styles.itemImage}>
                  <TouchableOpacity>
                  <Image source={{uri: 'http://10.5.50.33/php/img/news1.jpg'}} style={{width: 200, height: 200}}  />
                  </TouchableOpacity>
                  </View>
                  <View style={styles.itemImage}>
                  <TouchableOpacity>
                  <Image source={{uri: 'http://10.5.50.33/php/img/news2.jpg'}} style={{width: 200, height: 200}}  />
                  </TouchableOpacity>
                  </View>
                  <View style={styles.itemImage}>
                  <TouchableOpacity>
                  <Image source={{uri: 'http://10.5.50.33/php/img/news3.jpg'}} style={{width: 200, height: 200}}  />
                  </TouchableOpacity>
                  </View>
                  <View style={styles.itemImage}>
                  <TouchableOpacity>
                  <Image source={{uri: 'http://10.5.50.33/php/img/news4.jpg'}} style={{width: 200, height: 200}}  />
                  </TouchableOpacity>
                  </View>
                  <View style={styles.itemImage}>
                  <TouchableOpacity>
                  <Image source={{uri: 'http://10.5.50.33/php/img/news5.jpg'}} style={{width: 200, height: 200}}  />
                  </TouchableOpacity>
                  </View>
                  
                  </ScrollView>
                </View>
        </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  header:{
    height:windowHeight*0.3,
    paddingTop:15,
    paddingLeft:15,
    backgroundColor: '#2ba631',
  },  
  btnDaftar :{
    backgroundColor: '#4bab49',
    padding : 10,
    borderRadius: 5,
  },
  textPend :{
    fontFamily :"TitilliumWeb-Bold",
    color : '#ffffff'
  },
  container:{
    backgroundColor:"#ffffff",
    padding: 17,
    marginHorizontal:20,
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 2.22,

    elevation: 3,
    marginTop: -windowHeight*0.13,
    height : 'auto',
        },
  contUser :{
    flexDirection: 'row',
    marginVertical: 30,
  },
  contSubUser :{
    flexDirection:'column',
  },
  userName :{
    fontFamily :"TitilliumWeb-Bold",
    fontSize : 17,
    marginHorizontal:20 ,
    marginVertical:5 ,
    color: '#ffffff',
  },
  jam :{
    fontFamily :"TitilliumWeb-Bold",
    fontSize : 17,
    marginHorizontal:20 ,
    color: '#ffffff',
  },
 
  contDaftar:{
    flexDirection: 'row',
    marginBottom : 20,
    justifyContent:"space-between",
  } ,     
  textDaftarHead:{
    fontFamily :"TitilliumWeb-Bold",
    fontSize : 17,
    marginHorizontal:5 ,
  },
  contSubDaftar:{
    flexDirection: 'column',
  } , 
  textDaftarbody:{
    fontFamily :"TitilliumWeb-regular",
    fontSize : 9,
    marginHorizontal:5 ,
  },
  btnDaftar:{
    padding: 6,
    alignSelf: 'flex-end',
    backgroundColor: '#7bd654',
    borderRadius: 4
  },
  txtBtn :{
    fontFamily :"TitilliumWeb-Bold",
    fontSize : 14,
    color: '#ffffff',
  },
  contMenuIcon :{
    flexDirection:"row",
        justifyContent:"space-between",
        marginTop:10,
        flexWrap:"wrap",
  },
  iconBtn:{
    width: 45,
    height:45,
    alignSelf: 'center',
  },
  titleIcon :{
    fontFamily:"TitilliumWeb-Bold",
    fontSize:10,
    textAlign:"center",
    marginBottom:8,
  
  },
  button:{
    marginBottom:10,
  } ,
  compSlideTop:{
    backgroundColor:"#ffffff",
    marginVertical:5,
    height: windowHeight*0.1,
    padding: 5
  },
  compSlideBot:{
    backgroundColor:"#ffffff",
    height: 'auto',
    padding: 10,
    position: 'relative',
    bottom: 0,
  },
  contBottomSlide:{
    width: '100%',
    flexDirection: 'row',
  },
  itemImage:{
    padding:5,
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
  batalButton: {
    backgroundColor: "#bf0628",
    borderRadius: 5,
    padding: 10
  },
  bell:{
    alignSelf: 'flex-end',
    marginTop: -5,
    position: 'absolute',
  },
  badgeText:{
    color: '#ffffff',
    fontSize: 12,
    fontWeight:'bold',
  }
})
