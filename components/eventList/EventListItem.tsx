import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';

import { bookedEvent, Event } from '../../api/events';
import { ArkadText } from '../StyledText';
import Colors from '../../constants/Colors';
import { API } from '../../api';

type ListedEventItemProps = {
  event: Event;
  booked: boolean;
  itemStyle: ViewStyle;
  onPress: () => void;
}

export const EventListItem = ({ event, booked, itemStyle, onPress }: ListedEventItemProps) => 
  <Pressable onPress={onPress} style={[styles.container, itemStyle]}>
    <View style={styles.headerContainer}>
      <ArkadText style={styles.eventName} text={event.name}/>
    </View>

    <View style={styles.footerContainer}>
      <ArkadText 
        style={styles.eventTime}
        text={API.events.formatTime(event.date, event.start, event.end)} />

      {/* Color of box changes depending on status */}
      {booked 
      ? <View 
        style={[
          styles.eventBookedContainer, 
          {backgroundColor: Colors.lightGreen} ]}>
        <ArkadText 
          style={styles.eventBookedText}
          text="Booked" />
      </View>
      : <View style={[
        styles.eventBookedContainer, 
        event.capacity == event.ticketCount 
          ? {backgroundColor:Colors.darkRed}
          : {backgroundColor:Colors.darkYellow}
        ]}
      >
        <ArkadText 
          style={styles.eventBookedText}
          text={event.ticketCount + "/" + event.capacity} />
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
