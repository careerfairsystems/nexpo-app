import React from 'react';
import { Text, Dimensions, FlatList, StyleSheet, View } from 'react-native';

import { StudentSessionTimeslot } from '../../api/studentSessions';
import Colors from '../../constants/Colors';
import { StudentSessionListItem } from './StudentSessionListItem';

type TimeslotListProps = {
  timeslots: StudentSessionTimeslot[] | null;
  onPress: (id: number) => void;
}

const { width, height } = Dimensions.get('window')

export function EventList ({ timeslots, onPress }: TimeslotListProps) {
  if(timeslots?.length == 0) {
    return (
      <Text style={styles.text}>No upcoming timeslots =(</Text>
    )
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={timeslots}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item: timeslot }) => 
        <View style={styles.eventBox}>
          <StudentSessionListItem
            timeslot={timeslot} 
            itemStyle={{}}
            onPress={() => onPress(timeslot.id)} />
        </View>
      }
    />
  )
  
}
const styles = StyleSheet.create({
  eventBox: {
    width: width * 0.85,
    height: height * 0.24
  },
  text: {
    paddingTop: 40,
    fontFamily: 'montserrat',
    fontSize: 20,
    color: Colors.darkBlue,
  },
});
