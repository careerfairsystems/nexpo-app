import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

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

  async function getUser() {
    const user = await API.users.getMe();
    setUser(user);
    if(user?.role != null && user.role == Role.CompanyRepresentative) {
      const myCompany = await API.companies.getMe();
      setCompany(myCompany);
    }
  }

  async function getRegisteredEvents() {
    const bookedEvents = await API.events.getBookedEvents();
    setBookedEvents(bookedEvents);
  }

  async function logout() {
    await API.auth.logout();
    authContext.signOut();
  };

  function openEventDetails (id: number) {
    navigation.navigate('EventDetailsScreen', { id });
  }

  async function openTicketDetails() {
    const tickets = await API.tickets.getAllTickets();
    navigation.navigate('TicketsScreen', { tickets });
    // TODO: Eventually load tickets locally
  }

  function editProfile() {
    /* TODO ... */
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
            <ScrollView style={styles.container}>
              <HostProfile company={company} />

              <View style={styles.buttons}>
                  <ArkadButton onPress={editProfile} style={styles.logoutContainer}>
                <ArkadText text='Edit profile' style={styles.logoutText} />
              </ArkadButton> 

              <ArkadButton onPress={logout} style={styles.logoutContainer}>
                <ArkadText text='Logout' style={styles.logoutText} />
              </ArkadButton> 
              </View>
              
            </ScrollView>
          </View>
        : <View style={styles.container}>
            <ArkadText 
              text={'Error loading company host profile'}
              style={{color: Colors.darkBlue}} />
          </View>
      )
    default: /* (Students & admins -> 'StudentProfile' component) */ 
      return (
        <View style={styles.container}>
          <ScrollView>
              <StudentProfile
              user={user}
              bookedEvents={bookedEvents}
              openEventDetails={openEventDetails} />

            <View style={styles.buttons}>
              <ArkadButton onPress={openTicketDetails} style={styles.logoutContainer}>
                <ArkadText text='My tickets' style={styles.logoutText} />
              </ArkadButton> 
              
              <ArkadButton onPress={editProfile} style={styles.logoutContainer}>
                <ArkadText text='Edit profile' style={styles.logoutText} />
              </ArkadButton> 

              <ArkadButton onPress={logout} style={styles.logoutContainer}>
                <ArkadText text='Logout' style={styles.logoutText} />
              </ArkadButton>
            </View>
          </ScrollView>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  buttons: {
    marginTop: '10%',
  },
  logoutContainer: {
    alignSelf: 'center',
    padding: '4%',
    marginBottom: '2%',
    width: '85%',
  },
  logoutText: {
    padding: '1%',
    alignItems: 'center',
  },
});
