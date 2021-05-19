import React,{useState,useEffect} from 'react'
import { StyleSheet,SafeAreaView, Dimensions,
    Text,Pressable,TextInput, View,Alert,Image } from 'react-native'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import  Loader  from "../Components/Loader";

const Keluarga = () => {
    const [errors, setErrors] = useState(false);
    const [errorFinish, setErrorFinish] = useState(false);
    const [errorPasien, setErrorPasien] = useState(false);
    const [date, setDate] = useState(new Date(Date.now() + 86400000));
    const [mode, setMode] = useState('calendar');
    const [show, setShow] = useState(false);
    const [dateLahir, setDateLahir] = useState(new Date());
    const [modeLahir, setModeLahir] = useState('calendar');
    const [showLahir, setShowLahir] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [getPoli, setPoli] = useState('');
    const [getDokter, setDokter] = useState('');
    const [getCaraBayar, setCaraBayar] = useState('');
    const [getNama, setNama] = useState('');
    const [getCb, setCb] = useState('');
    const [getNamaPoli, setNamaPoline] = useState('');
    const [getNamaDokter, setNamaDokter] = useState('');
    const [getDataPoli, setDataPoli] = useState([]);
    const [getDataDokter, setDataDokter] = useState([]);
    const [getDataBayar, setDataBayar] = useState([]);
    const [dataKdBooking, setKdBooking] = useState('');
    const [dataNoUrut, setNoUrut] = useState('');
    const [getQr, setQr] = useState('');
    const [loading, setLoading] = useState(false);
    const [textNorm, setTextNorm] = useState('');
    const [textNoHp, setTextNoHp] = useState('');
    const [textLahire, setLahire] = useState('');
    const [textTglLahire, setTglLahire] = useState('');
    
    const [namaPasiene, setHasilNamaPasien] = useState('');
    const [namaDoktere, setHasilDokter] = useState('');
    const [namaPoline, setHasilPoli] = useState('');
    const [namaBayare, setHasilBayar] = useState('');
    const [tanggalPeriksane, setHasilTanggalPeriksa] = useState('');

    const [bookingSelesai, setBookingSelesai] = useState(false);

    const datingFormat = moment().format('YYYY-MM-DD'); 
    let startDate =new Date(Date.now() + 86400000);
    let endDate =new Date(Date.now() + 2592000000);
    const saiki = date;
    const saikine = dateLahir;
    const day = moment(saiki).format("dddd");
    const tagalke = moment(saiki).format("YYYY-MM-DD");
    const tagalkeLahir = moment(saikine).format("YYYY-MM-DD");
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
    const onChangeLahir = (event, selectedDateLahir) => {
        const currentDateLahir = selectedDateLahir || dateLahir;
        setShowLahir(Platform.OS === 'ios');
        setDateLahir(currentDateLahir);
        setTglLahire(selectedDateLahir);
    }
    const showModeLahir = (currentMode) => {
        setShowLahir(true);
        setModeLahir(currentMode);
      };
      const showDatepickerLahir = () => {
        showModeLahir('calendar');
      };
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
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
    }
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
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
      const showDatepicker = () => {
        showMode('calendar');
      };
    const onNextStep = () => {
        if (!getPoli) {
            setErrors(true);
            Alert.alert('Poli Wajib di Isi');
            return;
          }
          if (!getDokter) {
            setErrors(true);
            Alert.alert('Dokter Wajib di Isi');
            return;
          } 
          if (!getCaraBayar) {
            setErrors(true);
            Alert.alert('Cara Bayar Wajib di Isi');
            return;
          } 
          setErrors(false);
       
    };
    const onNextPasien = () => {
        if (!textNorm) {
            setErrorPasien(true);
            Alert.alert('No Rekam Medis Wajib Diisi');
            return;
          }
          if (!textNoHp) {
            setErrorPasien(true);
            Alert.alert('Nomor Handphone Wajib Di Isi');
            return;
          } 
          if(textNoHp.length < 11){
            setErrorPasien(true);
            Alert.alert('Nomor Handphone Minimal 11 Angka');
            return;
          }
          setLoading(true); 
            var kirimen = {tgl_lahir: tagalkeLahir, norm: textNorm,
                poline:getPoli,
                doktere:getDokter,
                bayar:getCaraBayar,
                tgl_periksa: tagalke,
            };
            fetch('http://10.5.50.33/php/cekDataPasien.php', {
              method: 'POST',
              body: JSON.stringify(kirimen),
              headers: {
                Accept: 'application/json',
                        'Content-Type': 'application/json'
              },
            })
              .then((response) => response.json())
              .then((responseJson) => {
                setLoading(false);
                if (responseJson.status === 'success') {
                  setErrorPasien(false);
                  console.log(responseJson);
                  setHasilDokter(responseJson.data.dokter);
                  setHasilPoli(responseJson.data.poli);
                  setHasilBayar(responseJson.data.bayare);
                  setHasilTanggalPeriksa(responseJson.data.tgl_periksa);
                  setHasilNamaPasien(responseJson.data.namapasien);
                } else {
                  console.log(responseJson);
                  setErrorPasien(true);
                  Alert.alert('Pasien Tidak Ditemukan');
                  return;
                }
              })
              .catch((error) => {
                setLoading(false);
                console.log(error);
                setErrorPasien(true);
                Alert.alert('Tidak Dapat Terhubung');
                return;
              });
          
          
            
       
    };
    const onSubmitPress=()=>{
        setLoading(true);
        var kirim = {poline : getPoli, norm: textNorm,
          tgl_periksa: tagalke, doktere: getDokter,bayar : getCaraBayar,nohp: textNoHp};
          fetch('http://10.5.50.33/php/bookingKeluarga.php', {
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
              setErrorFinish(true);
              setErrortext('Anda Tidak Dapat Mendaftar Ditanggal yang sama dihari Booking');
              return;
            }else if(responseJson.status === 'libur') {
              console.log('Libur');
              setErrorFinish(true);
              setErrortext('Tanggal Periksa anda merupakan Libur Nasional, Pilih Tanggal Lain');
            }else if(responseJson.status === 'sudah') {
              console.log('Tidak Ada sudah');
              setErrorFinish(true);
              setErrortext('Anda sudah terdaftar pada tanggal tersebut');
              return;
            }else if(responseJson.status === 'kuota') {
              console.log('Tidak Ada kuota');
              setErrorFinish(true);
              setErrortext('Kuota Dokter sudah penuh');
              return;
            }else{
              console.log(responseJson);
              setErrorFinish(false);
              setBookingSelesai(true);
              setKdBooking(responseJson.data.kdBooking);
              setNoUrut(responseJson.data.noUrut);
              setQr(responseJson.data.qr);
            }
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
            Alert.alert('Tidak Dapat terhubung');
          });
    }
    if (bookingSelesai) {
        return(
            <SafeAreaView style={styles.container}>
            <View style={styles.box}>
            <Image
            source={require('../../Image/success.png')}
            style={{height: 150, resizeMode: 'contain', alignSelf: 'center'}}
            />
                <Text style={styles.labelTextSuk}>
                    Pendaftaran Sukses Dilakukan 
            </Text>
            <Text style={styles.label}>
                Kd Booking : {dataKdBooking}
            </Text>
            <Text style={styles.label}>
                No. Antrian : {dataNoUrut}
            </Text>
            <Image
            source={{uri: 'http://10.5.50.33/booking/qrcode/'+getQr}}
            style={{width: 200,
                height:200,alignSelf:'center'}}
            />
            </View>
        </SafeAreaView>

        );
        
    }
    return (
        <SafeAreaView style={styles.container}>
            <ProgressSteps>
                <ProgressStep label="Data Awal" onNext={onNextStep} errors={errors}>
                <View style={styles.box}>
                    <Text style={styles.labelText}>Pilih Tanggal Periksa</Text>
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
                        />  )}
                    </View>
                </ProgressStep>
                <ProgressStep label="Data Pasien"  onNext={onNextPasien} errors={errorPasien}>
                    <View style={styles.box}>
                    <Loader loading={loading} />
                        <Text style={styles.labelText}>Tanggal Lahir</Text>
                            <View style={styles.SectionStyle}>
                               
                                    <TextInput 
                                    editable={true} 
                                    style={styles.inputStyle} 
                                    value={tagalkeLahir}
                                    onFocus={showDatepickerLahir}
                                    onChangeText={(textLahire)=> setLahire(textLahire)}
                                    />
                            </View>
                            <Text style={styles.labelText}>Nomor Rekam Medis</Text>
                            <View style={styles.SectionStyle}>
                               
                                    <TextInput 
                                    keyboardType='numeric'
                                    style={styles.inputStyle} 
                                    placeholder='123456'
                                    onChangeText={textNorm => setTextNorm(textNorm)}
                                    value={textNorm}
                                    />
                            </View>
                            <Text style={styles.labelText}>Nomor Telepon</Text>
                            <View style={styles.SectionStyle}>
                                    <TextInput 
                                    style={styles.inputStyle} 
                                    keyboardType='phone-pad'
                                    placeholder='08123456789'
                                    onChangeText={(textNoHp)=> setTextNoHp(textNoHp)}
                                    value={textNoHp}
                                    />
                            </View>
                            {showLahir && (
                            <DateTimePicker
                            testID="dateTimePickere"
                            value={dateLahir}
                            mode={modeLahir}
                            display="spinner"
                            onChange={onChangeLahir}
                       
                        />  )}
                    </View>
                </ProgressStep>
                <ProgressStep label="Konfirmasi" onSubmit={onSubmitPress}>
                    <View style={{ alignItems: 'center' }}>
                    <View style={styles.box}>
                    <Loader loading={loading} />
                        <View style={styles.detailUser}>
                            <View style={styles.textDet}>
                            <Text style={styles.label}>Tanggal Periksa </Text>
                            </View>
                            <View style={styles.textDet}>
                            <Text style={styles.label1}>{tanggalPeriksane}</Text> 
                            </View>
                        </View>
                        <View style={styles.detailUser}>
                            <View style={styles.textDet}>
                            <Text style={styles.label}>Nama Pasien </Text>
                            </View>
                            <View style={styles.textDet}>
                            <Text style={styles.label1}>{namaPasiene}</Text> 
                            </View>
                        </View>
                        <View style={styles.detailUser}>
                            <View style={styles.textDet}>
                            <Text style={styles.label}>Dokter</Text>
                            </View>
                            <View style={styles.textDet}>
                            <Text style={styles.label1}>{namaDoktere}</Text> 
                            </View>
                        </View>
                        <View style={styles.detailUser}>
                            <View style={styles.textDet}>
                            <Text style={styles.label}>Poliklinik </Text>
                            </View>
                            <View style={styles.textDet}>
                            <Text style={styles.label1}>{namaPoline}</Text> 
                            </View>
                        </View>
                        <View style={styles.detailUser}>
                            <View style={styles.textDet}>
                            <Text style={styles.label}>Cara Bayar </Text>
                            </View>
                            <View style={styles.textDet}>
                            <Text style={styles.label1}>{namaBayare}</Text> 
                            </View>
                        </View>
                          {errortext != '' ? (
                            <Text style={styles.errorTextStyle}> {errortext} </Text>
                        ) : null}
          
                        </View>
                    </View>
                </ProgressStep>
            </ProgressSteps>
        </SafeAreaView>
    )
}

export default Keluarga
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    nextBtnTextStyle:{
        color: '#007aff', 
        fontSize: 24
    },
    container:{
        flex: 1,
        backgroundColor:'#ffffff'
    },
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
      pickerStyle1: {
        color: '#777777',
        marginTop:-15
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
    pressa: {
        flex: 1,
    },
    textKet :{
        fontSize: 11,
        fontFamily:"TitilliumWeb-Bold",
        color :'#d14f4f',
        marginHorizontal: 20,
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
      textDet:{
        width : windowWidth*0.4,
      },
      errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontFamily:"TitilliumWeb-Bold",
        fontSize: 18,
      },
      labelTextSuk:{
        fontFamily:"TitilliumWeb-Bold",
        fontSize: 18,
        marginVertical: 5,
        color: 'blue',
        alignSelf: 'center'
      },
})
