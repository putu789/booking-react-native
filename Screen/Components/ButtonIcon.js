import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { IconAbout,IconAduan,IconBed,IconCard,IconFamily,IconJadwal,IconRiwayat,IconObat } from '../../Image/index'


const ButtonIcon = ({title, onPress}) => {
    
    const Icon =() =>{
        if (title === "Ketersediaan Kamar") return <IconBed/>;
        if (title === "Jadwal Dokter") return <IconJadwal/>;
        if (title === "Riwayat Periksa") return <IconRiwayat/>;
        if (title === "Resep Obat") return <IconObat/>;
        if (title === "E-Kartu Pasien") return <IconCard/>;
        if (title === "Daftar Keluarga") return <IconFamily/>;
        if (title === "Aduan Pasien") return <IconAduan/>;
        if (title === "About") return <IconAbout/>;
    
        return <IconBed/>
    }
   
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate({title})}>
            <View style={styles.button}>
                <Icon/>
            </View>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ButtonIcon

const styles = StyleSheet.create({
    container:{
        marginBottom:12,
        marginRight:20,
    },
    icon:{
        backgroundColor:'#ffffff',
        padding:20,
        borderRadius:5,
    }, 
    button:{
        marginBottom:10,
    } ,
    text:{
        fontFamily:"TitilliumWeb-Bold",
        fontSize:10,
        textAlign:"center",
        marginBottom:10,
    }
})
