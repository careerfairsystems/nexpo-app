import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

interface buttonProps {
  children?: React.ReactNode;
  onPress: () => void;
}

export function ArkadButton(props: buttonProps) {
  return (<Pressable style={styles.button} onPress={props.onPress}>
    {props.children}
  </Pressable>)
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.darkBlue,
    borderRadius: 4,
    padding: 20,
    margin: 12,
  },
});
