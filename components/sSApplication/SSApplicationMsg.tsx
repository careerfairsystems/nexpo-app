import React from 'react';
import { Text, Dimensions, StyleSheet, View } from 'react-native';

import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window')

type ApplicationsMsgProps = {
  msg: string;
}

export function ApplicationsMsg ({msg}: ApplicationsMsgProps) {
  return (
    <View style={styles.motivationBox}> 
      <View style={styles.headerBox}>
        <Text style={styles.headerText}> Student motivation </Text>
      </View>
      <View style={styles.msgBox}>
        <Text style={styles.motivationText}> {msg} </Text>
      </View>
    </View>
  )
  
}
const styles = StyleSheet.create({
  motivationBox: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: width * 0.85,
    borderWidth: 2,
    borderColor: Colors.darkBlue,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 20,
  },
  headerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkBlue,
  },
  msgBox: {
    backgroundColor: Colors.white,
  },
  headerText: {
    padding: 15,
    fontFamily: 'montserrat',
    fontSize: 16,
    color: Colors.white,
  },
  motivationText: {
    padding: 10,
    fontFamily: 'montserrat',
    fontSize: 14,
    color: Colors.darkBlue,
  },
});
