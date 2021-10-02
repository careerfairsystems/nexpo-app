import * as React from 'react';

import { Text, TextProps } from './Themed';
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors'

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}

interface textProps {
  text: string,
}

export function ButtonText(props: textProps) {
  return <Text style={styles.text}>{props.text}</Text>
}

const styles = StyleSheet.create({
  text: {
    justifyContent: "center",
    textAlign: "center",
    fontFamily: 'montserrat',
    color: Colors.white,
  },
});