import React, {useState,useEffect, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Loader from './Components/Loader';

const RegisterScreen = ({props,navigation}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userTelpon, setUserTelpon] = useState('');
  const [userPassword1, setUserPassword1] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [netInfo, setNetInfo] = useState('');

  const nameInputRef = createRef();
  const emailInputRef = createRef();
  const addressInputRef = createRef();
  const teleponInputRef = createRef();
  const passwordInputRef = createRef();
  const password1InputRef = createRef();
  
  

  const handleSubmitButton = () => {
    
    setErrortext('');
    if (!userName) {
      Alert.alert('Nama Wajib Di Isi');
      return;
    }
    if (!userEmail) {
      Alert.alert('Email Wajib Di Isi');
      return;
    }
    
    if (!userAddress) {
      Alert.alert('Alamat Wajib Di Isi');
      return;
    }
    if (!userTelpon) {
      Alert.alert('Alamat Wajib Di Isi');
      return;
    }
    if (!userPassword) {
      Alert.alert('Password Wajib Di Isi');
      return;
    }
    if (userPassword != userPassword1){
      Alert.alert('Password dan Ulangi Password tidak sama');
      return;
    }
    if (userPassword.length < 8){
      Alert.alert('Password harus 8 angka atau lebih');
      return;
    }
    //Show Loader
    setLoading(true);
    var dataToSend = {
      user_name: userName,
      user_email: userEmail,
      user_address: userAddress,
      user_telepon: userTelpon,
      user_password: userPassword,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('http://daftar.asysyifa-sambi.com/php/register.php', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status == 'success') {
          setIsRegistraionSuccess(true);
          console.log('Pendaftaran Berhasil. Silahkan Login');
        }else if(responseJson.status == 'ada'){
          setErrortext('Email Sudah Digunakan');
        } else {
          setErrortext('Pendaftaran gagal');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        Alert.alert('Tidak dapat terhubung');
      });
  }
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../Image/success.png')}
          style={{height: 150, resizeMode: 'contain', alignSelf: 'center'}}
        />
        <Text style={styles.successTextStyle}>Akun Berhasil Dibuat. Aktifkan Akun Melalui Link yang dikirim ke email anda</Text>
        <Text style={styles.successTextStyle}>Apabila Email tidak ada dikotak masuk, silahkan cek Di folder SPAM</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <Text style={styles.headDat}>Masukan data diri Anda</Text>
          <Text style={styles.bodyDat}>Silahkan isi form dibawah ini dengan benar</Text>
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Nama"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                nameInputRef.current && nameInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserAddress) => setUserAddress(UserAddress)}
              underlineColorAndroid="#f000"
              placeholder="Alamat"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={addressInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserTelpon) => setUserTelpon(UserTelpon)}
              underlineColorAndroid="#f000"
              placeholder="Nomor Hp / Telepon"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={teleponInputRef}
              returnKeyType="next"
              keyboardType = 'numeric'
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) => setUserPassword(UserPassword)}
              underlineColorAndroid="#f000"
              placeholder="Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              secureTextEntry={true}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword1) => setUserPassword1(UserPassword1)}
              underlineColorAndroid="#f000"
              placeholder="Ulangi Password"
              placeholderTextColor="#8b9cb5"
              ref={password1InputRef}
              secureTextEntry={true}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>BUAT AKUN</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View style={styles.sud}>
        <Text style={styles.loginTextStyle}>
             Sudah Punya Akun?
            </Text>
            <Text style={styles.loginTextMasuk}
              onPress={() => navigation.navigate('LoginScreen')}>
             MASUK
            </Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  headDat:{
    fontFamily: "TitilliumWeb-Bold",
    marginHorizontal: 30,
    marginTop: 25,
    fontSize: 18,
  },
  bodyDat:{
    fontFamily: "TitilliumWeb-regular",
    marginHorizontal: 30,
    marginTop: 5,
    fontSize: 14,
  },
  buttonStyle: {
    
    backgroundColor: '#1c4966',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    fontFamily:"TitilliumWeb-Bold",
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  loginTextStyle:{
    fontFamily: "TitilliumWeb-regular",
    marginBottom: 5,
    fontSize: 14,
    
  },
  loginTextMasuk:{
    fontFamily: "TitilliumWeb-Bold",
    marginBottom: 5,
    fontSize: 16,
    color: "#e38b20",
    
  },
  sud:{
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 100,
    marginVertical:10
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
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});
