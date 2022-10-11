import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import { API } from '../api'
import { Role, User } from '../api/users';
import { Event } from '../api/events';
import { Company } from '../api/companies';
import { ProfileStackParamList } from "../navigation/ProfileNavigator";

import ScreenActivityIndicator from '../components/ScreenActivityIndicator';
import { Text, View } from '../components/Themed';
import { ArkadText } from '../components/StyledText';
import { AuthContext } from '../components/AuthContext';
import { EditProfileButton, LogoutButton, ScanQRButton, TicketsButton } from '../components/profileScreen/Buttons';
import { EmptyEventItem } from '../components/profileScreen/EmptyEventItem';
import { BookedEventList } from '../components/profileScreen/BookedEventList';
import UserProfile from '../components/profileScreen/UserProfile';
import { Student } from '../api/students';
import StudentProfile from '../components/profileScreen/StudentProfile';
import CompanyProfile from '../components/profileScreen/CompanyProfile';
import Colors from '../constants/Colors';
import { useIsFocused } from '@react-navigation/native';

export type ProfileScreenParams = {
  navigation: StackNavigationProp<ProfileStackParamList, 'ProfileScreen'>
};


export default function ProfileScreen({ navigation }: ProfileScreenParams) {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [bookedEvents, setBookedEvents] = useState<Event[] | null>(null);
  const authContext = useContext(AuthContext);
  const isFocused = useIsFocused();

  async function getUser() {
    const user = await API.users.getMe();
    if(user.role === Role.CompanyRepresentative) {
      const myCompany = await API.companies.getMe();
      setCompany(myCompany);
    }
    if (user.role === Role.Student) {
      const student = await API.students.getMe();
      setStudent(student);
    }

    setUser(user);
  }

  async function getRegisteredEvents() {
    const bookedEvents = await API.events.getBookedEvents();
    setBookedEvents(bookedEvents);
  }

  async function logout() {
    await API.auth.logout();
    authContext.signOut();
  };

  useEffect(() => {
    setLoading(true);
    getUser();
    getRegisteredEvents();
    setLoading(false);
  }, [isFocused]);

  
  if (loading || !user) {
    return (
      <View style={styles.container}>
        <ScreenActivityIndicator />
        <LogoutButton onPress={logout} />
      </View>
    );
  }
  
  return <>
    <ScrollView style={styles.container}>
      <UserProfile user={user as NonNullable<User>} />
      { student && <StudentProfile student={student} />}
      { company && <CompanyProfile company={company} />}

      <ArkadText text={"Booked events"} style={styles.header} />
      <View style={styles.eventList}> 
        {!bookedEvents 
          ? <Text>Loading events...</Text>
          : bookedEvents.length == 0 
            ? <EmptyEventItem />
            : <BookedEventList
                bookedEvents={bookedEvents}
                onPress={id => navigation.navigate('EventDetailsScreen', { id })} />
        }
      </View>

      {/* Add TicketsButton once the screen has been implemented.
          Until then, keep the bookedEvents scrollable on this screen.
      <TicketsButton onPress={() => navigation.navigate('TicketsScreen')} /> */}
      <EditProfileButton editingProfile={false} onPress={() => navigation.navigate('EditProfileScreen')} />
      <LogoutButton onPress={logout} />
    </ScrollView>
  </>;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingVertical: 24,
    backgroundColor: Colors.white,
  },
  header: {
    paddingTop: '10%',
    paddingLeft: '4%',
    width: '100%',
    textAlign: 'left',
    fontSize: 20,
    color: Colors.darkBlue,
  },
  eventList: {
    paddingTop: '2%',
    alignItems: 'center',
    width: '100%',
  },
});
