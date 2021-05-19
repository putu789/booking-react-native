import React,{useState,useEffect} from 'react'
import { StyleSheet, 
    Text, View, Dimensions, SafeAreaView,
    TextInput,Modal, TouchableOpacity,Image,Alert,
    StatusBar,FlatList } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import  Loader  from "../Components/Loader";
import moment from 'moment';
const Resep = () => {
    const [loading, setLoading] = useState(false);
    const [tglPeriksa, setTglPeriksa] = useState('');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('calendar');
    const [show, setShow] = useState(false);
    const [getNorm, setNorm] = useState('');
    const [caribooking, setcaribooking] = useState('');
    const [errortext, setErrortext] = useState('');
    const [getHasil, setHasil] = useState('');
    const [getData, setData] = useState([]);
    const [getKdBooking, setKdBooking] = useState('');
    const [selectedId, setSelectedId] = useState(null);
    const [batalsukses, setBatalSukses] = useState(false);
    
    const [alertModal, setAlertModal] = useState(false);
    
    const formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1)  + "-" + date.getDate() 
    const saiki = date;
    const day = moment(saiki).format("dddd");
    const tagalke = moment(saiki).format("YYYY-MM-DD");
   
    

    const onChange = (event, selectedDate) => {
        setTglPeriksa(tglPeriksa);
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('calendar');
      };
      const cekBooking =()=>{
            if (!getNorm) {
                Alert.alert('Nomor Rekam Medis Wajib Di Isi');
                return;
              }
              setLoading(true);
              var dataToSend = {
                no_rm: getNorm,
                tgl_periksa: tagalke,
              };
              fetch('http://daftar.asysyifa-sambi.com/php/getBookingData.php', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                setLoading(false);
                console.log(responseJson);
                if (responseJson.status == 'success') {
                 setcaribooking(true);
                 setData(responseJson.data);
                 console.log('Mendapatkan');
                }else if(responseJson.status == 'nothing'){
                    setcaribooking(true);
                    setErrortext('Data Booking Tidak Ditemukan');
                }
            })
            .catch((error) => {
                setLoading(false);
                Alert.alert('Tidak dapat terhubung');
            });
        
      }
      const cancelBookPress = ()=>{
          setLoading(true);
          var cancBook = {
            kdBooking: getKdBooking,
          };
          fetch('http://daftar.asysyifa-sambi.com/php/cancelBook.php', {
            method: 'POST',
            body: JSON.stringify(cancBook),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                setLoading(false);
                console.log(responseJson);
                if (responseJson.status === 'success') {
                  setAlertModal(!alertModal);
                  setBatalSukses(true);
                  Alert.alert('Booking Anda Berhasil Dibatalkan');
                  console.log(responseJson);
                  
                 
                }else{
                  console.log(responseJson);
                  setAlertModal(!alertModal);
                 Alert.alert('Gagal membatalkan');
                }
            })
            .catch((error) => {
                setLoading(false);
                Alert.alert('Tidak dapat terhubung');
            });
       
      }
      if (batalsukses) {
        return(
          <SafeAreaView style={styles.container}>
          <View style={styles.box}>
          <Image
          source={require('../../Image/success.png')}
          style={{height: 150, resizeMode: 'contain', alignSelf: 'center'}}
          />
              <Text style={styles.labelTextSuk}>
                  Pembatalan Sukses Dilakukan
          </Text>
         
          </View>
      </SafeAreaView>
        )
      }
      const Item = ({ item, onPress, style }) => (
        <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor='#2ba631'/>
        <View style={[styles.boxItem, style]}>
          {/* MODAL */}
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={alertModal}
              onRequestClose={() => {
                setAlertModal(!alertModal);
              }}>
                <View style={styles.centeredView}>
              <View style={styles.modal}>
              <Loader loading={loading} />
              <Text style={styles.titlet}>Yakin Akan Membatalkan ?</Text>
              <View style={styles.contButtone}>
          <TouchableOpacity style={styles.bookButton}
              onPress={cancelBookPress}
            >
              
              <Text style={styles.textStyle}>YAKIN</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.batalButton}
              onPress={() => {
                setAlertModal(!alertModal);
              }}
            >
              
              <Text style={styles.textStyle}>TIDAK</Text>
            </TouchableOpacity>
            </View>
              </View>
              </View>
              </Modal>

            <View style={styles.boxJudul}>
            <View style={styles.boxJu}>
              <Text style={styles.judule}>Tanggal Periksa : {item.tanggal_periksa}</Text>
              <Text style={styles.judule}>{item.status}</Text>         
              </View>
            </View>
            <View style={styles.bodyBox}>
                <Text style={styles.titlet}>Kode Booking Anda :</Text>
                <Text style={styles.header}>{item.kd_booking}</Text>
                <View style={styles.bodyBoxDetail}>
                <Text style={styles.title}>Nama :{item.nm_pasien}</Text>
                </View>
                <View style={styles.bodyBoxDetail}>
                <Text style={styles.title}>Alamat :{item.alamat}</Text>
                </View>
                <View style={styles.bodyBoxDetail}>
                <Text style={styles.title}>Tgl. Lahir :{item.tgl_lahir}</Text>
                </View>
                <View style={styles.bodyBoxDetail}>
                <Text style={styles.title}>Klinik Tujuan :{item.nm_poli}</Text>
                </View>
                <View style={styles.bodyBoxDetail}>
                <Text style={styles.title}>Dokter :{item.nm_dokter}</Text>
                </View>
                <View style={styles.bodyBoxDetail}>
                <Text style={styles.title}>Cara Bayar :{item.png_jawab}</Text>
                </View>
                <View style={styles.bodyBoxDetail}>
                <Text style={styles.title}>No Urut :{item.noreg}</Text>
                </View>
                
                
                <Image source={{uri: 'http://daftar.asysyifa-sambi.com/qrcode/'+item.qrcode+''}} style={{
                            width: 200,
                            height:200,alignSelf:'center'
                            }}/>
                 <Text style={styles.tglBo}>{item.tanggal_booking}</Text>
            </View>
            
        </View>
        {item.status == 'Belum' ? (
        <TouchableOpacity style={styles.buttonBatal} onPress={() => {
                setAlertModal(true);
                setKdBooking(item.kd_booking);
              }} >
                
                <Text style={styles.buttonTextStyle}>Batal Periksa</Text>
            </TouchableOpacity>
            ) : null}
        </SafeAreaView>
      );
      if (caribooking) {
        return (
          <SafeAreaView style={{flex: 1}}>
            <StatusBar backgroundColor='#2ba631'/>
              <View style={{flex: 1}}>
               {getHasil != '' ? (
                <View style={styles.box}>
              <Text style={styles.header}> {getHasil} </Text> 
              </View>
              ) : 
              <View style={styles.box}>
                 {errortext != '' ? (
                      <Text style={styles.errorTextStyle}> {errortext} </Text>
                  ) : null} 
                  <FlatList
                        data={getData}
                        renderItem={Item}
                        keyExtractor={(item) => item.nm_pasien}
                        extraData={selectedId}
                      />
                      </View>
                }
                
                </View>
            </SafeAreaView>
        );
      }
     
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
            <Loader loading={loading} />
            <Text style={styles.label}>
            Cek Data Booking
            </Text>
                <View style={styles.box}>
                    <Text style={styles.labelText}>Pilih Tanggal Periksa</Text>
                        <View style={styles.SectionStyle}>
                            <TextInput 
                            editable={false} 
                            style={styles.inputStyle} 
                            value={tagalke}
                            
                            />
                            <TouchableOpacity onPress={showDatepicker} style={{alignContent:'center',padding:5,}} >
                            <Image style={{width: 30, height: 30, alignItems:'center'}} source={require('../../Image/datPicker.png')} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.labelText}>Nomor Rekam Medis</Text>
                        <View style={styles.SectionStyle}>
                            <TextInput
                            style={styles.inputStyle}
                            onChangeText={(getNorm) => setNorm(getNorm)}
                            underlineColorAndroid="#f000"
                            placeholder="Nomor Rekam Medis"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            keyboardType = 'numeric'
                            blurOnSubmit={false}
                            />
                        </View>
                        <TouchableOpacity style={styles.buttonStyle} onPress={cekBooking}>
                            <Text style={styles.buttonTextStyle}>Cek Booking Periksa</Text>
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
        </SafeAreaView>
    )
}

export default Resep
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles= StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#ffffff'
},
  box:{
    backgroundColor:'#ffffff',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 20,
    marginHorizontal:10,
    marginTop: 15,
    marginBottom: 10,
    
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


label:{
  fontFamily:"TitilliumWeb-Bold",
  fontSize: 14,
  marginVertical: 5,
  color: '#000000' ,
  marginHorizontal:20,
},

contButtone:{
  flexDirection: 'row',
  padding: 10,
  marginTop: 10,
  marginHorizontal: 30,
  justifyContent: 'space-between'
},

labelText:{
  fontFamily:"TitilliumWeb-Bold",
  fontSize: 14,
  marginVertical: 5,
  color: '#000000',
},
buttonStyle: {
    
  backgroundColor: '#309110',
  borderWidth: 0,
  color: '#FFFFFF',
  borderColor: '#7DE24E',
  height: 40,
  alignItems: 'center',
  borderRadius: 5,
  marginHorizontal: 5,
  marginTop: 20,
  marginBottom: 20,
},
buttonBatal: {
    backgroundColor: '#e01d29',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 40,
    marginTop: 20,
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
  padding: 10,
},
bookButton: {
  backgroundColor: "#32a86f",
  borderRadius: 5,
  padding: 10
},
textStyle:{
  fontFamily :"TitilliumWeb-Bold",
  color: "white",
  fontWeight: "bold",
},
errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  title: {
    fontFamily :"TitilliumWeb-Bold",
    fontSize: 14,
    marginVertical:3,
  },
  titlet: {
    fontFamily :"TitilliumWeb-Bold",
    fontSize: 14,
    marginVertical:3,
    alignSelf: 'center'
  },
  header:{
    fontFamily :"TitilliumWeb-Bold",
    fontSize: 18,
    marginVertical:10,
    borderBottomColor: '#b0afab',
    borderBottomWidth: 1,
    marginHorizontal: 15,
    alignSelf: 'center',
    paddingBottom: 15,
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
  },
  tglBo:{
    fontFamily :"TitilliumWeb-regular",
    fontSize: 8,
    alignSelf: 'center', 
    fontStyle: 'italic',
    marginTop: -20,
    marginBottom: 10,
  },
  labelTextSuk:{
    fontFamily:"TitilliumWeb-Bold",
    fontSize: 18,
    marginVertical: 5,
    color: 'blue',
    alignSelf: 'center'
  },
})