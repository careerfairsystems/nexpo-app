import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

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

import { StackNavigationProp } from '@react-navigation/stack';
import { BookedEventList } from '../components/profileScreen/BookedEventList';
import { EmptyEventItem } from '../components/profileScreen/EmptyEventItem';
import { ProfileStackParamList } from '../navigation/BottomTabNavigator';

type profileNavigation = {
  navigation: StackNavigationProp<
    ProfileStackParamList,
    'ProfileScreen'
  >
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

  const openEventDetails = (id: number) => {
    navigation.navigate('EventDetailsScreen', { id });
  }

  useEffect(() => {
    setLoading(true);
    getUser();
    getRegisteredEvents();
    setLoading(false);
  }, []);


  if (loading || !user) {
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
            text={user.firstName + " " + user.lastName} 
            style={styles.name}
          />
        </View>
        <View style={styles.infoList}>
          <View style={styles.infoItem}>
            <Ionicons name="mail" size={16} color="black"/>
            <ArkadText text={user.email} style={styles.itemText} />
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="call" size={16} color="black"/>
            <ArkadText text={user.phoneNr ? user.phoneNr : '\u2013'} style={styles.itemText}/>
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
