import React from 'react';
import { Dimensions, Pressable, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { Text, View } from '../../components/Themed';

type buttonProps = {
  showAllEvents: boolean;
  onPress: () => void;
}

const { width, height } = Dimensions.get('window')

export const UpcomingButton = ({showAllEvents, onPress}: buttonProps) => 
  <View style={styles.eventBox}>
    {showAllEvents 
      ? <Pressable
          style={[styles.button, styles.yellowBack]}
          onPress={onPress}>
          <Text style={styles.text}>Hide old events</Text>
        </Pressable>
      : <Pressable
          style={[styles.button, styles.greenBack]}
          onPress={onPress}>
          <Text style={styles.text}>Show old events</Text>
        </Pressable>
    }
  </View>


const styles = StyleSheet.create({
  eventBox: {
    width: width,
    alignItems: 'center',
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
  },
  button: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    padding: 12,
    margin: 8,
  },
  yellowBack: {
    backgroundColor: Colors.darkYellow,
  },
  greenBack: {
    backgroundColor: Colors.lightGreen,
  },
  text: {
    fontFamily: 'montserrat',
    fontSize: 16,
    color: Colors.white
  }
});
