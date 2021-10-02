import * as React from 'react';
import { StyleSheet } from 'react-native';

import { TextInput as TextInputField, TextInputProps } from 'react-native';

export function TextInput(props: TextInputProps) {
  return <TextInputField {...props} style={[props.style, styles.input]} />;
}

const styles = StyleSheet.create({
  input: {
    fontFamily: 'montserrat',
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#333333',
    padding: 10,
  },
});
