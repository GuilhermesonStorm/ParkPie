import { View, Text, SafeAreaView, PermissionsAndroid, StatusBar, Image, TouchableOpacity, StyleSheet } from "react-native"
import React, { useState, useEffect } from "react"
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps"
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { RectButton } from 'react-native-gesture-handler'
import { Feather } from "@expo/vector-icons"
import api from "../../services/api"
import { ParkingLots } from "../../interface/interfaces"

import { Container, 
  Title, 
  Header, 
  mapStyle, 
  Subtitle, 
  UserImage, 
  HeaderText, 
  CustomMapStyle, 
  Footer,
  FooterText,
  CreateParkingLotButton,
  } from './styles'
import styled from "styled-components"


export default function Map() {

  const navigation = useNavigation();

  const [ showModal, setShowModal ] = useState(false);
  
  const [ appointments, setAppointments ] = useState<Appointments[]>([])

  const handleNavigateToParkingLot = (id: number) => {
    navigation.navigate('ParkingLotDetails', { id });
  }

  function handleNavigateToCreateParkingLot() {
    navigation.navigate('SelectMapPosition')
  }

  function handleNavigateToAppointmentsList() {
    navigation.navigate('AppointmentsList')
  }

  

  let [ currentLocation, setCurrentLocation] = useState({
    latitude: -22.4789591,
    longitude: -43.816336,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  });
  let [ mapCurrentLocation, setMapCurrentLocation] = useState({
    latitude: -22.4789591,
    longitude: -43.816336,
    latitudeDelta: 0.008, //0.004122
    longitudeDelta: 0.008, //0.00202
  });
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async function() {
      const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);
      if(status === 'granted') {
        var location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest })
        //console.log(location)
      } else {
        throw new Error('Permissão negada')
      }
      setMapCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: mapCurrentLocation.latitudeDelta,
        longitudeDelta: mapCurrentLocation.longitudeDelta,
      })
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: currentLocation.latitudeDelta,
        longitudeDelta: currentLocation.longitudeDelta,
      })
    }) ()
    
  }, [])

  const [ parkingLots, setParkingLots ] = useState<ParkingLots[]>([])

  useFocusEffect(() => {
    api.get("/listar-estacionamentos").then(({ data }) => {
      //console.log(data)
      setParkingLots(data);
      
    })
  })



  return (
    <Container>

      <StatusBar 
        barStyle='light-content'
        backgroundColor='#0c0933'
      />

      <Header>
        <TouchableOpacity onPress={handleNavigateToAppointmentsList}>
          <UserImage source={require('../../assets/hashirama.png')} />
        </TouchableOpacity>
        <HeaderText>
          <Title>Olá, Guilherme.</Title>
          <Subtitle>Vamos onde hoje?</Subtitle>
        </HeaderText>
          
      </Header>

      <MapView 
        provider={PROVIDER_GOOGLE}
        style={mapStyle.map}
        customMapStyle={CustomMapStyle}
        initialRegion={mapCurrentLocation}
        >
          <Marker 
            coordinate={currentLocation}
            icon={require('../../assets/userGPS.png')}
            style={mapStyle.userMarker}
          />

          {parkingLots.map(parkingLot => {
            return (
              <Marker
                key={parkingLot.id}
                calloutAnchor={{
                  x: 2.7,
                  y: 0.8,
                }}
                coordinate={{
                  latitude: parkingLot.latitude,
                  longitude: parkingLot.longitude,
                }}
                style={mapStyle.parkingLotMarker}
                icon={require("../../assets/pie_marker.png")}
                >
                <Callout tooltip onPress={ () => {handleNavigateToParkingLot(parkingLot.id)}}>
                  <View style={mapStyle.calloutContainer}>
                    <Text style={mapStyle.calloutText}>{parkingLot.name}</Text>
                  </View>
                </Callout>
              </Marker>
            )
          })}
      </MapView>

      <View style={mapStyle.footer}>
          <Text style={mapStyle.footerText}> {parkingLots.length}  estacionamentos encontrados</Text>
          <RectButton style={mapStyle.createParkingLotButton} onPress={handleNavigateToCreateParkingLot}>
            <Feather name='plus' size={20} color="#fff"/>
          </RectButton>
      </View>
    </Container>

  )
}