import React,{useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Dimensions, Image} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from './DrawerScreens/HomeScreen';
import AntrianScreen from './DrawerScreens/Antrian';
import AkunScreen from "./DrawerScreens/Akun";
import DetailScreen from "./DrawerScreens/DetailScreen";
import Layanan from "./DrawerScreens/Layanan";
import {Kamar, RegisterStepOne, Jadwal, Riwayat,Resep,Kartu,Keluarga,Aduan,About} from "./DrawerScreens/index";
import Penggunaan from './DrawerScreens/Penggunaan';
import StatusBpjs from './DrawerScreens/StatusBpjs';
import Peta from './DrawerScreens/Peta';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const homeScreenStack = ({navigation}) => {
  
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
         headerShown:false,
        }}
      />
      <Stack.Screen
        name="RegisterStepOne"
        component={RegisterStepOne}
        options={{
          title: 'Booking Periksa', 
          headerStyle: {
            backgroundColor: '#2ba631',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Kamar"
        component={Kamar}
        options={{
          title: 'Ketersediaan Kamar', 
          headerStyle: {
            backgroundColor: '#2ba631',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Jadwal"
        component={Jadwal}
        options={{
          title: 'Jadwal Dokter', 
          headerStyle: {
            backgroundColor: '#2ba631',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Riwayat"
        component={Riwayat}
        options={{
          title: 'Riwayat Pemeriksaan', 
          headerStyle: {
            backgroundColor: '#2ba631',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
         
        }}
      />
      <Stack.Screen
        name="Resep"
        component={Resep}
        options={{
          title: 'Cek Data Booking', 
          headerStyle: {
            backgroundColor: '#2ba631',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Kartu"
        component={Kartu}
        options={{
          title: 'Kartu Pasien', 
          headerStyle: {
            backgroundColor: '#2ba631',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Keluarga"
        component={Keluarga}
        options={{
          title: 'Daftar Keluarga', 
          headerStyle: {
            backgroundColor: '#2ba631',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Aduan"
        component={Aduan}
        options={{
          title: 'Info Lain', 
          headerStyle: {
            backgroundColor: '#2ba631',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />

       <Stack.Screen name="Kritik" component={DetailScreen} 
       options={{
        title: 'Info Lain', 
        headerStyle: {
          backgroundColor: '#2ba631',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}
       />
       <Stack.Screen name="gunakan" component={Penggunaan} 
       options={{
        title: 'Penggunaan Asysyifa Mobile', 
        headerStyle: {
          backgroundColor: '#2ba631',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}
       />
        <Stack.Screen name="statusBpjs" component={StatusBpjs} 
       options={{
        title: 'Cek Status BPJS ', 
        headerStyle: {
          backgroundColor: '#2ba631',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}
       />
        <Stack.Screen name="layanan" component={Layanan} 
       options={{
        title: 'Layanan RSU Asy Syifa Sambi', 
        headerStyle: {
          backgroundColor: '#2ba631',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}
       />
      <Stack.Screen
        name="About"
        component={About}
        
        options={{
          title: 'Tentang Aplikasi', 
          headerStyle: {
            backgroundColor: '#2ba631',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
         
         
        }}
      />
    </Stack.Navigator>
  );
};

const antrianScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="AntrianScreen"
      screenOptions={{
        headerShown:false,
      }}>
        
      <Stack.Screen
        name="AntrianScreen"
        component={AntrianScreen}
        options={{
          title: 'Antrian', 
        }}
      />
    </Stack.Navigator>
  );
};


const akunScreenStack = ({navigation}) => {
 
  return (
    <Stack.Navigator
      initialRouteName="AkunScreen"
      screenOptions={{
        
        headerShown:false,
      }}>
      <Stack.Screen
        name="AkunScreen"
        component={AkunScreen}
        options={{
          title: 'Akun', 
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = ({ state, descriptors, navigation,props }) => {
  
  return (
    <Tab.Navigator 
      screenOptions={{headerShown: false}}
      tabBarOptions={{
        activeTintColor: '#60d16f',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: '#ffffff',
          padding:10,
          height:windowHeight*0.08,
        },
        labelStyle: {
          textAlign: 'center',
          fontSize: 14,
        },
      }}
     >
      <Tab.Screen
        name="Home"
        options={{drawerLabel: 'Home Screen',
        tabBarIcon: ({focused, color, size}) => (
          <Image
            source={
              focused
                ? require('../Image/home_active.png')
                : require('../Image/home.png')
            }
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      }}
        component={homeScreenStack}
        
      />
      <Tab.Screen
        name="Antrian"
        options={{drawerLabel: 'Antrian Screen',
        tabBarIcon: ({focused, color, size}) => (
          <Image
            source={
              focused
                ? require('../Image/antri_active.png')
                : require('../Image/antri.png')
            }
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      }}
        component={antrianScreenStack}
      />
       <Tab.Screen
        name="Akun"
        options={{drawerLabel: 'Akun Screen',
        tabBarIcon: ({focused, color, size}) => (
          <Image
            source={
              focused
                ? require('../Image/akunBtn_active.png')
                : require('../Image/akunBtn.png')
            }
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      }}
        component={akunScreenStack}
      />
    </Tab.Navigator>
  );
};

export default DrawerNavigatorRoutes;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
