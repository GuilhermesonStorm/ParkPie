import React, { useEffect, useState } from 'react';
import { 
  Image, 
  View, 
  ScrollView, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  Linking
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute, useFocusEffect } from '@react-navigation/native'

import { ParkingLots } from '../../interface/interfaces'
import api from '../../services/api';
import ParkingLotModal from '../components/Modal/ParkingLotModal';
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

interface ParkingLotDetailsParams {
  id: number;
}

export default function ParkingLotDetails() {
  const route = useRoute();

  const { id } = route.params as ParkingLotDetailsParams

  const [ parkingLot, setParkingLot ] = useState<ParkingLots>();
  const [ showModal, setShowModal ] = useState(false);

  useEffect(() => {
    api.get(`/listar-estacionamentos/${id}`).then(({ data }) => {
      //console.log(parkingLot)
      setParkingLot(data)
    })
  }, [id])


  if (!parkingLot) {
    return (
      <View style={styles.container}>
        <Text style={styles.description} >Carregando...</Text>
      </View>
    )
  }

  const handleOpenGoogleMapsRoutes = () => {
    Linking.openURL(`http://maps.google.com/maps?saddr=${parkingLot.latitude},${parkingLot.longitude}`);
  }

  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {parkingLot.images.map((image) => {
            console.log(image.url)
            return (
              <Image
                key={image.id}
                style={styles.image} 
                source={{ uri: image.url }}
              />
            );
          })}
        </ScrollView>
      </View> */}

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{parkingLot.name}</Text>
      
        <View style={styles.mapContainer}>
          <MapView 
            initialRegion={{
              latitude: parkingLot.latitude,
              longitude: parkingLot.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }} 
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker 
              icon={require('../../assets/pie_marker.png')}
              coordinate={{ 
                latitude: parkingLot.latitude,
                longitude: parkingLot.longitude,
              }}
            />
          </MapView>

          <TouchableOpacity onPress={handleOpenGoogleMapsRoutes} style={styles.routesContainer}>
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </TouchableOpacity>
        </View>
      
        <View style={styles.separator} />

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name='dollar-sign' size={40} color='#2AB5D1' />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>Pre??o / hora: {Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).format(parkingLot.price_hour)}</Text>
          </View>
        </View>
        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name='clock' size={40} color='#2AB5D1' />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>Segunda ?? Sexta {parkingLot.time_opening} ??s {parkingLot.time_closing}</Text>
          </View>
        </View>

        <RectButton style={styles.contactButton} onPress={() => setShowModal(true)}>
          <Text style={styles.contactButtonText}>Agendar</Text>
        </RectButton>

        <ParkingLotModal
          show={showModal}
          setShow={setShowModal}
          parkingLot={parkingLot}
        >

        </ParkingLotModal>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
  },

  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover',
  },

  detailsContainer: {
    padding: 24,
  },

  title: {
    color: '#4D6F80',
    fontSize: 30,
    fontFamily: 'Nunito_700Bold',
  },

  description: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
  },

  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#B3DAE2',
    marginTop: 40,
    backgroundColor: '#E6F7FB',
  },

  mapStyle: {
    width: '100%',
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  routesText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5'
  },

  separator: {
    height: 0.8,
    width: '100%',
    backgroundColor: '#D3E2E6',
    marginVertical: 40,
  },

  scheduleContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  scheduleItem: {
    width: '48%',
    padding: 20,
  },

  scheduleItemBlue: {
    backgroundColor: '#E6F7FB',
    borderWidth: 1,
    borderColor: '#B3DAE2',
    borderRadius: 20,
  },

  scheduleItemGreen: {
    backgroundColor: '#EDFFF6',
    borderWidth: 1,
    borderColor: '#A1E9C5',
    borderRadius: 20,
  },

  scheduleItemRed: {
    backgroundColor: '#fdf0f5',
    borderWidth: 1,
    borderColor: '#ffbcd4',
    borderRadius: 20,
  },

  scheduleText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },

  scheduleTextBlue: {
    color: '#5C8599'
  },

  scheduleTextGreen: {
    color: '#37C77F'
  },

  scheduleTextRed: {
    color: '#FF669D'
  },

  contactButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 40,
  },

  contactButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
  }
})

