import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';

import { StudentSessionTimeslot } from '../../api/studentSessions';
import { ArkadText } from '../StyledText';
import Colors from '../../constants/Colors';
import { API } from '../../api';

type ListedEventItemProps = {
  timeslot: StudentSessionTimeslot;
  itemStyle: ViewStyle;
  onPress: () => void;
}

export const StudentSessionListItem = ({ timeslot, itemStyle, onPress }: ListedEventItemProps) => 
  <Pressable onPress={onPress} style={[styles.container, itemStyle]}>
    <View style={styles.headerContainer}>
      <ArkadText style={styles.eventName} text={"student session"}/>
    </View>

    <View style={styles.footerContainer}>
      <ArkadText 
        style={styles.eventTime}
        text={API.studenSessions.formatTime(timeslot.start, timeslot.end)} />
    </View>
  </Pressable>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: Colors.darkBlue,
    padding: 16,
    borderRadius: 16,
  },
  headerContainer: {
    flex: 1,
  },
  eventName: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
    color: Colors.white,
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    /* Footer is pushed to bottom since header
      has flex: 1. */
    paddingBottom: 4,
  },
  eventTime: {
    paddingBottom: 6,
    fontSize: 14,
    textAlign: 'right',
    color: Colors.white,
  },
  eventBookedContainer: {
    paddingTop: 4,
    alignSelf: 'flex-end',
    borderRadius: 10,
  },
  eventBookedText: {
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 16,
    color: Colors.white,
  },
})
