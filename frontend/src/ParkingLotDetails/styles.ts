import React from "react";
import styled from "styled-components/native";
import { Platform, StyleSheet } from "react-native";


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
  color: #fff;
  font-size: 24px;
  font-weight: bold;
`
export const Subtitle = styled.Text`
  color: #fff9;
  font-size: 14px;
`