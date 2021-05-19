import React,{useState,useEffect} from 'react'
import { StyleSheet,SafeAreaView, FlatList,Text,TouchableOpacity,Image,Alert, View } from 'react-native'
import  Loader  from "../Components/Loader";
const Layanan = () => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [getKo, setKo] = useState('');
    const [getdata, setdata] = useState('');
    const [getdata1, setdata1] = useState('');
    const [getdata2, setdata2] = useState('');
    
    useEffect(() => {
        setLoading(true);
          fetch('http://daftar.asysyifa-sambi.com/php/getLayanan.php', {
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
                      setDataSource(responseJson.data);
                      console.log(responseJson.data);
                     
                    } else {
                      console.log('Tidak Ada Data');
                    }
                  })
                  .catch((error) => {
                    setLoading(false);
                    Alert.alert('Tidak dapat menghubungkan');
                  });
        }, []);
      
    const Item = ({ item, onPress, style }) => (
            <View style={styles.item}>
            <View style={styles.detButton}>
             <Image source={{uri: 'http://daftar.asysyifa-sambi.com/php/img/'+item.gambar+''}} style={{
                        width: 100,
                        height:100,
                      }}/>
                <View style={styles.titSty}>
                <Text style={styles.title}>{item.judul}</Text>
                <Text numberOfLines={2} style={styles.titleOne}>{item.deskripsi}</Text>
                </View>
              </View>
               
              <TouchableOpacity  onPress={onPress}>
                <Text style={styles.link}> Lanjutkan membaca >> </Text>
                </TouchableOpacity>
              </View>
             
        
      );
      const renderItem = ({ item }) => {
        const detailPress = ()=>{
            setSelectedId(item.id);
            setKo(item.id);
            fetch('http://daftar.asysyifa-sambi.com/php/getLayananId.php', {
                    method: 'POST',
                    body: JSON.stringify({id : item.id}),
                    headers: {
                      Accept: 'application/json',
                              'Content-Type': 'application/json'
                    },
                  })
                  .then((response) => response.json())
                  .then((responseJson) => {
                    setLoading(false);
                    if (responseJson.status === 'success') {
                      setdata(responseJson.sata.judule);
                      setdata1(responseJson.sata.gambare);
                      setdata2(responseJson.sata.deskripsie);
                      console.log(responseJson.sata.judule);
                     
                    } else {
                      console.log('Tidak Ada Data');
                    }
                  })
                  .catch((error) => {
                    setLoading(false);
                    Alert.alert('Tidak dapat menghubungkan');
                  });
         }
        
        return (
          <Item
            item={item}
            onPress={detailPress}
            
          />
        );
      };
      if (getKo != '') {
        return (
            <SafeAreaView style={styles.container}>
                 <Text style={styles.titleDetail}>{getdata}</Text>
                 <Image source={{uri: 'http://daftar.asysyifa-sambi.com/php/img/'+getdata1+''}} style={{
                        width: 200,
                        height:200,
                        alignSelf: 'center',
                        marginTop: 20,
                      }}/>
                      <Text style={styles.deskripsi}>{getdata2}</Text>
            </SafeAreaView> 
        )
     }
    return (
        <SafeAreaView style={styles.container}>
            <Loader loading={loading} />
            <FlatList
                data={dataSource}
                renderItem={renderItem}
                keyExtractor={(item, jam) => item.id}
                extraData={selectedId}
            />
        </SafeAreaView>
    )
}

export default Layanan

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
      },
        
          
    item: {
    backgroundColor: '#ffffff',
    marginVertical: 2,
    marginHorizontal: 5,
    padding: 10,
    shadowColor: "#000",
shadowOffset: {
    width: 0,
    height: 3,
},
shadowOpacity: 0.27,
shadowRadius: 2.22,

elevation: 3,
marginTop: 10,
    },
          titSty:{
            flexDirection: 'column',
            width:'60%'
          },
          title: {
            fontSize: 16,
            fontFamily :"TitilliumWeb-Bold",
            color: "#5c5b5b",
            marginLeft: 5
          },
          titleDetail: {
            fontSize: 24,
            fontFamily :"TitilliumWeb-Bold",
            color: "#5c5b5b",
            marginLeft: 5,
            alignSelf: 'center'
          },
          titleOne: {
            fontSize: 12,
            fontFamily :"TitilliumWeb-Regular",
            color: "#48494a",
            marginLeft: 5
          },
          link: {
            fontSize: 16,
            fontFamily :"TitilliumWeb-Bold",
            color: "#159dbf",
            alignSelf:'center',
            marginLeft: 16,
            marginTop: 10,
            alignSelf: 'flex-end'
          },
         
          detButton :{
              flexDirection: 'row',
              padding: 5,
          },
          deskripsi: {
            fontSize: 14,
            fontFamily :"TitilliumWeb-Regular",
            color: "#525252",
            marginVertical:10,
            marginHorizontal: 20
          },
         
})
