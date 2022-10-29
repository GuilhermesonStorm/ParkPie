import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { TabActions } from '@react-navigation/native';

import Map from './Map';
import ParkingLotDetails from './ParkingLotDetails';
import SelectMapPosition from './CreateParkingLot/SelectMapPosition';
import ParkingLotData from './CreateParkingLot/ParkingLotData';
import { AppointmentsList } from './AppointmentsList';
import Header from './components/Header/Header';

const { Navigator, Screen } = createNativeStackNavigator()

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={ { headerShown: false, } }>
        <Screen 
          name='Map' 
          component={Map}
        />
        <Screen 
          name='ParkingLotDetails'
          component={ParkingLotDetails}
          options={{
            headerShown: true,
            header: () => <Header title="Detalhes" />
          }}
        />
        <Screen 
          name='SelectMapPosition' 
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Marque a posição no mapa" />
          }}
        />
        <Screen 
          name='ParkingLotData' 
          component={ParkingLotData}
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados" />
          }}
        />
        <Screen 
          name='AppointmentsList' 
          component={AppointmentsList}
          options={{
            headerShown: true,
            header: () => <Header title="Lista de agendamentos" />
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

// return (
//   <Tab.Navigator screenOptions={
//     {
//       headerShown: false,
//       tabBarStyle: {
//         backgroundColor: '#0c0933',
//       }
//     }
//     }>
//     <Tab.Screen 
//       name="Home" 
//       component={GPS}
//       options={
//         {
//           tabBarIcon: (tabInfo) => {
//             return <Feather 
//               name="map-pin"
//               size={24}
//               color={tabInfo.focused ? "#fff" : "#8e8e93"} 
//             />
//           }
//         }
//       }
//     />
//     <Tab.Screen 
//       name="PakingLot" 
//       component={ParkingLot} 
//       options={
//         {
//           tabBarIcon: (tabInfo) => {
//             return <Feather 
//               name="list"
//               size={24}
//               color={tabInfo.focused ? "#fff" : "#8e8e93"}
//             />
//           }
//         }
//       }
//     />
//   </Tab.Navigator>
// );