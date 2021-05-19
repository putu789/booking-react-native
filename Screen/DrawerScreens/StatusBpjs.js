import React,{useState} from 'react'
import { StyleSheet, Text, TextInput, View,TouchableOpacity, Alert,Dimensions } from 'react-native'
import Loader from '../Components/Loader';

const StatusBpjs = () => {
    const [noBpjs, setNoBpjs] = useState('');
    const [loading, setLoading] = useState(false);
    const [namaPasien, setNamaPasien] = useState('');
    const [drKeluarga, setdrKeluarga] = useState('');
    const [statusAktif, setstatusAktif] = useState('');
    const [ditemukan, setDitemukan] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [hasilKartu, setHasilKartu] = useState([]);
    const cekKartu =()=>{
        if (!noBpjs) {
            Alert.alert('isi nomor kartu');
            return;
        }
        setLoading(true);
           var puk = {no_bpjs : noBpjs};
              fetch('http://10.5.50.33/bpjs-master/cekKartuBpjs.php', {
              method: 'POST',
              body: JSON.stringify(puk),
              headers: {
                Accept: 'application/json',
                        'Content-Type': 'application/json'
              },
            })
            .then((responsNya) => responsNya.json())
            .then((responseJson) => {
              setLoading(false);
              if (responseJson.metaData.message === 'OK') {
                  setDitemukan(true);
                  setNamaPasien(responseJson.response.peserta.nama);
                  setdrKeluarga(responseJson.response.peserta.provUmum.nmProvider);
                  setstatusAktif(responseJson.response.peserta.statusPeserta.keterangan);
                
              }else{
                  Alert.alert('Data Tidak Ditemukan, Periksa kembali nomor kartu anda');
                  return;
              }
                
            })
            .catch((error) => {
              setLoading(false);
              Alert.alert('Tidak dapat terhubung');
            });
    }
    if (ditemukan) {
        return(
        <View style={styles.box}>
            <View style={styles.detailUser}>
                <View style={styles.textDet}>
                  <Text style={styles.label}>Nama </Text>
                </View>
                <View style={styles.textDet}>
                <Text style={styles.label1}>{namaPasien}</Text> 
                </View>
            </View>
            <View style={styles.detailUser}>
                <View style={styles.textDet}>
                  <Text style={styles.label}>Doker Keluarga </Text>
                </View>
                <View style={styles.textDet}>
                <Text style={styles.label1}>{drKeluarga}</Text> 
                </View>
            </View>
            <View style={styles.detailUser}>
                <View style={styles.textDet}>
                  <Text style={styles.label}>Status Aktif </Text>
                </View>
                <View style={styles.textDet}>
                <Text style={styles.label1}>{statusAktif}</Text> 
                </View>
            </View>
            <Text style={styles.textKet}>* Data Tersebut Merupakan data dari BPJS Kesehatan</Text>
        </View>
        )
        
    }
    return (
        <View style={styles.box}>
            <Loader loading={loading} />
            <View style={styles.SectionStyle}>
                <TextInput style={styles.inputStyle} placeholder='Masukan Nomor Kartu Bpjs'
                onChangeText={(noBpjs) => setNoBpjs(noBpjs)}
                keyboardType='number-pad'
                 /> 
                    
            </View>
            <TouchableOpacity style={styles.buttonStyle} onPress={cekKartu}>
                     <Text style={styles.buttonTextStyle}>Cek</Text>
                </TouchableOpacity>       
        </View>
    )
}

export default StatusBpjs
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
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
      label:{
        fontFamily:"TitilliumWeb-Bold",
        fontSize: 14,
        marginVertical: 5,
        color: '#000000' ,
        marginHorizontal:20,
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
      detailUser:{
        flexDirection:'row',
      },
      textDet:{
        width : windowWidth*0.4,
      },
      textKet :{
        fontSize: 11,
        fontFamily:"TitilliumWeb-Bold",
        color :'#d14f4f',
        marginHorizontal: 20,
      },
})
