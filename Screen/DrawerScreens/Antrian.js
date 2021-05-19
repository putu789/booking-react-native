
import React,{useState, useEffect} from 'react';
import {View, Text, SafeAreaView,Alert,
  Dimensions,StyleSheet,ImageBackground,
  Image,RefreshControl,ScrollView,TouchableOpacity,FlatList
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const AntrianScreen = ({ userId }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [getValue3, setGetValue3] = useState('');
  const [statuse, setStatus] = useState('');
  const [dataDokter, setDokter] = useState('');
  const [dataPoli, setPoli] = useState('');
  const [kodeBooking, setKodeBooking] = useState('');
  const [qrCode, setQr] = useState('');
  const [noUrut, setUrut] = useState('');
  const [jmlhBelum, setJmlhBelum]= useState('');
  const [jmlSudah, setJmlhSudah] = useState('');
  const [noTerakhir, setNoTerakhir] = useState('');
  const [dirawat, setJmlhPerawat] = useState('');
  const [kurang, setKurang] = useState('');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  
  useFocusEffect(
    React.useCallback(() => {
     
       AsyncStorage.getItem('AppSession').then(
        (value) =>
        setGetValue3(value),
      );
     
      const fetchUser = () =>{
     var pik = {emaile: getValue3};
                fetch('http://10.5.50.33/php/getAntrian.php', {
                method: 'POST',
                body: JSON.stringify(pik),
                headers: {
                  Accept: 'application/json',
                          'Content-Type': 'application/json'
                },
              })
              .then((response) => response.json())
              .then((responseJson) => {
                setLoading(false);
                if (responseJson.status === 'success') {
                 /*  setNama3(responseJson.data.nama);
                  setEmail3(responseJson.data.email);
                  setNoRm3(responseJson.data.no_rm);
                  setHp3(responseJson.data.nohp);
                  setAlamat3(responseJson.data.alamat); */
                  console.log(responseJson.data);
                  setDokter(responseJson.data.nm_dokter);
                  setPoli(responseJson.data.nm_poli);
                  setStatus(responseJson.data.status);
                  setKodeBooking(responseJson.data.kd_booking);
                  setUrut(responseJson.data.noreg);
                  setQr(responseJson.data.qrcode);
                  setNoTerakhir(responseJson.data.terakhir);
                  setJmlhBelum(responseJson.data.urung);
                  setJmlhSudah(responseJson.data.sudah);
                  setJmlhPerawat(responseJson.data.perawat);
                } else {
                  setStatus('gagal');
                  console.log('gagal');
                  /* 
                  console.log(responseJson.data);
                  setDokter(responseJson.data.nm_dokter);
                  setPoli(responseJson.data.nm_poli);
                  setStatus(responseJson.data.status);
                  setKodeBooking(responseJson.data.kd_booking); */
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
  if(statuse == 'gagal'){
    return(
      <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        
      <View style={styles.header}>
                <Text style={styles.textHead}>ANTRIAN</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.judulNo}>Anda Tidak Memiliki Jadwal Periksa Untuk Hari Ini</Text>
        <Text style={styles.textRefresh}>Swipe Kebawah Untuk Menyegarkan Halaman Ini</Text>
      </View>
      <Image source={require('../../Image/bg.png')} style={styles.ImageBackground}/>
      </ScrollView>
      </SafeAreaView>
    )
  }else{
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        
      <View style={styles.header}>
                <Text style={styles.textHead}>ANTRIAN</Text>
      </View>
      <View style={styles.box}>
      
        <TouchableOpacity style={styles.itemBox}>
        <Text style={styles.itemBoxText}>Anda Terdaftar untuk hari ini</Text>
          <Text style={styles.itemBoxText}>{dataDokter}</Text>
          <Text style={styles.itemBoxText}>{dataPoli}</Text>
        </TouchableOpacity>
        <ImageBackground  source={{uri: 'http://10.5.50.33/php/img/antri.png'}}
        style={styles.imageAntri}
         >
           <Text style={styles.judulNo}>No Antrian</Text>
           <Text style={styles.bodyNo}>{noUrut}</Text>
           <Text style={styles.statusVerif}>status verivikasi : </Text>
           <Text style={styles.statusVerif1}>{statuse}</Text>
           
         </ImageBackground>
         <View style={styles.sudahLayani}>
           <Text style={styles.sudahLayaniText}>Sudah Dilayani Dokter :</Text>
           <View style={styles.numLayani}>
              <Text style={styles.numLayaniText}>{jmlSudah}</Text>
           </View>
          </View>
          <View style={styles.sudahLayani}>
           <Text style={styles.sudahLayaniText}>Sudah Dilayani Perawat :</Text>
           <View style={styles.numLayani}>
              <Text style={styles.numLayaniText}>{dirawat}</Text>
           </View>
          </View>
          <View style={styles.sudahLayani}>
           <Text style={styles.sudahLayaniText}>Belum Dilayani  :</Text>
           <View style={styles.numLayani}>
              <Text style={styles.numLayaniText}>{jmlhBelum}</Text>
           </View>
          </View>
          <View style={styles.sudahLayani}>
           <Text style={styles.sudahLayaniText}>No. Terakhir Dilayani Dokter :</Text>
           <View style={styles.numLayani}>
              <Text style={styles.numLayaniText}>{noTerakhir}</Text>
           </View>
          </View>
          <View style={styles.detailData}>
            <Image source={{uri: 'http://10.5.50.33/php/img/resume.png'}} style={{ width: 25,
                            height:25,marginRight: 5,}}/>
            <Text style={styles.detailText}>
              QR CODE Dan Kode Booking
            </Text>
          </View>
          <View style={styles.detailDataPas}>
            <Text style={styles.judulNo}>Kode Booking : {kodeBooking}</Text>
            <Image source={{uri: 'http://10.5.50.33/qrcode/'+qrCode+''}} style={{
                            width: 200,
                            height:200,alignSelf:'center'
                            }}/>
          </View>
        
        <Text style={styles.textRefresh}>Swipe Kebawah Untuk Menyegarkan Halaman Ini</Text>
      
      </View>
      <Image source={require('../../Image/bg.png')} style={styles.ImageBackground}>
        
      </Image>
      </ScrollView>
    </SafeAreaView>
  );
                          }
};

export default AntrianScreen;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  box:{
    backgroundColor:'#ffffff',
    borderRadius: 5,
    padding: 20,
    
  },
  header:{
    backgroundColor:'#2ba631',
    height : windowHeight*0.10,
    
},
textHead :{
    color: '#ffffff',
    fontSize: 24,
    fontFamily:"TitilliumWeb-Bold",
    paddingVertical: 20,
    paddingLeft:30,
},
imageAntri:{
  alignSelf:'center',
  height:180,
  width:140
},
judulNo:{
  fontSize: 18,
  fontFamily:"TitilliumWeb-Bold",
  marginHorizontal: 20,
  color :'#2b2b2b',
  marginTop: 20,
},
statusVerif:{
  fontSize: 12,
  fontFamily:"TitilliumWeb-Bold",
  marginHorizontal: 20,
  color :'#2b2b2b',
  marginTop:-10,
  alignSelf:'center'
},
statusVerif1:{
  fontSize: 12,
  fontFamily:"TitilliumWeb-Bold",
  marginHorizontal: 20,
  color :'#2aa34b',
  alignSelf:'center'
},
bodyNo:{
  fontSize: 80,
  fontFamily:"TitilliumWeb-Bold",
  alignSelf:'center',
  color :'#2b2b2b',
},
sudahLayani:{
  flexDirection:'row',
  marginTop:5,
},
sudahLayaniText :{
  fontSize: 11,
  fontFamily:"TitilliumWeb-Bold",
  alignSelf:'center',
  color :'#2b2b2b',
  marginRight: 10,
  marginHorizontal: 30
},
numLayani :{
  backgroundColor:'#403e3e',
  borderRadius: 5,
  paddingHorizontal: 15,
},
numLayaniText :{
  fontSize: 11,
  fontFamily:"TitilliumWeb-Bold",
  alignSelf:'center',
  color :'#ffffff',
},
detailData:{
  flexDirection:'row',
  marginTop:20,
  marginHorizontal: 20,
},
detailText :{
  fontSize: 14,
  fontFamily:"TitilliumWeb-Bold",
  alignSelf:'center',
  color :'#403e3e',
},
textRefresh :{
  fontSize: 14,
  fontFamily:"TitilliumWeb-Bold",
  color :'#d14f4f',
  marginTop: 15,
  marginHorizontal: 20,
},
textKet :{
  fontSize: 11,
  fontFamily:"TitilliumWeb-Bold",
  color :'#d14f4f',
  marginHorizontal: 20,
},
detailDataPas:{
  marginTop:5,
  marginHorizontal: 50,
},
ImageBackground:{
  flexDirection:'column',
  justifyContent:'space-between',
  alignSelf:'center',
  width: 300,
  height:100,
},
itemBox:{
  marginHorizontal:15,
  backgroundColor:'#40cf66',
  borderBottomRightRadius: 10,
  borderTopRightRadius:10,
  padding: 10,
  marginBottom: 15
},
itemBoxText:{
  fontSize: 14,
  fontFamily:"TitilliumWeb-Bold",
  color :'#ffffff',
}
})