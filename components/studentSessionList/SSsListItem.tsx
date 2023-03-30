import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';

import { SSTimeslot } from 'api/StudentSessions';
import { ArkadText } from '../StyledText';
import Colors from 'constants/Colors';
import { API } from "api/API";

type ListedTimeslotProps = {
  timeslot: SSTimeslot;
  booked: boolean;
  bookedByMe: boolean;
  onPress: () => void;
}

export const SSListItem = ({ timeslot, booked, bookedByMe, onPress }: ListedTimeslotProps) => 
  <Pressable onPress={onPress} style={styles.container}>
    <ArkadText 
      style={styles.timeslotTime}
      text={API.studentSessions.formatTime(timeslot.start, timeslot.end)} />
    {booked ? 
    <View style={[
        styles.timeslotBookedContainer, 
        bookedByMe ? {backgroundColor: Colors.arkadTurkos} : {backgroundColor: Colors.darkRed} ]}>
      <ArkadText 
        style={styles.timeslotBookedText}
        text={bookedByMe ? "Yours!" : "Booked"} />
    </View> :
    <View style={[
      styles.timeslotBookedContainer, 
        {backgroundColor:Colors.lightGreen}
      ]}
    >
      <ArkadText 
        style={styles.timeslotBookedText}
        text={"Available"} />
    </View>
    }
  </Pressable>

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.arkadNavy,
    padding: 16,
    borderRadius: 16,
  },
  timeslotTime: {
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 4,
    color: Colors.white,
  },
  timeslotBookedContainer: {
    alignSelf: 'flex-end',
    borderRadius: 10,
  },
  timeslotBookedText: {
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 16,
    color: Colors.white,
  },
})
