import * as React from 'react';
import { StyleSheet } from 'react-native';

import { TextInput as TextInputField, TextInputProps } from 'react-native';
import Colors from 'constants/Colors';

export function TextInput(props: TextInputProps) {
  return <TextInputField autoCapitalize='none' placeholderTextColor={Colors.lightGray} {...props} style={[styles.input, props.style]} />;
}

const styles = StyleSheet.create({
  input: {
    fontFamily: 'main-font-bold',
    margin: 12,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: Colors.darkBlue,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 18,
  },
});
