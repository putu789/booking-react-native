import React,{useState,useEffect} from 'react'
import { StyleSheet, Text,TextInput,Alert,
     View,Dimensions, SafeAreaView,Image,
     StatusBar,TouchableOpacity, FlatList} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Loader  from "../Components/Loader";
import { useFocusEffect } from '@react-navigation/native';
import {WebView}  from "react-native-webview";
import moment from 'moment';

const Riwayat = () => {
    const [loading, setLoading] = useState(false);
    const [getValue, setGetValue] = useState('');
    const [tglPeriksa, setTglPeriksa] = useState('');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('calendar');
    const [show, setShow] = useState(false);
    const [tglPeriksa1, setTglPeriksa1] = useState('');
    const [date1, setDate1] = useState(new Date());
    const [mode1, setMode1] = useState('calendar');
    const [show1, setShow1] = useState(false);
    const [tglAwal, setTanggalAwal] = useState('');
    const [tglAkhir, setTanggalAkhir] = useState('');

    const [cariSukses, cariRiwayat] = useState(false);
    const [dataNama1, setNama1] = useState('');
    const [dataEmail1, setEmail1] = useState('');
    const [dataAlamat1, setAlamat1] = useState('');
    const [dataHp1, setHp1] = useState('');
    const [dataNoRm1, setNoRm1] = useState('');
    const [getKos, setKos] = useState('');
    const [dataSource, setDataSource] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1)  + "-" + date.getDate() 
    const formattedDate1 = date1.getFullYear() + "-" + (date1.getMonth() + 1)  + "-" + date1.getDate() 
    const onChange = (event, selectedDate) => {
        setTglPeriksa(tglPeriksa);
        const tagalke = moment(selectedDate).format("YYYY-MM-DD");
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setTanggalAwal(tagalke);
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('calendar');
      };
      const onChange1 = (event1, selectedDate1) => {
        setTglPeriksa1(tglPeriksa1);
        const currentDate1 = selectedDate1 || date1;
        const tagalke1 = moment(selectedDate1).format("YYYY-MM-DD");
        setShow1(Platform.OS === 'ios');
        setDate1(currentDate1);
        setTanggalAkhir(tagalke1);
    }
    const showMode1 = (currentMode1) => {
        setShow1(true);
        setMode1(currentMode1);
      };
    
      const showDatepicker1 = () => {
        showMode1('calendar');
      };
     
      
      useFocusEffect(
      
        React.useCallback(() => {
          let isActive = true;
          
        AsyncStorage.getItem('AppSession').then((getValue) =>setGetValue(getValue));
         const fetchUser = () =>{
              var puk = {user_email: getValue};
              fetch('http://daftar.asysyifa-sambi.com/php/select-userAkun.php', {
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
              Alert.alert('Tidak dapat terhubung');
            });
         }
         
         fetchUser();
        })
      );
     
        const btnCari = ()=>{
            setLoading(true);
           var puk = {tanggal_1: formattedDate, tanggal_2: formattedDate1, no_rm :dataNoRm1};
              fetch('http://daftar.asysyifa-sambi.com/php/history.php', {
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
                console.log(responseJson.data);
                cariRiwayat(true);
                setDataSource(responseJson.data);
                if(responseJson.data == 'null'){
                    setKos('Tidak Ada Data');
                }
              } else {
                console.log('Tidak Ada Data');
              }
            })
            .catch((error) => {
              setLoading(false);
              Alert.alert('Tidak dapat terhubung');
            });
         
          
        }
       var styleE = '<style>p{ font-size: 55px;font-weight: bold;}</style>';
        const Item = ({ item, onPress, style }) => (
          <View style={[styles.boxItem, style]}>
            <View style={styles.boxJudul}>
              <View style={styles.boxJu}>
              <Text style={styles.judule}>Tanggal Periksa : {item.tgl}</Text>
              <Text style={styles.judule}>{item.stts_lanjut}</Text>         
              </View>
              <View style={styles.boxJu}>
              <Text style={styles.judule}>Dokter : {item.nm_dokter}</Text>
                      
              </View>
              <Text style={styles.judule}>Poliklinik : {item.nm_poli}</Text> 
            </View>
            <View style={styles.bodyBox}>
            <View style={styles.bodyBoxDetail}>
            <Image  source={{uri: 'http://daftar.asysyifa-sambi.com/php/img/keluhan.png'}} style={{
                                width: 25,
                                height:25,}} />
            <Text style={styles.title}>Keluhan :{item.keluhan}</Text>
            </View>
            <View style={styles.bodyBoxDetail}>
            <Image  source={{uri: 'http://daftar.asysyifa-sambi.com/php/img/diagnosis.png'}} style={{
                                width: 30,
                                height:30,}} />
                                <Text style={styles.title}>Diagnosa : </Text>
                                <WebView source={{html : styleE+item.diagnosa}}  
                                 originWhitelist={['*']} style={{padding: 20,height:100}}/>
            {/* <Text style={styles.title}>Diagnosa : {item.diagnosa}</Text> */}
            </View>
                
            </View>
           
          </View>
        );
        
          if (cariSukses) {
            return (
              <SafeAreaView style={{flex: 1}}>
                <StatusBar backgroundColor='#2ba631'/>
                  <View style={{flex: 1}}>
                    <View style={styles.box}>
                     <Text style={styles.labelText}>Riwayat Pemeriksaan</Text>
                     {getKos != '' ? (
                      <Text style={styles.title}> {getKos} </Text>
                    ) : null}
                     <FlatList
                      data={dataSource}
                      renderItem={Item}
                      keyExtractor={(item) => item.no_rawat}
                      extraData={selectedId}
                    />
                    </View>
                    </View>
                </SafeAreaView>
            );
          }
    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar backgroundColor='#2ba631'/>
            <View style={{flex: 1}}>
            <Loader loading={loading} />
            <View style={styles.box}>
            <Text style={styles.labelText}>Pilih Tanggal</Text>
            
            <View style={styles.SectionStyle}>
                <TextInput style={styles.inputStyle} placeholder="Tanggal Awal"
                editable={false} 
                style={styles.inputStyle} 
                value={tglAwal}
                 />
                <TouchableOpacity style={{alignContent:'center',padding:5,}} onPress={showDatepicker}>
                    <Image 
                    style={{width: 30, height: 30, alignItems:'center'}} 
                    source={require('../../Image/datPicker.png')}/>
                </TouchableOpacity>
                <TextInput style={styles.inputStyle} placeholder="Tanggal Akhir" editable={false} 
                style={styles.inputStyle} 
                value={tglAkhir}/>
                <TouchableOpacity style={{alignContent:'center',padding:5,}}  onPress={showDatepicker1} >
                    <Image 
                    style={{width: 30, height: 30, alignItems:'center'}} 
                    source={require('../../Image/datPicker.png')}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={btnCari}
              >
              <Text style={styles.buttonTextStyle}>Cek Riwayat</Text>
            </TouchableOpacity>
            </View>
            </View>
            <Image source={require('../../Image/bg.png')} style={styles.ImageBackground}/>
            {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              display="default"
              onChange={onChange}
              format="YYYY-MM-DD"
            />
          )}
          {show1 && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date1}
              mode={mode1}
              display="default"
              onChange={onChange1}
              format="YYYY-MM-DD"
            />
          )}
        </SafeAreaView>
    )
}

export default Riwayat
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    box:{
        backgroundColor:'#ffffff',
        borderRadius: 5,
        padding: 10,
        marginHorizontal:10,
        marginTop: 10,
        marginBottom: 60,
    },
    SectionStyle: {
      flexDirection: 'row',
      height: 40,
      marginTop: 5,
      marginHorizontal:5,
      margin: 10,
    },
    SectionStyleBook: {
      flexDirection: 'row',
      marginTop: 5,
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
    pickerStyle: {
      flex: 1,
      color: '#000000',
      padding: 10,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#dadae8',
    },
    contButtone:{
      flexDirection: 'row',
      padding: 10,
      marginTop: 30,
      
    },
    label:{
      fontFamily:"TitilliumWeb-Bold",
      fontSize: 14,
      marginVertical: 5,
      color: '#000000' ,
      marginHorizontal:20,
    },
    label1 :{
    fontFamily:"TitilliumWeb-Bold",
    fontSize: 14,
    marginVertical:5,
    color: '#1b618f',
    },
    labelDet:{
      fontFamily:"TitilliumWeb-Bold",
      fontSize: 14,
      marginVertical: 5,
      color: '#000000',
    },
    detailUser:{
      flexDirection:'row',
    },
    textDet:{
      width : windowWidth*0.4,
    },
    
    labelText:{
      fontFamily:"TitilliumWeb-Bold",
      fontSize: 16,
      marginVertical: 15,
      color: '#000000',
      alignSelf:'center'
    },
    buttonStyle: {
        
      backgroundColor: '#e36227',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#7DE24E',
      height: 40,
      alignItems: 'center',
      borderRadius: 5,
      marginHorizontal: 5,
      marginTop: 5,
      marginBottom: 20,
    },
    buttonTextStyle: {
      fontFamily:"TitilliumWeb-Bold",
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
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
    
    textStyle:{
      fontFamily :"TitilliumWeb-Bold",
      color: "white",
      fontWeight: "bold",
    },
   
    title: {
      fontFamily :"TitilliumWeb-Bold",
      fontSize: 14,
    },
    boxItem :{
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderRadius: 5,
      marginVertical: 8,
      marginHorizontal: 16,
      borderWidth : 1,
      borderColor: '#152359'
    },
    boxJudul : {
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      marginTop: 0,
      backgroundColor:'#152359',
      padding: 10,
      borderWidth : 1,
      borderColor: '#152359',
      
    },
    boxJu:{
      flexDirection:'row',
      justifyContent: 'space-between'
    },
    bodyBox:{
      padding: 10,
    },
    bodyBoxDetail:{
      flexDirection:'row',
    },
    judule:{
      fontFamily :"TitilliumWeb-Bold",
      fontSize: 12,
      color:'#ffffff'
    }
})
