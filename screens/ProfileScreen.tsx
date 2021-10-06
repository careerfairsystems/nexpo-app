import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

import { API } from '../api'
import { UserInformation } from '../api/users';
import { ListedEvent } from '../api/events';

import ScreenActivityIndicator from '../components/ScreenActivityIndicator';
import { ArkadButton } from '../components/Buttons';
import { ArkadText } from '../components/StyledText';
import { AuthContext } from '../components/AuthContext';
import { EventListItem } from '../components/eventList/EventListItem';

import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileParamList } from '../types';

const { width, height } = Dimensions.get('window')

type profileNavigation = {
  navigation: StackNavigationProp<
    ProfileParamList,
    'ProfileScreen'
  >
};

const getEmptyEvent = () => {
  const emptyEvent: ListedEvent = {
    start: "",
    name: "No booked events",
    location: "",
    id: 0,
    end: "",
    date: "",
    capacity: 0,
    tickets: 0,
  }
  return emptyEvent;
};

export default function ProfileScreen({navigation}: profileNavigation) {
  const [userInformation, setUserInformation] = useState<UserInformation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [bookedEvents, setBookedEvents] = useState<ListedEvent[] | null>(null);
  const authContext = useContext(AuthContext);

  const getUserInformation = async () => {
    const userInformation = await API.users.getMe();
    setUserInformation(userInformation);
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
    getUserInformation();
    getRegisteredEvents();
    setLoading(false);
  }, []);

  const openEventDetails = (id: number) => {
    navigation.navigate('EventDetailsScreen', { id });
  }

  if (loading || userInformation == undefined) {
    return (
      <View style={{flex: 1}}>
        <ScreenActivityIndicator />
        <ArkadButton onPress={logout} style={styles.logout}>
          <ArkadText text='Logout' style={{}}/>
        </ArkadButton> 
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <ArkadText 
            text={userInformation.first_name + " " + userInformation.last_name} 
            style={styles.name}
          />
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="mail" size={16} color="black"/>
          <ArkadText text={userInformation.email} style={styles.itemText}/>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="call" size={16} color="black"/>
          <ArkadText text={userInformation.phone_number} style={styles.itemText}/>
        </View>

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
              contentContainerStyle={styles.list}
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  nameContainer: {
    flexDirection: 'row',
    marginTop: 24,
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
    marginTop: 40,
    marginLeft: 16,
    fontSize: 16,
    color: Colors.darkBlue,
    textAlign: 'left',
  },
  list: {
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
  },
  eventObject:{
    width: width * 0.7,
  },
  logout: {
    marginTop: 80,
  },
});
