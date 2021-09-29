import * as React from 'react';
import { Button as BaseButton, ButtonProps, StyleSheet } from 'react-native';


export function PrimaryButton(props: ButtonProps) {
  return <BaseButton {...props} />
}

const styles = StyleSheet.create({
  primaryButton: {

  }
});
