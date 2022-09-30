import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';

import { SSTimeslot } from '../../api/studentsessions';
import { ArkadText } from '../StyledText';
import Colors from '../../constants/Colors';
import { API } from '../../api';

type ListedTimeslotProps = {
  timeslot: SSTimeslot;
  booked: boolean;
  itemStyle: ViewStyle;
  onPress: () => void;
}

export const SSListItem = ({ timeslot, booked, itemStyle, onPress }: ListedTimeslotProps) => 
  <Pressable onPress={onPress} style={[styles.container, itemStyle]}>
    {/* <View style={styles.headerContainer}>
      <ArkadText style={styles.eventName} text={"student session"}/>
    </View> */}
    <View style={styles.footerContainer}>
      <View style = {styles.eventBookedContainer}>
        <ArkadText 
          style={styles.eventTime}
          text={API.studenSessions.formatTime(timeslot.start, timeslot.end)} />
      </View>
        {/* Color of box changes depending on status */}
      {booked 
      ? <View 
        style={[
          styles.eventBookedContainer, 
          {backgroundColor: Colors.darkRed} ]}>
        <ArkadText 
          style={styles.eventBookedText}
          text="Booked" />
      </View>
      : <View style={[
        styles.eventBookedContainer, 
          {backgroundColor:Colors.lightGreen}
        ]}
      >
        <ArkadText 
          style={styles.eventBookedText}
          text={"Available"} />
      </View>
      }
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
    fontSize: 12,
    textAlign: 'left',
    color: Colors.white,
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    /* Footer is pushed to bottom since header
      has flex: 1. */
    paddingBottom: 4,
  },
  eventTime: {
    paddingTop: 4,
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 4,
    paddingRight: 16,
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
