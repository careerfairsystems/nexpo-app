import React from 'react';
import { Text, Dimensions, FlatList, StyleSheet, View } from 'react-native';

import { SSTimeslot } from '../../api/studentsessions';
import Colors from '../../constants/Colors';
import { SSListItem } from './SSsListItem';

type TimeslotListProps = {
  timeslots: SSTimeslot[] | null;
  onPress: (id: number) => void;
}

const { width, height } = Dimensions.get('window')

export function TimeslotList ({ timeslots, onPress }: TimeslotListProps) {
  if(timeslots?.length == 0 || timeslots == null) {
    return (
      <Text style={styles.text}>No upcoming timeslots =(</Text>
    )
  }
  
  timeslots?.sort((a,b) => 
    new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={timeslots}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item: timeslot }) => 
        <View style={styles.ssBox}>
          <SSListItem
            key={timeslot.id}
            timeslot={timeslot} 
            booked={timeslot.studentId == null ? false : true}
            onPress={() => onPress(timeslot.id)} />
        </View>
      }
    />
  )
  
}
const styles = StyleSheet.create({
  ssBox: {
    width: width * 0.85,
    height: height * 0.09,
  },
  text: {
    paddingTop: 40,
    fontFamily: 'montserrat',
    fontSize: 20,
    color: Colors.darkBlue,
  },
});
