import React,{useState} from 'react';
import {StyleSheet, View, Modal,Text,TouchableOpacity, Image} from 'react-native';

const Galat = (props) => {
  const {galat, ...attributes} = props;
  const [modal, setModal] = useState(false);
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={galat}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
            <Image source={require('../../Image/no-wifi.png')} style={{width:100, height:100,}}/>
            <Text style={styles.textStyle}>Tidak Dapat Terhubung</Text>
        </View>
        
      </View>
    </Modal>
  );
};

export default Galat;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000090',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#00000000',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  batalButton: {
    backgroundColor: "#bf0628",
    borderRadius: 5,
    padding: 10
  },
  textStyle: {
    fontFamily :"TitilliumWeb-Bold",
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 60,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
  },
});
