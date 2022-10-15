import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ArkadText } from '../StyledText';
import Colors from '../../constants/Colors';

type ListedTimeslotProps = {
  name: string;
  isConsumed: boolean;
}

export const StudentTicketListItem = ({ name, isConsumed }: ListedTimeslotProps) => 
  <View style={[styles.container, {backgroundColor: isConsumed ? Colors.lightGreen : Colors.darkBlue}]}>
    <View style = {styles.timeslotBookedContainer}>
      <ArkadText 
        style={styles.timeslotTime}
        text={name} />
    </View>
      {/*box exists if consumed */}
    {isConsumed &&
    <View style={[
      styles.timeslotBookedContainer, 
        {backgroundColor:Colors.lightGreen}
      ]}
    >
      <ArkadText 
        style={styles.timeslotBookedText}
        text={"Scanned!"} />
    </View>
    }
  </View>

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 10,
    padding: 16,
    borderRadius: 16,
  },
  timeslotTime: {
    paddingTop: 4,
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 4,
    paddingRight: 16,
    color: Colors.white,
  },
  timeslotBookedContainer: {
    paddingTop: 0,
    alignSelf: 'flex-end',
    borderRadius: 10,
  },
  timeslotBookedText: {
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 16,
    color: Colors.white,
  },
})
