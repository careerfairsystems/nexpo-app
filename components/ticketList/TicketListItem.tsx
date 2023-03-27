import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';

import { ArkadText } from '../StyledText';
import Colors from 'constants/Colors';
import { TicketItem } from './TicketItem';
import { API } from "api/API";

type ListedTicketItemProps = {
  ticketItem: TicketItem;
  itemStyle: ViewStyle;
  onPress: () => void;
}

export const TicketListItem = ({ ticketItem, itemStyle, onPress }: ListedTicketItemProps) => 
<Pressable onPress={onPress} style={[styles.container, itemStyle]}>
<View style={styles.headerContainer}>
  <ArkadText style={styles.eventName} text={ticketItem.event.name}/>
</View>

<View style={styles.footerContainer}>
  <ArkadText 
    style={styles.eventTime}
    text={API.events.formatTime(ticketItem.event.date, ticketItem.event.start, ticketItem.event.end)} />
  <View 
    style={[
      styles.eventBookedContainer, 
      {backgroundColor: Colors.lightGreen} ]}>
    <ArkadText 
      style={styles.eventBookedText}
      text="1 ticket" />
  </View>
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
    fontSize: 20,
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
    fontSize: 18,
    textAlign: 'right',
    color: Colors.white,
  },
  eventBookedContainer: {
    paddingTop: 4,
    alignSelf: 'flex-end',
    borderRadius: 10,
  },
  eventBookedText: {
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 16,
    color: Colors.white,
  },
})
