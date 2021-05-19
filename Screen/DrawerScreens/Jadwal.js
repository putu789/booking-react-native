import React,{useState,useEffect} from 'react'
import { StyleSheet,Image,Text,SafeAreaView,
  TouchableOpacity, View,Alert,FlatList } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

import  Loader  from "../Components/Loader";
const Jadwal = () => {
  const [loading, setLoading] = useState(false);
  const [galat, setGalat] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('calendar');
  const [tgl, setTgl] = useState([]);
  const [harine, setHarine] = useState('');
  const [show, setShow] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1)  + "-" + date.getDate()
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // const format = selectedDate.getFullYear() + "-" + (selectedDate.getMonth() + 1)  + "-" + selectedDate.getDate()
    setShow(false);
    setDate(currentDate);
    // console.log(format);
    // setTgl(selectedDate);
    var kirim = {tgl_periksa: selectedDate};
    setLoading(true);
    fetch('http://10.5.50.33/php/jadwalDokter.php', {
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
          setDataSource(responseJson.data);
          setTgl(responseJson.tgl);
          setHarine(responseJson.dino);

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
    setMode(currentMode);
    setShow(true);
  };

  const showDatepicker = () => {
    showMode('calendar');
  };
  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity style={[styles.item,style]} onPress={onPress}>
          <View style={styles.detButton}>
         <Image source={require('../../Image/doc.png')} style={{
                    width: 35,
                    height:35,
                  }}/>
          <Text style={styles.title}>{item.nm_dokter}</Text>
          </View>
          <View style={styles.detButton}>
          <Image source={require('../../Image/clinik.png')} style={{
                    width: 35,
                    height:35,
                  }}/>
          <Text style={styles.title}>{item.nm_poli}</Text>
          </View>
          <View style={styles.detButton}>
          <Image source={require('../../Image/time.png')} style={{
                    width: 35,
                    height:35,
                  }}/>
          <Text style={styles.title}>{item.jam_mulai} - {item.jam_selesai}</Text>
          </View>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => {
    const backgroundColor = item.idne === selectedId ? "#9c9797" : "#ffffff";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.idne)}
        style={{ backgroundColor }}
      />
    );
  };
    return (
      <SafeAreaView style={styles.container}>
        <Loader loading={loading} />
        <Text style={styles.titleOne}>Tanggal : {tgl}</Text>
        <Text style={styles.titleOne}>Hari  : {harine}</Text>
        <FlatList
                      data={dataSource}
                      renderItem={renderItem}
                      keyExtractor={(item, jam) => item.idne}
                      extraData={selectedId}
                    />
         {/* <WebView
          source={{uri: 'http://10.5.50.33/jadwal'}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          renderLoading={ActivityIndicatorElement}
          startInLoadingState={true}
          renderError={() => Alert.alert('GAGAL', 'Tidak Dapat Menjangkau')}
        />  */}
         {show && (
        <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              display="default"
              onChange={onChange}
              format="YYYY-MM-DD"
              minimumDate={new Date()}
              
            />
            )}
      </SafeAreaView>
    )
}

export default Jadwal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
      modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
      },
      activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      },
      activityIndicator: {
        alignItems: 'center',
        height: 80,
      },
      
      item: {
        backgroundColor: '#ffffff',
        padding: 20,
        marginVertical: 2,
        shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 2.22,

    elevation: 3,
    marginTop: 10,
    height : 'auto',
      },
      title: {
        fontSize: 16,
        fontFamily :"TitilliumWeb-Bold",
        color: "#000000",
        marginLeft: 20
      },
      titleOne: {
        fontSize: 24,
        fontFamily :"TitilliumWeb-Bold",
        color: "#48494a",
        alignSelf:'center',
      },
      panah: {
        fontSize: 25,
        fontFamily :"TitilliumWeb-Bold",
        color: "white",
      },
      detButton :{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginTop: 5
      },
      ImageBackground:{
        flexDirection:'column',
        justifyContent:'space-between',
        alignSelf:'center',
        width: 250,
        height:120,
      },
})
