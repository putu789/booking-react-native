import React from 'react'
import { StyleSheet, Text, View,Dimensions,
    SafeAreaView,StatusBar,Image } from 'react-native'

const About = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor='#2ba631'/>
            <View style={{flex: 1}}>
                <View style={styles.box}>
                    <Text style={styles.judul}>Tentang Asy Syifa Sambi Mobile</Text>
                    <Text style={styles.sub1}>Dibuat dan didesain Oleh :</Text>
                    <Text style={styles.sub1}>Tim IT RSU ASY SYIFA SAMBI</Text>
                    <View style={styles.container}> 
                        <View style={styles.contDaftar}>
                            <Image source={{uri: 'http://10.5.50.33/php/img/develop.png'}} style={{
                            width: 35,
                            height:35,
                            }}/>
                            <View style={styles.contSubDaftar}>
                                <Text style={styles.textDaftarHead}>FrontEnd & BackEnd Programmer</Text>
                                <Text style={styles.textDaftarbody}>Putu Tri Sabdojati</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.container}> 
                        <View style={styles.contDaftar}>
                            <Image source={{uri: 'http://10.5.50.33/php/img/ui.png'}} style={{
                                width: 35,
                                height:35,
                                }}/>
                            <View style={styles.contSubDaftar}>
                                <Text style={styles.textDaftarHead}>UI Designer</Text>
                                <Text style={styles.textDaftarbody}>Amin Rohmad Choironi</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.labelText}>{'\u00A9'} RSU ASY SYIFA SAMBI BOYOLALI</Text>
                    <Image source={require('../../Image/bg.png')} style={styles.ImageBackground}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default About
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    box:{
        backgroundColor:'#ffffff',
        borderRadius: 5,
        padding: 10,
        marginHorizontal:10,
        marginTop: 10,
        height : windowHeight*0.8,
        
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
    judul:{
      fontFamily:"TitilliumWeb-Bold",
      fontSize: 18,
      marginVertical: 5,
      color: '#000000' ,
      marginHorizontal:20,
      alignSelf: 'center',
    },
    sub1 :{
    fontFamily:"TitilliumWeb-Bold",
    fontSize: 14,
    marginVertical:5,
    color: '#1b618f',
    alignSelf: 'center'
    },
    contDaftar:{
        flexDirection: 'row',
        marginBottom : 5,
      } ,     
    
    
    labelText:{
      fontFamily:"TitilliumWeb-Bold",
      fontSize: 12,
      marginVertical: 5,
      color: '#000000',
      alignSelf: 'center',
    },
    
    
    ImageBackground:{
      justifyContent:'space-between',
      alignSelf:'center',
      width: 300,
      height:100,
      position:'absolute',
      bottom:0,
    },
    
   container:{
    backgroundColor:"#ffffff",
    padding: 17,
    marginHorizontal:30,
    borderRadius:10,
    shadowColor: "#000",
    
    },
      
      textDaftarHead:{
        fontFamily :"TitilliumWeb-Bold",
        fontSize : 13,
        marginHorizontal:5 ,
      },
      contSubDaftar:{
        flexDirection: 'column',
      } , 
      textDaftarbody:{
        fontFamily :"TitilliumWeb-regular",
        fontSize : 11,
        marginHorizontal:5 ,
      },
    
    textStyle:{
      fontFamily :"TitilliumWeb-Bold",
      color: "white",
      fontWeight: "bold",
    }
})
