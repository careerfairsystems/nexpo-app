import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

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

import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileParamList } from '../types';
import { BookedEventList } from '../components/profileScreen/BookedEventList';
import { EmptyEventItem } from '../components/profileScreen/EmptyEventItem';

type profileNavigation = {
  navigation: StackNavigationProp<
    ProfileParamList,
    'ProfileScreen'
  >
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

  const openEventDetails = (id: number) => {
    navigation.navigate('EventDetailsScreen', { id });
  }

  useEffect(() => {
    setLoading(true);
    getUserInformation();
    getRegisteredEvents();
    setLoading(false);
  }, []);

  if (loading || userInformation == undefined) {
    return (
      <View style={styles.container}>
        <ScreenActivityIndicator />
        <ArkadButton onPress={logout} style={styles.logoutContainer}>
          <ArkadText text='Logout' style={styles.logoutText} />
        </ArkadButton> 
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <ArkadText 
            text={userInformation.first_name + " " + userInformation.last_name} 
            style={styles.name} />

          <View style={styles.infoList}>
            <View style={styles.infoItem}>
            <Ionicons name="mail" size={16} color="black"/>
            <ArkadText text={userInformation.email} style={styles.itemText} />
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="call" size={16} color="black"/>
            <ArkadText text={userInformation.phone_number} style={styles.itemText} />
          </View>
          </View>
          
          <ArkadText text={"Booked events"} style={styles.header} />

          <View style={styles.eventList}> 
            {bookedEvents == undefined 
            ? <Text style={{flex: 1}}>Loading events...</Text>
            : bookedEvents.length == 0 
              ? <EmptyEventItem />
              : <BookedEventList
                  bookedEvents={bookedEvents}
                  onPress={openEventDetails}
                />
            }
          </View>
        </View>
          

        <ArkadButton onPress={logout} style={styles.logoutContainer}>
          <ArkadText text='Logout' style={styles.logoutText} />
        </ArkadButton> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  top: {
    height: '80%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  name: {
    paddingTop: '4%',
    fontSize: 24,
    color: Colors.darkBlue,
  },
  infoList: {
    paddingTop: '2%',
  },
  infoItem: {
    paddingTop: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  itemText: {
    color: Colors.darkBlue,
    fontSize: 12,
    paddingHorizontal: 8,
    textAlign: 'center'
  },
  header: {
    paddingTop: '10%',
    paddingLeft: '4%',
    width: '100%',
    textAlign: 'left',
    fontSize: 16,
    color: Colors.darkBlue,
  },
  eventList: {
    paddingTop: '2%',
    alignItems: 'center',
    height: '40%',
    width: '100%',
  },
  logoutContainer: {
    height: '8%',
    width: '85%',
    marginBottom: '6%'
  },
  logoutText: {
    padding: '4%'
  },
});
