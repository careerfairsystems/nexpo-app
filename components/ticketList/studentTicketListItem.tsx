import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ArkadText } from '../StyledText';
import Colors from 'constants/Colors';

type ListedTimeslotProps = {
  name: string;
  isConsumed: boolean;
}

export const StudentTicketListItem = ({ name, isConsumed }: ListedTimeslotProps) => 
  <View style={[
    styles.container, 
    {backgroundColor: isConsumed ? Colors.lightGreen : Colors.darkBlue}
    ]}>
    <View style = {styles.smallContainer}>
      <ArkadText 
        style={styles.timeslotTimeText}
        text={name} />
    </View>
      {/* Below showing if isConsumed */}
    {isConsumed &&
      <ArkadText 
        style={styles.timeslotTimeText}
        text={"Scanned!"} 
      />
    }
  </View>

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 16,
  },
  timeslotTimeText: {
    paddingTop: 4,
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 4,
    paddingRight: 10,
    color: Colors.white,
  },
  smallContainer: {
    paddingTop: 0,
    alignSelf: 'flex-end',
  },
})
