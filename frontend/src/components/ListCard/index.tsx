import React, { useState, useEffect }from 'react'
import { TouchableOpacityProps } from 'react-native'
import api from '../../../services/api';
import { ParkingLots } from '../../../interface/interfaces';

import {
    Container,
    ButtonCard,
    TextCard
} from './styles'

interface ListCardProps extends TouchableOpacityProps {
    item: Appointments;
}

interface Appointments {
    id_appointment: number;
    id_estacionamento: number;
    data: string;
    time_enter: string;
    time_exit: string;
}

export function ListCard({ item, ...rest }: ListCardProps) {

    const [estacionamento, setEstacionamento] = useState<ParkingLots>()

    useEffect(() => {
        api.get<ParkingLots>(`/listar-estacionamentos/${item.id_estacionamento}`).then(({ data } ) => {
            setEstacionamento(data)
        })
    }, [])
    
    

    return (
        <Container>
            <ButtonCard {...rest}>
                <TextCard>Data: {item.data}</TextCard>
                <TextCard>Estacionamento: {estacionamento?.name}</TextCard>
                <TextCard>Hora de entrada: {item.time_enter}</TextCard>
                <TextCard>Hora de Saída: {item.time_exit}</TextCard>
            </ButtonCard>
        </Container>
    )
}
