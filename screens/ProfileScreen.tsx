import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import Colors from '../constants/Colors';

import { API } from '../api'
import { Role, User } from '../api/users';
import { Event } from '../api/events';

import ScreenActivityIndicator from '../components/ScreenActivityIndicator';
import { ArkadButton } from '../components/Buttons';
import { ArkadText } from '../components/StyledText';
import { AuthContext } from '../components/AuthContext';

import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../navigation/BottomTabNavigator';
import { StudentProfile } from '../components/profileScreen/StudentProfile';
import { HostProfile } from '../components/profileScreen/HostProfile';
import { Company } from '../api/companies';

type profileNavigation = {
  navigation: StackNavigationProp<
    ProfileStackParamList,
    'ProfileScreen'
  >
};


export default function ProfileScreen({navigation}: profileNavigation) {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [bookedEvents, setBookedEvents] = useState<Event[] | null>(null);
  const authContext = useContext(AuthContext);

  const getUser = async () => {
    const user = await API.users.getMe();
    setUser(user);
    if(user?.role != null && user.role == Role.CompanyRepresentative) {
      const myCompany = await API.companies.getMe();
      setCompany(myCompany);
    }
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

  const openTicketDetails = async () => {
    const tickets = await API.tickets.getAllTickets();
    navigation.navigate('TicketsScreen', { tickets });
    // TODO: Eventually load tickets locally
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
  switch (user.role) {
    case Role.CompanyRepresentative: 
      return (
        user != null && company != null
        ? <View style={styles.container}>
            <HostProfile company={company} />

            <View style={styles.bottom}>
              <ArkadButton onPress={logout} style={styles.logoutContainer}>
                <ArkadText text='Logout' style={styles.logoutText} />
              </ArkadButton> 
            </View>
        </View>
        : <View style={styles.container}>
            <ArkadText 
              text={'Error loading company host profile'}
              style={{color: Colors.darkBlue}} />
          </View>
      )
    default: /* (Students and admins) */ 
      return (
        <View style={styles.container}>
          <StudentProfile 
            user={user}
            bookedEvents={bookedEvents}
            openEventDetails={openEventDetails} />

          <View style={styles.bottom}>
            <ArkadButton onPress={logout} style={styles.logoutContainer}>
              <ArkadText text='Logout' style={styles.logoutText} />
            </ArkadButton> 

            <ArkadButton onPress={openTicketDetails} style={styles.logoutContainer}>
              <ArkadText text='My tickets' style={styles.logoutText} />
            </ArkadButton> 
          </View>
        </View>
      )
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
    paddingTop: '1rem',
    fontSize: 24,
    color: Colors.darkBlue,
  },
  infoList: {
    paddingTop: '0.2rem',
  },
  infoItem: {
    paddingTop: '0.1rem',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  itemText: {
    color: Colors.darkBlue,
    fontSize: 12,
    textAlign: 'center'
  },
  header: {
    paddingTop: '0.5rem',
    paddingLeft: '4%',
    width: '100%',
    textAlign: 'left',
    fontSize: 16,
    color: Colors.darkBlue,
  },
  eventList: {
    paddingTop: '0.2rem',
    alignItems: 'center',
    height: '10rem',
    width: '100%',
  },
  bottom: {
    height: '8%',
    width: '100%',
    alignItems: 'center',
    marginBottom: 49,
  },
  logoutContainer: {
    height: '2rem',
    width: '85%',
  },
  logoutText: {
    padding: '4%'
  },
});
