import React, { useState } from 'react';
import { 
  ScrollView, 
  View, 
  StyleSheet, 
  Switch, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'

import { ParkingLots } from '../../interface/interfaces';

import api from '../../services/api';

interface ParkingLotDataParams {
  position: {
    latitude: number;
    longitude: number;
  }
}

export default function ParkingLotData() {
  const routes = useRoute();
  const navigation = useNavigation();

  const { position } = routes.params as ParkingLotDataParams;

  const [ name, setName ] = useState('')
  const [ descricao, setDescricao ] = useState('')
  const [ number_parking_spaces, set_number_parking_spaces ] = useState('')
  const [ time_opening, set_time_opening ] = useState('')
  const [ time_closing, set_time_closing ] = useState('')
  const [ price_hour, set_price_hour ] = useState('')
  const [ price_piecoins, set_price_piecoins ] = useState('')


  const handleCreateParkingLot = () => {
    const { latitude, longitude } = position;

    // const data = new FormData();

    // data.append('name', name)
    // data.append('descricao', descricao)
    // data.append('latitude', String(latitude));
    // data.append('longitude', String(longitude));
    // data.append('number_parking_spaces', number_parking_spaces)
    // data.append('time_opening', time_opening)
    // data.append('time_closing', time_closing)
    // data.append('price_hour', price_hour)
    // data.append('price_piecoins', price_piecoins)


    api.post('/cadastrar-estacionamentos', {
      name,
      descricao,
      latitude,
      longitude,
      number_parking_spaces,
      time_opening,
      time_closing,
      price_hour,
      price_piecoins
    })
      .then(() => {
        navigation.navigate('Map');
      })
      .catch(() => {
        return alert('Houve um erro inesperado.');
      });
  }

  const handleSelectImages = async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      return alert('Necessário conceder acesso as fotos.');
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })

    if (result.cancelled) return;

  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={text => setDescricao(text)}
      />

      <Text style={styles.label}>Número de vagas</Text>
      <TextInputMask 
        style={styles.input}
        type={'custom'}
        options={{
          mask: '999'
        }}
        value={number_parking_spaces}
        onChangeText={text => set_number_parking_spaces(text)}
        keyboardType='numeric'
      />

      <Text style={styles.label}>Hora de abertura</Text>
      <TextInputMask 
        style={styles.input}
        type={'custom'}
        options={{
          mask: '99:99'
        }}
        value={time_opening}
        onChangeText={text => set_time_opening(text)}
        keyboardType='numeric'
      />

      <Text style={styles.label}>Hora que fecha</Text>
      <TextInputMask 
        style={styles.input}
        type={'custom'}
        options={{
          mask: '99:99'
        }}
        value={time_closing}
        onChangeText={text => set_time_closing(text)}
        keyboardType='numeric'
      />

      <Text style={styles.label}>Preço por hora</Text>
      <TextInputMask 
        style={styles.input}
        type={'custom'}
        options={{
          mask: '99.99'
        }}
        value={price_hour}
        onChangeText={text => set_price_hour(text)}
        keyboardType='numeric'
      />

      <Text style={styles.label}>Preço PieCoins</Text>
      <TextInput
        style={styles.input}
        value={price_piecoins}
        onChangeText={set_price_piecoins}
        keyboardType='numeric'
      />


      {/* <Text style={styles.label}>Fotos</Text> */}

      {/* <View style={styles.uploadedImageContainer}>
        {images.map((image) => {
          return (
            <Image 
              key={image}
              style={styles.uploadedImage}
              source={{ uri: image }}
            />
          );
        })}
      </View> */}

      {/* <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#0c0933" />
      </TouchableOpacity> */}

      <RectButton style={styles.nextButton} onPress={handleCreateParkingLot}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3'
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top'
  },

  uploadedImageContainer: {
    flexDirection: 'row'
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight:8
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#0c0933',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})