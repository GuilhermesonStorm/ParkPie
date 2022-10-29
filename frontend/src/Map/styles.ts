import React from "react";
import styled from "styled-components/native";
import { Platform, StyleSheet, Dimensions } from "react-native";


export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #0c0933;
`
export const UserImage = styled.Image`
  height: 54px;
  width: 54px;
  border-radius: 50px;
  border: 1px #fff;
`

export const Header = styled.View`
  padding: 20px;
  padding-top: ${Platform.OS === 'android' ? 50 : 0};
  flex-direction: row;
`
export const HeaderText = styled.View`
  margin-left: 20px;
  margin-bottom: 35px;
`

export const Title = styled.Text`
  font-family: 'Nunito_700Bold';
  color: #fff;
  font-size: 24px;
`
export const Subtitle = styled.Text`
  font-family: 'Nunito_600SemiBold';
  color: #fff9;
  font-size: 14px;
`

export const Footer = styled.View`
  position: absolute;
  left: 24;
  right: 24;
  bottom: 32;

  background-color: '#fff';
  border-radius: 20px;
  height: 46px;
  padding-left: 24;
  
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

`

export const FooterText = styled.Text`
  color: '#fff4';
`

export const CreateParkingLotButton = styled.TouchableOpacity`
  width: 56;
  height: 56;
  background-color: '#0c0933';
  border-radius: 20;

  justify-content: center;
`

export const mapStyle = StyleSheet.create({
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  userMarker: {
    height: 0.1,
    width: 0.1,
  },
  parkingLotMarker: {
    height: 0.1,
    width: 0.1,
  },
  markerContainer: {
    width: 90,
    height: 70,
    backgroundColor: "#0c0933",
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },
  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
    
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: '#0c0933',
    borderRadius: 26,
    justifyContent: 'center',
  },
  calloutText: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#fff',
    fontSize: 13,
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },
  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3'
  },
  createParkingLotButton: {
    width: 56,
    height: 56,
    backgroundColor: '#0c0933',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'
  }
})

export const CustomMapStyle = [
  {
    "featureType": "landscape.man_made",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.attraction",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "poi.government",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]