import React, { useState, useEffect } from "react";
import { View, Modal, Text, ModalProps, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler'
import { ParkingLots } from "../../../interface/interfaces";
import api from "../../../services/api";
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

interface ListDaysProps {
  weekday: string;
  number: number;
}


interface ParkingLotModalProps extends ModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  parkingLot: ParkingLots;
}



export default function ParkingLotModal({ show, setShow, parkingLot }: ParkingLotModalProps) {

  const navigation = useNavigation();

  const [ year, setYear ] = useState(0)
  const [ month, setMonth ] = useState(0)
  const [ day, setDay ] = useState(0)
  const [ hour, setHour ] = useState('')
  const [ listDays, setListDays] = useState<ListDaysProps[]>([])
  const [ listHours, setListHours ] = useState<string[]>([])
  const [ data, setData ] = useState<string>('')
  const [ time_enter, setTimeEnter ] = useState<string>('')
  const [ time_exit, setTimeExit ] = useState<string>('')

  // useEffect(() => {
  //   if(day > 0) {
  //     let d = new Date(year, month, day);
  //     let y = d.getFullYear()
  //     let m = d.getMonth() + 1
  //     let mString = String(m)
  //     let date = d.getDate()
  //     let dateString = String(date)
  //     mString = m < 10 ? '0'+m : String(m);
  //     dateString = date < 10 ? '0'+date : String(date)

  //     //let selDate = `${y}-${m}-${date}`

  //     let selDate = new Date(y, m, dat)

  //     setListHours()

  //   }
  // }, [day])

  useEffect(() => {
    let today = new Date()
    setYear(today.getFullYear())
    setMonth(today.getMonth())
    setDay(today.getDay())
  }, [])

  useEffect(() => {
    let daysInMonth = new Date(year, month+1, 0).getDate();
    let newListDays = []

    for(let i=1; i<=daysInMonth;i++) {
      let d = new Date(year, month, i);
      let y = d.getFullYear()
      let m = d.getMonth() + 1
      let mString = String(m)
      let date = d.getDate()
      let dateString = String(date)
      mString = m < 10 ? '0'+m : String(m);
      dateString = date < 10 ? '0'+date : String(date)

      let selDate = `${y}-${m}-${date}`

      setData(selDate)
      newListDays.push({
        weekday: days[ d.getDay() ],
        number: i,
      })
    }
    setListDays(newListDays)
    setDay(0)
    setListHours(hours)
  }, [ month, year ])

  useEffect(() => {
    setTimeEnter(hour)

    for( let i=0; i<=23; i++ ) {
      if(hour === hours[i]) {
        if( hour === hours[i] && i == 23) {
          setTimeExit(hours[0])
        } else if (hour === hours[i] && i < 23) {
          setTimeExit(hours[i + 1])
        }
      }
    }
  }, [hour])

  const handleCloseModal = () => {
    setShow(false)
  }

  const handleLeftDateClick = () => {
    let mountDate = new Date(year, month, 1)
    mountDate.setMonth(mountDate.getMonth() - 1)
    setYear(mountDate.getFullYear())
    setMonth(mountDate.getMonth())
    setDay(1)
  }

  const handleRightDateClick = () => {
    let mountDate = new Date(year, month, 1)
    mountDate.setMonth(mountDate.getMonth() + 1)
    setYear(mountDate.getFullYear())
    setMonth(mountDate.getMonth())
    setDay(1)
  }

  // const handleSetHour = (item: string) => {
  //   setHour(item)
  //   setTimeEnter(hour)

  //   for( let i=0; i<=23; i++ ) {
  //     if(hour === hours[i]) {
  //       if( hour === hours[i] && i == 23) {
  //         setTimeExit(hours[0])
  //       } else if (hour === hours[i] && i < 23) {
  //         setTimeExit(hours[i + 1])
  //       }
  //     }
  //   }

  //   }

  const handleFinish = () => {
    // handleSetHour(hour)

    const id_estacionamento = parkingLot?.id

    const info = {
      id_estacionamento,
      data,
      time_enter,
      time_exit
    }
    console.log(info)
    api.post('/cadastrar-agendamentos', info)
      .then(() => {
        navigation.navigate('Map');
      })
      .catch(() => {
        return alert('Houve um erro inesperado.');
      });
  }

  const priceHour = Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).format(parkingLot?.price_hour)

  return (
    <Modal
      transparent={true}
      visible={show}
      animationType="slide"
    >
      <View style={styles.modalArea}>

        <View style={styles.modalBody}>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
            <Feather name='chevron-down' size={24} color='#fff9' />
          </TouchableOpacity>
          <View style={styles.modalItem}>
            <Text style={styles.modalItemText}> Preço / hora: {priceHour}</Text>
          </View>

          <View style={styles.modalItem}>
            <View style={styles.dateInfo}>
              <TouchableOpacity style={styles.datePreviousArea} onPress={handleLeftDateClick}>
                <Feather  name='chevron-left' size={20} color='##0c0933' />
              </TouchableOpacity>
              <View style={styles.dateTitleArea}>
                <Text style={styles.dateTitle}>{months[month]} {year}</Text>
              </View>
              <TouchableOpacity style={styles.dateNextArea} onPress={handleRightDateClick}>
                <Feather  name='chevron-right' size={20} color='##0c0933' />
              </TouchableOpacity>
            </View>

            <ScrollView 
              horizontal={true} 
              showsHorizontalScrollIndicator={false} 
              style={styles.dateList}
            >
              {listDays.map((item, key) => (
                <TouchableOpacity 
                  key={key} 
                  onPress={() => setDay(item.number)} 
                  style={[styles.dateItem, {
                    backgroundColor: item.number === day ? '#0c0933' : '#fff'
                  }]}>
                  <Text style={[styles.dateItemWeekDay, {
                    color: item.number === day ? '#fff' : '#0c0933'
                  }]}>{item.weekday}</Text>
                  <Text style={[styles.dateItemNumber, {
                    color: item.number === day ? '#fff' : '#0c0933'
                  }]}>{item.number}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          
          {listHours.length > 0 &&
          <View style={styles.modalItem}>
            <ScrollView style={styles.timeList} horizontal={true} showsHorizontalScrollIndicator={false}>
              {listHours.map((item, key) => (
                <TouchableOpacity 
                  style={[styles.timeItem, {
                    backgroundColor: item === hour ? '#0c0933' : '#fff'
                  }]}
                  key={key}
                  onPress={() => setHour(item)}
                >
                  <Text style={[styles.timeItemText, {
                    color: item === hour ? '#fff' : '#0c0933'
                  }]}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          }
          <TouchableOpacity style={styles.finishButton} onPress={() => handleFinish()}>
            <Text style={styles.finishButtonText}>Finalizar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  )
}


const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

const days = [
  'Dom',
  'Seg',
  'Ter',
  'Qua',
  'Qui',
  'Sex',
  'Sab'
]

const hours = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00'
]

const styles = StyleSheet.create({
  modalArea: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
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
  finishButton: {
    backgroundColor: '#3CDC8C',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Nunito_800ExtraBold',
  },
  dateInfo: {
    flexDirection: 'row',
  },
  datePreviousArea: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  dateNextArea: {
    flex: 1,
    alignItems: 'flex-start',
  },
  dateTitleArea: {
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTitle: {
    fontSize: 15,
    fontFamily: 'Nunito_700Bold',
    color: '#0c0933'
  },
  dateList: {

  },
  dateItem: {
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  dateItemWeekDay: {
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
  },
  dateItemNumber: {
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
  },
  timeList: {

  },
  timeItem: {
    width: 75,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  timeItemText: {
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
  }
})