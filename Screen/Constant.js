import React,{useState,useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View,Text } from "react-native";

const [getValue, setGetValue] = useState('');
  useEffect(() => {
    // Function to get the value from AsyncStorage
    AsyncStorage.getItem('AppSession').then(
      (value) =>
        // AsyncStorage returns a promise
        // Adding a callback to get the value
        setGetValue(value),
      // Setting the value in Text
    );
  }, []);
  
const AppSession = () => {
    
    return (
        <View><Text>{Session}</Text></View>
    )
}
export default AppSession ;