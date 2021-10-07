import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';

import { ListedEvent } from '../../api/events';
import { ProfileParamList } from '../../types';
import { EventListItem } from '../eventList/EventListItem';

type BookedEventListProps = {
  bookedEvents: ListedEvent[] | null;
  navigation: StackNavigationProp<ProfileParamList, "ProfileScreen">
}

const { width, height } = Dimensions.get('window')

const openEventDetails = (
    navigation: StackNavigationProp<ProfileParamList, "ProfileScreen">, 
    id: number
  ) => {
  navigation.navigate('EventDetailsScreen', { id });
}

export const BookedEventList = ({ bookedEvents, navigation }: BookedEventListProps) => 
  <FlatList
    contentContainerStyle={styles.list}
    horizontal
    showsHorizontalScrollIndicator={false}
    data={bookedEvents}
    keyExtractor={({ id }) => id.toString()}
    renderItem={({ item: event }) => 
      <View style={styles.eventObject}>
        <EventListItem
          event={event} 
          booked={bookedEvents != null && bookedEvents.includes(event)}
          onPress={() => openEventDetails(navigation, event.id)} />
      </View>
    }
  />

  const styles = StyleSheet.create({
    list: {
      width: '100%',
      height: 'auto',
      justifyContent: 'center',
    },
    eventObject:{
      paddingTop: '5%',
      width: width * 0.7,
      height: height * 0.22,
    },
  });
