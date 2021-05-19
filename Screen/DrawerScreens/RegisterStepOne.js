import React, { useState,useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View,TouchableOpacity,
  Modal,Image,Dimensions,ScrollView,
  TextInput, Alert,Pressable, SafeAreaView,Switch } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import  Loader  from "../Components/Loader";
import { useFocusEffect } from '@react-navigation/native';
import  Kabar  from "../Components/kabar";
import moment from 'moment';

const  RegisterStepOne = ({route,navigation}) =>{
  const [loading, setLoading] = useState(false);
  const [getValue, setGetValue] = useState('');
  const [errortext, setErrortext] = useState('');
  const [getPoli, setPoli] = useState('');
  const [getDokter, setDokter] = useState('');
  const [getCaraBayar, setCaraBayar] = useState('');
  const [date, setDate] = useState(new Date(Date.now() + 86400000));
  const [mode, setMode] = useState('calendar');
  const [show, setShow] = useState(false);
  const [getNama, setNama] = useState('');
  const [getCb, setCb] = useState('');
  const [getNamaPoli, setNamaPoline] = useState('');
  const [getNamaDokter, setNamaDokter] = useState('');
  const [getRm, setRm] = useState('');
  const [tanggale, setTanggale] = useState('');
  const [modalDaftar, setmodalDaftar] = useState(false);
  const [getDataPoli, setDataPoli] = useState([]);
  const [getDataDokter, setDataDokter] = useState([]);
  const [getDataBayar, setDataBayar] = useState([]);
  const [mPengumuman, setMPengumuman] = useState(false);
  const [getSubmitt, setSubmitt] = useState(false);
  const [dataRekam, setRekam] = useState('');
  const [dataKdBooking, setKdBooking] = useState('');
 
  const [dataNoUrut, setNoUrut] = useState('');
  const [getQr, setQr] = useState('');
  const today = moment();
  const datingFormat = moment().format('YYYY-MM-DD'); 
 
  const [switchValue, setSwitchValue] = useState(false);
  const [switchKll, setSwitchKll] = useState(false);
  const [username, setUsername] = useState(route.params.paramKey);
  const [getNoBpjs, setNoBpjs] = useState('');
  const [getRujukan, rujukanTidk] = useState(false);
  const toggleSwitch = (value) => {
    setSwitchValue(value);
  };
  const toggleSwitchKll = (value) => {
    setSwitchKll(value);
  };

  const activeDays = [0, 3, 4];
  const disabled = {disabled: true, selected: false};
  let startDate =new Date(Date.now() + 86400000);
  let endDate =new Date(Date.now() + 2592000000);
   

  const min =  (date.getDate() + 1) ;
  
  const saiki = date;
  const day = moment(saiki).format("dddd");
  const tagalke = moment(saiki).format("YYYY-MM-DD");
  
 



  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setTanggale(selectedDate);
    console.log(selectedDate);
    var kirim = {tgl_periksa: selectedDate};
    fetch('http://10.5.50.33/php/cek-poli.php', {
      method: 'POST',
      body: JSON.stringify(kirim),
      headers: {
        Accept: 'application/json',
                'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        if (responseJson.status === 'success') {
          console.log(responseJson);
          setDataPoli(responseJson.data);

        } else {
          console.log('Tidak Ada Data');
        }
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert('Tidak Dapat Terhubung');
      });
  };
  const disableWeekends = current => {
    return current.day() !== 0 && current.day() !== 6;
  }
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('calendar');
  };
 
  
    useEffect(() => {
        AsyncStorage.getItem('AppSession').then(
          (value) =>
            setGetValue(value),
        );
      },
     
      []);
      useEffect(() => {
        fetch('http://10.5.50.33/php/cara-bayar.php', {
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
              console.log(responseJson);
              setDataBayar(responseJson.data);
            } else {
              console.log('Tidak Ada Data');
            }
          })
          .catch((error) => {
            setLoading(false);
            Alert.alert('Tidak Dapat Terhubung');
          });  
      
      },
     
      []);
      useEffect(() => {
        fetch('http://10.5.50.33/php/select-user.php', {
          method: 'POST',
          body: JSON.stringify({user_email: username}),
          headers: {
            Accept: 'application/json',
                    'Content-Type': 'application/json'
          },
        })
          .then((response) => response.json())
          .then((responseJson) => {
            setLoading(false);
            if (responseJson.status === 'success') {
              console.log(responseJson.data.noBpjs);
              setNoBpjs(responseJson.data.noBpjs);
            } else {
              console.log('Tidak Ada Data');
            }
          })
          .catch((error) => {
            setLoading(false);
            Alert.alert('Tidak Dapat Terhubung');
          });  
      
      },
     
      []);
      
      
     const changePoli =(itemValue, itemIndex) =>{
      setPoli(itemValue);
      fetch('http://10.5.50.33/php/cek-dokter.php', {
            method: 'POST',
            body: JSON.stringify({poliklinik : itemValue, tgl_periksa: tagalke}),
            headers: {
              Accept: 'application/json',
                      'Content-Type': 'application/json'
            },
          })
            .then((response) => response.json())
            .then((responseJson) => {
              setLoading(false);
              if (responseJson.status === 'success') {
                console.log(responseJson);
                setDataDokter(responseJson.data);
              } else {
                console.log('Tidak Ada Data');
              }
            })
            .catch((error) => {
              setLoading(false);
              Alert.alert('Tidak Dapat Terhubung');
            });  
      
      }

     
   
      useFocusEffect(
        React.useCallback(() => {
          setMPengumuman(true);
        }, [])
      );
      const bookHandler = () => {
        if (!getPoli) {
          Alert.alert('Poli Wajib di Isi');
          return;
        }
        if (!getDokter) {
          Alert.alert('Dokter Wajib di Isi');
          return;
        } 
        if (!getCaraBayar) {
          Alert.alert('Cara Bayar Wajib di Isi');
          return;
        } 
        if (getCaraBayar == 'A65' || getCaraBayar=='N65') {
          if (!getNoBpjs) {
            Alert.alert('NOMOR BPJS KOSONG');
            return;
          }else{
            setLoading(true);
            fetch('http://10.5.50.33/bpjs-master/cekRujukan.php', {
          method: 'POST',
          body: JSON.stringify({no_bpjs: getNoBpjs}),
          headers: {
            Accept: 'application/json',
                    'Content-Type': 'application/json'
          },
        })
          .then((response) => response.json())
          .then((responseJson) => {
            setLoading(false);
            console.log(responseJson);
            if (responseJson.metaData.message === 'OK') {
              console.log(responseJson);
              setLoading(true);
          var dataToSend = {user_email: getValue,poline : getPoli, 
            tgl_periksa: tagalke, doktere: getDokter,bayar : getCaraBayar};
          fetch('http://10.5.50.33/php/bookingGet.php', {
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
                console.log(responseJson);
                rujukanTidk(true);
                setNama(responseJson.data.nama);
                setRm(responseJson.data.no_rm);
                setNamaPoline(responseJson.data.poli);
                setNamaDokter(responseJson.data.dokter);
                setCb(responseJson.data.bayar);
                setmodalDaftar(true);
              } else {
                console.log('Tidak Ada Data');
              }
            })
            .catch((error) => {
              setLoading(false);
              Alert.alert('Tidak Dapat Terhubung');
            });
            } else {
              console.log(responseJson);
              Alert.alert('Rujukan Tidak Ditemukan');
            }
          })
          .catch((error) => {
            setLoading(false);
            Alert.alert('Tidak Dapat Terhubung');
          });
          }
        }else{
          setLoading(true);
          var dataToSend = {user_email: getValue,poline : getPoli, 
            tgl_periksa: tagalke, doktere: getDokter,bayar : getCaraBayar};
          fetch('http://10.5.50.33/php/bookingGet.php', {
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
                console.log(responseJson);
                rujukanTidk(true);
                setNama(responseJson.data.nama);
                setRm(responseJson.data.no_rm);
                setNamaPoline(responseJson.data.poli);
                setNamaDokter(responseJson.data.dokter);
                setCb(responseJson.data.bayar);
                setmodalDaftar(true);
              } else {
                console.log('Tidak Ada Data');
              }
            })
            .catch((error) => {
              setLoading(false);
              Alert.alert('Tidak Dapat Terhubung');
            });
        }
         /* if (getRujukan) {
          setLoading(true);
          var dataToSend = {user_email: getValue,poline : getPoli, 
            tgl_periksa: tagalke, doktere: getDokter,bayar : getCaraBayar};
          fetch('http://10.5.50.33/php/bookingGet.php', {
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
                console.log(responseJson);
                setNama(responseJson.data.nama);
                setRm(responseJson.data.no_rm);
                setNamaPoline(responseJson.data.poli);
                setNamaDokter(responseJson.data.dokter);
                setCb(responseJson.data.bayar);
                setmodalDaftar(true);
                rujukanTidk(true);
              } else {
                console.log('Tidak Ada Data');
              }
            })
            .catch((error) => {
              setLoading(false);
              Alert.alert('Tidak Dapat Terhubung');
            });
          
        
        }else{
          setLoading(false);
          Alert.alert('Data Rujukan tidak ditemukan');
        }  */
        
      }
      const submitPress = ()=>{
        setLoading(true);
        var kirim = {user_email: getValue ,poline : getPoli, 
          tgl_periksa: tagalke, doktere: getDokter,bayar : getCaraBayar};
          fetch('http://10.5.50.33/php/saveBooking.php', {
          method: 'POST',
          body: JSON.stringify(kirim),
          headers: {
            Accept: 'application/json',
                    'Content-Type': 'application/json'
          },
        })
          .then((response) => response.json())
          .then((responseJson) => {
            setLoading(false);
            console.log(responseJson);
            if(responseJson.status === 'tanggal') {
              console.log('Tidak Ada tanggal');
              setErrortext('Anda Tidak Dapat Mendaftar Ditanggal yang sama dihari Booking');
            }else if(responseJson.status === 'sudah') {
              console.log('Tidak Ada sudah');
              setErrortext('Anda sudah terdaftar pada tanggal tersebut');
            }else if(responseJson.status === 'libur') {
              console.log('Libur');
              setErrortext('Tanggal Periksa anda merupakan Libur Nasional, Pilih Tanggal Lain');
            }else if(responseJson.status === 'kuota') {
              console.log('Tidak Ada kuota');
              setErrortext('Kuota Dokter sudah penuh');
            }else{
              console.log(responseJson);
              setmodalDaftar(!modalDaftar);
              setSubmitt(true);
              setKdBooking(responseJson.data.kdBooking);
              setNoUrut(responseJson.data.noUrut);
              setQr(responseJson.data.qr);
            }
          })
          .catch((error) => {
            setLoading(false);
            Alert.alert('Tidak dapat terhubung');
          });
      }
      if (getSubmitt) {
        return (
        <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
       
          <View style={styles.box}>
          <Image
          source={require('../../Image/success.png')}
          style={{height: 150, resizeMode: 'contain', alignSelf: 'center'}}
        />
            <Text style={styles.labelTextSuk}>
                Pendaftaran Sukses Dilakukan 
          </Text>
          <Text style={styles.label}>
           Nama : {getNama}
          </Text>
          <Text style={styles.label}>
            Kd Booking : {dataKdBooking}
          </Text>
          <Text style={styles.label}>
            No. Antrian : {dataNoUrut}
          </Text>
          <Image
         source={{uri: 'http://10.5.50.33/qrcode/'+getQr}}
          style={{width: 200,
            height:200,alignSelf:'center'}}
        />
            </View>
        </View>
        </SafeAreaView>
        );
      }
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false} 
          >
        <Loader loading={loading} />
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={modalDaftar}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
             <View style={styles.centeredView}>
          <View style={styles.modal}>
          <Loader loading={loading} />
         
          
         {getCaraBayar == 'A65' || getCaraBayar=='N65' ? 
         ( <View><Text style={styles.label}>
          Detail Data Booking
         </Text>
         
         <View style={styles.detailUser}>
            <View style={styles.textDet}>
              <Text style={styles.label}>No Rm. </Text>
            </View>
            <View style={styles.textDet}>
              <Text style={styles.label1}>{getRm}</Text>
            </View>
          </View>
          <View style={styles.detailUser}>
                <View style={styles.textDet}>
                  <Text style={styles.label}>Tanggal Periksa </Text>
                </View>
                <View style={styles.textDet}>
                <Text style={styles.label1}>{tagalke}</Text> 
                </View>
              </View>
              
              <View style={styles.detailUser}>
                <View style={styles.textDet}>
                  <Text style={styles.label}>Nama </Text>
                </View>
                <View style={styles.textDet}>
                <Text style={styles.label1}>{getNama}</Text> 
                </View>
              </View>
              <View style={styles.detailUser}>
                <View style={styles.textDet}>
                  <Text style={styles.label}>Poliklinik </Text>
                </View>
                <View style={styles.textDet}>
                <Text style={styles.label1}>{getNamaPoli}</Text> 
                </View>
              </View>
              <View style={styles.detailUser}>
                <View style={styles.textDet}>
                  <Text style={styles.label}>Dokter </Text>
                </View>
                <View style={styles.textDet}>
                <Text style={styles.label1}>{getNamaDokter}</Text> 
                </View>
              </View>
              <View style={styles.detailUser}>
                <View style={styles.textDet}>
                  <Text style={styles.label}>Cara Bayar </Text>
                </View>
                <View style={styles.textDet}>
                <Text style={styles.label1}>{getCb}</Text> 
                </View>
              </View>
              {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
          </View>
          
  )
         :
         (<View><Text style={styles.label}>
          Detail Data Booking
         </Text>
          <View style={styles.detailUser}>
          <View style={styles.textDet}>
            <Text style={styles.label}>No Rm. </Text>
          </View>
          <View style={styles.textDet}>
            <Text style={styles.label1}>{getRm}</Text>
          </View>
        </View>
        <View style={styles.detailUser}>
                <View style={styles.textDet}>
                  <Text style={styles.label}>Tanggal Periksa </Text>
                </View>
                <View style={styles.textDet}>
                <Text style={styles.label1}>{tagalke}</Text> 
                </View>
              </View>
              
              <View style={styles.detailUser}>
                <View style={styles.textDet}>
                  <Text style={styles.label}>Nama </Text>
                </View>
                <View style={styles.textDet}>
                <Text style={styles.label1}>{getNama}</Text> 
                </View>
              </View>
              <View style={styles.detailUser}>
                <View style={styles.textDet}>
                  <Text style={styles.label}>Poliklinik </Text>
                </View>
                <View style={styles.textDet}>
                <Text style={styles.label1}>{getNamaPoli}</Text> 
                </View>
              </View>
              <View style={styles.detailUser}>
                <View style={styles.textDet}>
                  <Text style={styles.label}>Dokter </Text>
                </View>
                <View style={styles.textDet}>
                <Text style={styles.label1}>{getNamaDokter}</Text> 
                </View>
              </View>
              <View style={styles.detailUser}>
                <View style={styles.textDet}>
                  <Text style={styles.label}>Cara Bayar </Text>
                </View>
                <View style={styles.textDet}>
                <Text style={styles.label1}>{getCb}</Text> 
                </View>
              </View>
              {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
        </View>
         )
         }
         
         {/* <View style={styles.detailUser}>
         <View style={styles.textDet}>
         <Text style={styles.label}>No Rm. </Text>
       </View>
       <View style={styles.textDet}>
      <Text style={styles.label1}>{getRm}</Text>
       </View>
     </View>
  <View style={styles.detailUser}>
       <View style={styles.textDet}>
         <Text style={styles.label}>Tanggal Periksa </Text>
       </View>
       <View style={styles.textDet}>
       <Text style={styles.label1}>{tagalke}</Text> 
       </View>
   </View>
     
     <View style={styles.detailUser}>
       <View style={styles.textDet}>
         <Text style={styles.label}>Nama </Text>
       </View>
       <View style={styles.textDet}>
       <Text style={styles.label1}>{getNama}</Text> 
       </View>
     </View>
     <View style={styles.detailUser}>
       <View style={styles.textDet}>
         <Text style={styles.label}>Poliklinik </Text>
       </View>
       <View style={styles.textDet}>
       <Text style={styles.label1}>{getNamaPoli}</Text> 
       </View>
     </View>
     <View style={styles.detailUser}>
       <View style={styles.textDet}>
         <Text style={styles.label}>Dokter </Text>
       </View>
       <View style={styles.textDet}>
       <Text style={styles.label1}>{getNamaDokter}</Text> 
       </View>
     </View>
     <View style={styles.detailUser}>
       <View style={styles.textDet}>
         <Text style={styles.label}>Cara Bayar </Text>
       </View>
       <View style={styles.textDet}>
       <Text style={styles.label1}>{getCb}</Text> 
       </View>
     </View> */}
     {errortext != '' ? (
       <Text style={styles.errorTextStyle}> {errortext} </Text>
      ) : null}  
          

          <View style={styles.contButtone}>
          <TouchableOpacity style={styles.bookButton}
              onPress={submitPress}
            >
              
              <Text style={styles.textStyle}>Booking</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.batalButton}
              onPress={() => {
                setmodalDaftar(!modalDaftar);
              }}
            >
              
              <Text style={styles.textStyle}>Batal</Text>
            </TouchableOpacity>
            </View>
          </View>
          </View>
        </Modal>
        <Modal
          animationType={'none'}
          transparent={true}
          visible={mPengumuman}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modal}>
            <View style={styles.detailUser}>
            <Kabar/>
            </View>

            <View style={styles.contButtone}>
                <TouchableOpacity style={styles.batalButton}
                onPress={() => {
                setMPengumuman(!mPengumuman);
                }}
              >
              <Text style={styles.textStyle}>OKE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
    
     
        <View style={styles.box}>
            <Text style={styles.labelText}>Pilih Tanggal Periksa </Text>
            <View style={styles.SectionStyle}>
            <Pressable onPress={showDatepicker} style={styles.pressa}>
              <TextInput 
              editable={false} 
              style={styles.inputStyle} 
              value={tagalke}
             
              />
              </Pressable>
            
            </View>
            <Text style={styles.labelText}>Pilih Poliklinik</Text>
            <View style={styles.SectionStyle}>
            
            <View style={styles.pickerStyle}>
            <Picker style={styles.pickerStyle1}
              testID="basic-picker"
              mode="dialog"
              selectedValue={getPoli}
              onValueChange={changePoli}
              >
             <Picker.Item  label="-- Pilih Poliklinik --" value="" />
             {getDataPoli != null ? (getDataPoli.map((item, key)=>(
               <Picker.Item label={item.nm_poli} value={item.kd_poli} key={key} />)
            )): null }
             
            </Picker>
          </View>
          
            </View>
            <Text style={styles.labelText}>Pilih Dokter</Text>
            <View style={styles.SectionStyle}>
            
            <View style={styles.pickerStyle}>
            <Picker style={styles.pickerStyle1}
              testID="basic-picker"
              mode="dialog"
              selectedValue={getDokter}
              onValueChange={(itemValue, itemIndex) =>{
                setDokter(itemValue);

                }} >
             <Picker.Item  label="-- Pilih Dokter --" value="" />
             {getDataDokter != null ? (getDataDokter.map((item, key)=>(
               <Picker.Item label={item.nm_dokter} value={item.kd_dokter} key={key} />)
            )): null }
            
            </Picker>
          </View>
         
        </View>
          <Text style={styles.labelText}>Pilih Cara Bayar</Text>
            <View style={styles.SectionStyle}>
            <View style={styles.pickerStyle}>
            <Picker style={styles.pickerStyle1}
              testID="basic-picker"
              mode="dialog"
              selectedValue={getCaraBayar}
              onValueChange={(itemValue, itemIndex) =>{
                setCaraBayar(itemValue)}} >
             <Picker.Item  label="-- Pilih Cara Bayar --" value="" />
             {getDataBayar.map((item, key)=>(
               <Picker.Item label={item.png_jawab} value={item.kd_pj} key={key} />)
            )}
             </Picker>
             </View>
            </View>
            <Text style={styles.textKet}>* BPJS PBI Untuk BPJS Penerima Bantuan Pemerintah</Text>
            <Text style={styles.textKet}>* BPJS NON PBI Untuk BPJS Mandiri</Text>
            
            {getCaraBayar== 'A65' || getCaraBayar== 'N65' ? 
            <View>
            <Text style={styles.labelText}>Nomor Kartu BPJS</Text>
            <View style={styles.SectionStyle}>
            <TextInput 
            style={styles.inputStyle} 
            value={getNoBpjs}
            keyboardType='numeric'
            onChangeText={(getNoBpjs) => setNoBpjs(getNoBpjs)}
            />
           </View>
           </View>
            : 
            null
            }
            
            <View style={styles.detailUser}>
              <View style={styles.textDet}>
                  <Text style={styles.label}>Pasien Kontrol{/* {switchValue ? 'Switch is ON' : 'Switch is OFF'}  */}</Text>
              </View>
              <View style={styles.textDet}>
              <Switch
              
              onValueChange={toggleSwitch}
              value={switchValue}
            />
              </View>
            </View>
            <View style={styles.detailUser}>
              <View style={styles.textDet}>
                  <Text style={styles.label}>Kecelakaan(Lalu Lintas/ kerja){/* {switchValue ? 'Switch is ON' : 'Switch is OFF'}  */}</Text>
              </View>
              <View style={styles.textDet}>
              <Switch
              onValueChange={toggleSwitchKll}
              value={switchKll}
            />
              </View>
            </View>
            {switchValue ?
            <View style={styles.SectionStyle}>
            <TextInput style={styles.inputStyle} placeholder='masukan nomor surat kontrol' />
            </View>
             : null }
            <TouchableOpacity style={styles.buttonStyle} onPress={bookHandler}>
              <Text style={styles.buttonTextStyle}>BOOKING PERIKSA</Text>
            </TouchableOpacity>
            <Image source={require('../../Image/bg.png')} style={styles.ImageBackground}/>
        </View>
        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          display="default"
          onChange={onChange}
          format={datingFormat}
          minimumDate={startDate}
          maximumDate={endDate}
        />
      )}
       </ScrollView>
    </View>
   
    </SafeAreaView>
    )
}

export default RegisterStepOne
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles= StyleSheet.create({
  box:{
    backgroundColor:'#ffffff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal:15,
    marginTop: 15,
    
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
pressa: {
  flex: 1,
},
pickerStyle: {
  flex: 1,
  color: '#000000',
  padding: 10,
  borderWidth: 1,
  borderRadius: 5,
  borderColor: '#dadae8',
},
pickerStyle1: {
  color: '#000000',
  marginTop:-15
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
  fontSize: 14,
  marginVertical: 5,
  color: '#000000',
},
labelTextSuk:{
  fontFamily:"TitilliumWeb-Bold",
  fontSize: 18,
  marginVertical: 5,
  color: 'blue',
  alignSelf: 'center'
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
  marginTop: 0,
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
textKet :{
  fontSize: 11,
  fontFamily:"TitilliumWeb-Bold",
  color :'#d14f4f',
  marginHorizontal: 20,
},
})
