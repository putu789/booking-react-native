
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image, Text} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('AppSession').then((value) =>
        navigation.replace(value === null ? 'Auth' : 'DrawerNavigationRoutes'),
      );
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../Image/splashLogo.png')}
        style={{width: 80, height:80, margin: 30}}
      />
      <View style={styles.detail}>
        <Text style={styles.text1}>Asy-Syifa Sambi</Text>
        <Text style={styles.text2}>Mobile</Text>
      </View>
      <ActivityIndicator
        animating={animating}
        color="#39a0bf"
        size="large"
        style={styles.activityIndicator}
      />
      <Text style={styles.text3}>Powered By :</Text>
       <Image
        source={require('../Image/rsSplash.png')}
        style={{width: 135, height:25 ,justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', 
        bottom: 10,}}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  detail :{
    flexDirection: 'row',
  },
  text1:{
    color: '#37ad51',
    fontFamily: 'TitilliumWeb-Bold',
    fontSize: 16,
  },
  text2 :{
    color : '#1e497d',
    fontFamily: 'TitilliumWeb-Bold',
    fontSize: 16,
  },
  text3 :{
    color : '#bec9d1',
    fontFamily: 'TitilliumWeb-Bold',
    fontSize: 11,
    fontStyle:'italic',
    position: 'absolute',
    bottom: 38,
  }
});
