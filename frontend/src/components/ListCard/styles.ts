import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    width: 100%;
    padding: ${RFValue(10)}px;
`;

export const ButtonCard = styled.TouchableOpacity`
    width: 100%;
    padding: ${RFValue(6)}px;
    background-color: #0c0933;
    border-radius: ${RFValue(10)}px;
`

export const TextCard = styled.Text`
    color: #D3E2E6;
    font-size: ${RFValue(26)}px;
    font-weight: bold;
    flex-direction: row;
    font-family: 'Nunito_700Bold'
`