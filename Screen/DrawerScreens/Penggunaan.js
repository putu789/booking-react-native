import React from 'react'
import { 
    StyleSheet, Text,
    View, SafeAreaView, ScrollView,Image } from 'react-native'

const Penggunaan = () => {
    return (
        <SafeAreaView style={styles.container}>
         
        <ScrollView
   keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
            <Text style={styles.title}>Cara Menggunakan Aplikasi</Text>
            
            <Image source={{uri: 'http://daftar.asysyifa-sambi.com/php/img/cara1.png'}} style={styles.gambar} />
            <Text style={styles.deskripsi}>1. Tekan tombol Daftar, untuk melakukan pendaftaran. 
            Lalu masukan tanggal periksa, Poliklinik, Dokter, Jenis Bayar, Lalu tekan Booking Periksa, Setelah itu muncul
            Pop Up detail Booking Anda. Apabila Data sudah benar tekan tombol BOOKING. Booking berhasil apabila Anda
            sudah melihat kode booking dan No Urut. 
            </Text>
            <Text style={styles.deskripsi}>2. Menu Kamar : digunakan untuk melihat ketersediaan kamar di RSU Asy Syifa Sambi.
            Warna merah berarti kamar terisi, warna hijau berarti kamar kosong.
            
            </Text>
            <Text style={styles.deskripsi}>
            *Perlu diperhatikan mungkin ada sedikit perbedaan kamar sebenarnya dan yang terdapat di Aplikasi Ini
            </Text>
            <Text style={styles.deskripsi}>
                3. Jadwal Dokter : digunakan untuk melihat jadwal dokter spesiali RSU ASY SYIFA SAMBI.
            
            </Text>
            <Text style={styles.deskripsi}>
                4. Riwayat : digunakan untuk melihat riwayat pemeriksaan yang sudah pernah Anda lakukan di RSU Asy SYifa Sambi.
                untuk menggunakannya cukup dengan memilih rentang tanggal yang anda inginkan
            
            </Text>
            <Text style={styles.deskripsi}>
                4. Cek Kode Booking : 
                Cek kode booking periksa yang sudah anda lakukan, di menu ini juga dapat digunakn untuk 
                membatalkan booking periksa anda. cari kode booking dengan memasukan tanggal dan nomor rekam medis
                yang ingin anda cari, setelah data ditemukan terdapat tombol batal booking yang digunakan untuk membatlkan booking periksa
            
            </Text>
            <Text style={styles.deskripsi}>
                5. Kartu Pasien : 
                Merupakan fitur untuk mencetak kartu pasien Virtual
            
            </Text>
            <Text style={styles.deskripsi}>
                6. Daftar Keluarga : 
                Apabila anda ingin mendaftarkan keluarga, maka gunakan menu ini. perlu diketahui, fitur ini 
                hanya dapat digunakan untuk pasien yang pernah melakukan pemeriksaan di RSU Asy Syifa Sambi.
            </Text>
           
        </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default Penggunaan

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 20,
      },
      card: {
       marginHorizontal: 30,
      },
      item: {
        backgroundColor: '#369cb3',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10
      },
      title: {
        fontSize: 24,
        fontFamily :"TitilliumWeb-Bold",
        color: "#525252",
        marginBottom: 10,
      },
      deskripsi: {
        fontSize: 14,
        fontFamily :"TitilliumWeb-Regular",
        color: "#525252",
        marginVertical:5,
      },
      gambar :{
        alignSelf: 'center',
        width: '100%',
        height: 300,
        resizeMode: 'cover'
      },
      panah: {
        fontSize: 25,
        fontFamily :"TitilliumWeb-Bold",
        color: "white",
      },
      detButton :{
          flexDirection: 'row',
          justifyContent: 'space-between'
      },
      ImageBackground:{
        flexDirection:'column',
        justifyContent:'space-between',
        alignSelf:'center',
        width: 250,
        height:120,
      },
})
