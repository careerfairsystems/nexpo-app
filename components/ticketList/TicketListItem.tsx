import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';

import { ArkadText } from '../StyledText';
import Colors from '../../constants/Colors';
import { TicketItem } from './ticketList';

type ListedTicketItemProps = {
  ticketItem: TicketItem;
  itemStyle: ViewStyle;
  onPress: () => void;
}

export const TicketListItem = ({ ticketItem, itemStyle, onPress }: ListedTicketItemProps) => 
  <Pressable onPress={onPress} style={[styles.container, itemStyle]}>

    <View style={styles.headerContainer}>
      <ArkadText style={styles.text} text={ticketItem.event.name}/>
    </View>

    <View style={styles.footerContainer}>
      <ArkadText 
        style={styles.text}
        text={
          ticketItem.ticket.photoOk 
            ? 'Yes'
            : 'No'
          }
      />
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
  text: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
    color: Colors.white,
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent:'flex-end',
    paddingBottom: 4,
  },
})
