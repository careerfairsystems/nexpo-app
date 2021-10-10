import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

import { API } from '../api'
import { User } from '../api/users';
import { Event } from '../api/events';

import ScreenActivityIndicator from '../components/ScreenActivityIndicator';
import { ArkadButton } from '../components/Buttons';
import { ArkadText } from '../components/StyledText';
import { AuthContext } from '../components/AuthContext';
import { EventListItem } from '../components/eventList/EventListItem';

import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileParamList } from '../types';

type profileNavigation = {
  navigation: StackNavigationProp<
    ProfileParamList,
    'ProfileScreen'
  >
};

const getEmptyEvent = () => {
  const emptyEvent: Event = {
    id: -1,
    name: 'No booked events',
    description: '',
    location: '',
    date: '',
    start: '',
    end: '',
    host: '',
    language: '',
    capacity: 0,
    ticketCount: 0,
  }
  return emptyEvent;
};

export default function ProfileScreen({navigation}: profileNavigation) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [bookedEvents, setBookedEvents] = useState<Event[] | null>(null);
  const authContext = useContext(AuthContext);

  const getUser = async () => {
    const user = await API.users.getMe();
    setUser(user);
  }

  const getRegisteredEvents = async () => {
    const bookedEvents = await API.events.getBookedEvents();
    setBookedEvents(bookedEvents);
  }

  const logout = async () => {
    await API.auth.logout();
    authContext.signOut();
  };

  useEffect(() => {
    setLoading(true);
    getUser();
    getRegisteredEvents();
    setLoading(false);
  }, []);

  const openEventDetails = (id: number) => {
    navigation.navigate('EventDetailsScreen', { id });
  }

  if (loading || user == undefined) {
    return (<ScreenActivityIndicator />);
  }
  else {
    return (
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <ArkadText 
            text={user.firstName + " " + user.lastName} 
            style={styles.name}
          />
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="mail" size={16} color="black"/>
          <ArkadText text={user.email} style={styles.itemText}/>
        </View>
        { user.phoneNr &&
        <View style={styles.infoItem}>
          <Ionicons name="call" size={16} color="black"/>
          <ArkadText text={user.phoneNr} style={styles.itemText}/>
        </View>
        }

        <ArkadText text={"Booked events"} style={styles.header}/>

        {bookedEvents == undefined 
        ? <Text>Loading events...</Text>
        : bookedEvents.length == 0 
          ? <View style={styles.eventObject}>
              <EventListItem 
                event={getEmptyEvent()} 
                booked={false}
                onPress={() => {}} />
            </View>
          : <FlatList
              horizontal
              data={bookedEvents}
              keyExtractor={({ id }) => id.toString()}
              renderItem={({ item: event }) => 
                <View style={styles.eventObject}>
                  <EventListItem
                    event={event} 
                    booked={bookedEvents != null && bookedEvents.includes(event)}
                    onPress={() => openEventDetails(event.id)} />
                </View>
              } 
            />
        }

        <ArkadButton onPress={logout} style={styles.logout}>
          <ArkadText text='Logout' style={{}}/>
        </ArkadButton> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'center'
  },
  name: {
    fontSize: 24,
    color: Colors.darkBlue,
  },
  infoItem: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    color: Colors.darkBlue,
    fontSize: 12,
    paddingHorizontal: 8,
    textAlign: 'center'
  },
  header: {
    marginTop: 80,
    marginLeft: 16,
    fontSize: 16,
    color: Colors.darkBlue,
    textAlign: 'left',
  },
  eventObject:{
    // TODO: Add responsive height instead
    width: '60%',
    height: 160,
  },
  logout: {
    marginTop: 80,
  },
});
