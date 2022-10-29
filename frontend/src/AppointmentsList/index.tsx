import React, { useState, useEffect } from 'react'
import { FlatList, Alert, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';
import { Container } from './styles'
import { ListCard } from '../components/ListCard'
import { ScrollView } from 'react-native-gesture-handler';


interface Appointments {
  id_appointment: number;
  id_estacionamento: number;
  data: string;
  time_enter: string;
  time_exit: string;
}

export function AppointmentsList() {

  const [appointments, setAppointments] = useState<Appointments[]>([])

  async function handleAppointments() {
    const appointmentsData = await api.get("/listar-agendamentos")
    console.log(appointmentsData.data)

    setAppointments(appointmentsData.data)
  }

  // function handleDeleteAppointment(id: number) {
  //   Alert.alert('Exclusão', 'Tem certeza?', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => console.log('Cancel Pressed')
  //     },
  //     {
  //       text: 'OK',
  //       onPress: () => api.delete(`/deletar-agendamento/${id}`)
  //     }
  //   ])
  // }

  useEffect(() => {
    handleAppointments()
  }, [])

  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={appointments}
        keyExtractor={item => item.id_appointment}
        renderItem={({ item }) => (
          <ListCard
            item={item}
              onPress={() => {}}
          />
        )}
      />
    </View>

  )
}

const styles = StyleSheet.create({
  modalBody: {
    backgroundColor: '#0c0933',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 300,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 40,
    paddingLeft: 20
  },
  modalItem: {
    backgroundColor: '#E6F7FB',
    minHeight: 280,
    minWidth: 300,
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
  modalItemText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3'
  },
  closeButton: {
    width: 40,
    height: 40,
  },
})