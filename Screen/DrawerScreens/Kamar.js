import React,{useState, useEffect} from 'react'
import { StyleSheet,SafeAreaView, Text, View,
    FlatList,Image,Alert,TouchableOpacity
 } from 'react-native'
 import Loader from "../Components/Loader";
 const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  
 
const Kamar = () => {
    const [loading, setLoading] = useState(false);
    const [menu, setMenu] = useState('cendana');
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
      setLoading(true);
        fetch('http://10.5.50.33/php/getKamar.php', {
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
                    if(responseJson.data == 'null'){
                        setKos('Tidak Ada Data');
                    }
                  } else {
                    console.log('Tidak Ada Data');
                  }
                })
                .catch((error) => {
                  setLoading(false);
                  Alert.alert('Tidak dapat menghubungkan');
                });
      }, []);
      const edelweis=()=>{
        setLoading(true);
        fetch('http://10.5.50.33/php/getKamarEdelweis.php', {
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
                    setMenu('edelweis');
                    console.log(responseJson.data);
                    if(responseJson.data == 'null'){
                        setKos('Tidak Ada Data');
                    }
                  } else {
                    console.log('Tidak Ada Data');
                  }
                })
                .catch((error) => {
                  setLoading(false);
                  Alert.alert('Tidak dapat menghubungkan');
                });
      }
      const tulip=()=>{
        setLoading(true);
        fetch('http://10.5.50.33/php/getKamarTulip.php', {
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
                    setMenu('tulip');
                    console.log(responseJson.data);
                    if(responseJson.data == 'null'){
                        setKos('Tidak Ada Data');
                    }
                  } else {
                    console.log('Tidak Ada Data');
                  }
                })
                .catch((error) => {
                  setLoading(false);
                  Alert.alert('Tidak dapat menghubungkan');
                });
      }
      const cendana=()=>{
        setLoading(true);
        fetch('http://10.5.50.33/php/getKamar.php', {
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
                    setMenu('cendana');
                    console.log(responseJson.data);
                    if(responseJson.data == 'null'){
                        setKos('Tidak Ada Data');
                    }
                  } else {
                    console.log('Tidak Ada Data');
                  }
                })
                .catch((error) => {
                  setLoading(false);
                  Alert.alert('Tidak dapat menghubungkan');
                });
      }
      const icu=()=>{
        setLoading(true);
        fetch('http://10.5.50.33/php/getKamarIcu.php', {
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
                    setMenu('icu');
                    console.log(responseJson.data);
                    if(responseJson.data == 'null'){
                        setKos('Tidak Ada Data');
                    }
                  } else {
                    console.log('Tidak Ada Data');
                  }
                })
                .catch((error) => {
                  setLoading(false);
                  Alert.alert('Tidak dapat menghubungkan');
                });
      }
      const Iteme = ({ item, onPress, style }) => 
      (
            <View>
                 {item.status !== 'ISI' ? (
                <View style={styles.bangsal}>
                    <View style={styles.bangsalO}>
                      <Text style={styles.textBangsal}>{item.nm_bangsal}</Text>
                      <Text style={styles.textBangsal}>{item.status}</Text>
                      <Image source={require('../../Image/bed.png')} style={{
                    width: 35,
                    height:35,
                  }} />    
                  </View>
                  <Text style={styles.textBangsal}>{item.kelas}</Text>
                </View>
                
                ) :
                <View style={styles.bangsalIsi}>
                  <View style={styles.bangsalO}>
                <Text style={styles.textBangsal}>{item.nm_bangsal}</Text>
                <Text style={styles.textBangsal}>{item.status}</Text>
                <Image source={require('../../Image/bed.png')} style={{
                    width: 35,
                    height:35,
                  }} />    
                  </View>
                  <Text style={styles.textBangsal}>{item.kelas}</Text>
                </View>
            }
                </View>
        
      );
      const ItemTulip = ({ item, onPress, style }) => 
      (
            <View>
                 {item.status !== 'ISI' ? (
                <View style={styles.bangsal}>
                    <View style={styles.bangsalO}>
                      <Text style={styles.textBangsal}>{item.nm_bangsal}</Text>
                      <Text style={styles.textBangsal}>{item.status}</Text>
                      <Image source={require('../../Image/bed.png')} style={{
                    width: 35,
                    height:35,
                  }} />    
                  </View>
                  <Text style={styles.textBangsal}>{item.kelas}</Text>
                </View>
                
                ) :
                <View style={styles.bangsalIsi}>
                  <View style={styles.bangsalO}>
                <Text style={styles.textBangsal}>{item.nm_bangsal}</Text>
                <Text style={styles.textBangsal}>{item.status}</Text>
                <Image source={require('../../Image/bed.png')} style={{
                    width: 35,
                    height:35,
                  }} />    
                  </View>
                  <Text style={styles.textBangsal}>{item.kelas}</Text>
                </View>
            }
                </View>
        
      );
      const ItemIcu = ({ item, onPress, style }) => 
      (
            <View>
                 {item.status !== 'ISI' ? (
                <View style={styles.bangsal}>
                    <View style={styles.bangsalO}>
                      <Text style={styles.textBangsal}>{item.nm_bangsal}</Text>
                      <Text style={styles.textBangsal}>{item.status}</Text>
                      <Image source={require('../../Image/bed.png')} style={{
                    width: 35,
                    height:35,
                  }} />    
                  </View>
                  <Text style={styles.textBangsal}>{item.kelas}</Text>
                </View>
                
                ) :
                <View style={styles.bangsalIsi}>
                  <View style={styles.bangsalO}>
                <Text style={styles.textBangsal}>{item.nm_bangsal}</Text>
                <Text style={styles.textBangsal}>{item.status}</Text>
                <Image source={require('../../Image/bed.png')} style={{
                    width: 35,
                    height:35,
                  }} />    
                  </View>
                  <Text style={styles.textBangsal}>{item.kelas}</Text>
                </View>
            }
                </View>
        
      );
      const Item = ({ item, onPress, style }) => 
      (
            <View>
                 {item.status !== 'ISI' ? (
                <View style={styles.bangsal}>
                    <View style={styles.bangsalO}>
                      <Text style={styles.textBangsal}>{item.nm_bangsal}</Text>
                      <Text style={styles.textBangsal}>{item.status}</Text>
                      <Image source={require('../../Image/bed.png')} style={{
                    width: 35,
                    height:35,
                  }} />    
                  </View>
                  <Text style={styles.textBangsal}>{item.kelas}</Text>
                </View>
                
                ) :
                <View style={styles.bangsalIsi}>
                  <View style={styles.bangsalO}>
                <Text style={styles.textBangsal}>{item.nm_bangsal}</Text>
                <Text style={styles.textBangsal}>{item.status}</Text>
                <Image source={require('../../Image/bed.png')} style={{
                    width: 35,
                    height:35,
                  }} />    
                  </View>
                  <Text style={styles.textBangsal}>{item.kelas}</Text>
                </View>
            }
                </View>
        
      );
      if (menu == 'edelweis') {
        return (
          <SafeAreaView style={styles.container}>
          <View style={styles.boxBangsal}>
          <Loader loading={loading} />
          <View style={styles.menu}>
          <TouchableOpacity style={styles.menuBtn} onPress={cendana}>
           <Text style={styles.title}> Cendana & Anggrek</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBtnActive} onPress={edelweis}>
           <Text style={styles.titleActive}>Edelweis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBtn} onPress={tulip}>
           <Text style={styles.title}>Tulip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBtn} onPress={icu}>
           <Text style={styles.title}>ICU</Text>
          </TouchableOpacity>
          </View>
          
          
         <FlatList
             data={dataSource}
             renderItem={Iteme}
             keyExtractor={item => item.kd_bangsal}
         />
         </View>
     </SafeAreaView>
        );
      }else if (menu == 'tulip') {
        return (
          <SafeAreaView style={styles.container}>
          <View style={styles.boxBangsal}>
          <Loader loading={loading} />
          <View style={styles.menu}>
          <TouchableOpacity style={styles.menuBtn} onPress={cendana}>
           <Text style={styles.title}> Cendana & Anggrek</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBtn} onPress={edelweis}>
           <Text style={styles.title}>Edelweis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBtnActive} onPress={tulip}>
           <Text style={styles.titleActive}>Tulip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBtn} onPress={icu}>
           <Text style={styles.title}>ICU</Text>
          </TouchableOpacity>
          </View>
          
          
         <FlatList
             data={dataSource}
             renderItem={ItemTulip}
             keyExtractor={item => item.kd_bangsal}
         />
         </View>
     </SafeAreaView>
        );
      }else if (menu == 'icu') {
        return (
          <SafeAreaView style={styles.container}>
          <View style={styles.boxBangsal}>
          <Loader loading={loading} />
          <View style={styles.menu}>
          <TouchableOpacity style={styles.menuBtn} onPress={cendana}>
           <Text style={styles.title}> Cendana & Anggrek</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBtn} onPress={edelweis}>
           <Text style={styles.title}>Edelweis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBtn} onPress={tulip}>
           <Text style={styles.title}>Tulip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBtnActive} onPress={icu}>
           <Text style={styles.titleActive}>ICU</Text>
          </TouchableOpacity>
          </View>
          
          
         <FlatList
             data={dataSource}
             renderItem={ItemIcu}
             keyExtractor={item => item.kd_bangsal}
         />
         </View>
     </SafeAreaView>
        );
      }else{
        return (
          <SafeAreaView style={styles.container}>
          <View style={styles.boxBangsal}>
          <Loader loading={loading} />
          <View style={styles.menu}>
          <TouchableOpacity style={styles.menuBtnActive} onPress={cendana}>
           <Text style={styles.titleActive}> Cendana & Anggrek</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBtn} onPress={edelweis}>
           <Text style={styles.title}>Edelweis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBtn} onPress={tulip}>
           <Text style={styles.title}>Tulip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBtn} onPress={icu}>
           <Text style={styles.title}>ICU</Text>
          </TouchableOpacity>
          </View>
          
          
         <FlatList
             data={dataSource}
             renderItem={Item}
             keyExtractor={item => item.kd_bangsal}
         />
         </View>
     </SafeAreaView>
        );
      }
   /*  return (
        <SafeAreaView style={styles.container}>
             <View style={styles.boxBangsal}>
             <Loader loading={loading} />
             <View style={styles.menu}>
             <TouchableOpacity style={styles.menuBtnActive} onPress={cendana}>
              <Text style={styles.titleActive}> Cendana & Anggrek</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.menuBtn} onPress={edelweis}>
              <Text style={styles.title}>Edelweis</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.menuBtn} onPress={tulip}>
              <Text style={styles.title}>Tulip</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.menuBtn} onPress={icu}>
              <Text style={styles.title}>ICU</Text>
             </TouchableOpacity>
             </View>
             
             
            <FlatList
                data={dataSource}
                renderItem={Item}
                keyExtractor={item => item.kd_bangsal}
            />
            </View>
        </SafeAreaView>
    ) */
}

export default Kamar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 10,
      },
      item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 16,
        fontFamily:"TitilliumWeb-Bold",
        alignSelf: 'center',
        color: '#ffffff',
      },
      titleActive: {
        fontSize: 16,
        fontFamily:"TitilliumWeb-Bold",
        alignSelf: 'center',
        color: '#000000',
      },
      boxBangsal:{
        flex: 1,
      },
      bangsal :{
          backgroundColor: '#1cb044',
          padding: 10,
          flex: 1,
          flexDirection: 'column',
          marginVertical: 2,
          marginHorizontal: 20,
         

      },
      bangsalO :{
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    menu :{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      
  },
  menuBtn:{
    backgroundColor: '#383838',
    padding: 10,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  menuBtnActive:{
    backgroundColor: '#adacac',
    padding: 10,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
      bangsalIsi :{
        backgroundColor: '#ab182c',
        padding: 10,
        flex: 1,
        flexDirection: 'column',
        marginVertical: 2,
        marginHorizontal: 20,

    },
      textBangsal :{
        color: '#ffffff',
        fontSize: 12,
        fontFamily:"TitilliumWeb-Bold",
        
      },
      textBangsalIsi :{
        color: '#ab182c',
        fontSize: 12,
        fontFamily:"TitilliumWeb-Bold",
        alignSelf: 'center'
      },
      detButton :{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})
