import * as React from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Colors from '../constants/Colors';

interface buttonProps {
  children?: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
}

export function ArkadButton(props: buttonProps) {
  return (<Pressable style={[styles.button, props.style]} onPress={props.onPress}>
    {props.children}
  </Pressable>)
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    backgroundColor: Colors.orange,
    borderRadius: 55,
    padding: 20,
    margin: 12,
  },
});
