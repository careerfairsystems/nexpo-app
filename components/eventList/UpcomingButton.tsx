import React from 'react';
import { Dimensions, Pressable, StyleSheet } from 'react-native';
import Colors from 'constants/Colors';
import { Text, View } from 'components/Themed';
import { ArkadButton } from '../Buttons';

type buttonProps = {
  showAllEvents: boolean;
  onPress: () => void;
}

const { width, height } = Dimensions.get('window')

export function UpcomingButton ({showAllEvents, onPress}: buttonProps) {
  return (
    <View style={styles.eventBox}>
      <ArkadButton
        style={styles.button}
        onPress={onPress}>
        <Text style={styles.text}>{showAllEvents ? "Hide old events" : "Show old events"}</Text>
      </ArkadButton>
    </View>
  )
  
} 


const styles = StyleSheet.create({
  eventBox: {
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    margin: 8,
  },
  greenBack: {
    backgroundColor: Colors.lightGreen,
  },
  text: {
    fontFamily: 'main-font-bold',
    fontSize: 20,
    color: Colors.white
  }
});
