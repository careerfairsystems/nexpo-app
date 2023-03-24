import React, { useState } from 'react';
import { Pressable, StyleSheet, TextStyle, View } from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import { ArkadText } from './StyledText';
import Colors from 'constants/Colors';

interface checkboxProps {
  onPress: (value: boolean) => void;
  text: string;
  style?: TextStyle;
}

export function Checkbox({ onPress, text, style }: checkboxProps) {
  const [checked, onChange] = useState(false);

  function onCheckmarkPress() {
    onChange(!checked);
    onPress(checked);
  }

  return (
    <Pressable
    onPress={onCheckmarkPress}
    style={styles.checkboxContainer}>
      <View style={[styles.checkboxBase, checked && styles.checkboxChecked]}>
      {checked && <Ionicons name="checkmark" size={20} style={styles.checkmark}/>}
      </View>
      <ArkadText style={style ? style : styles.text} text={text}/>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.darkBlue,
    backgroundColor: 'transparent',
    marginLeft: 12,
  },
  text: {
    fontSize: 14,
    color: Colors.darkBlue,
    marginLeft: 12,
  },

  checkboxChecked: {
    backgroundColor: Colors.darkBlue,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  checkmark: {
    color: Colors.white,
    alignSelf: 'center',
  },
});
