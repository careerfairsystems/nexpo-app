import * as React from 'react';

import { Text, TextProps } from './Themed';
import { StyleSheet, TextInput, TextStyle } from 'react-native';
import Colors from '../constants/Colors'

export function DefaultText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'montserrat' }]} />;
}

interface textProps {
  text: string,
  style?: TextStyle,
}

export function ArkadText(props: textProps) {
  return <Text style={[styles.text, props.style]}>{props.text}</Text>
}

const styles = StyleSheet.create({
  text: {
    justifyContent: "center",
    textAlign: "center",
    fontFamily: 'montserrat',
    color: Colors.white,
  },
});
