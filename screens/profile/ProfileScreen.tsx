import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import { API } from '@/api'
import { Role, User } from '@/api/users';
import { Event } from '@/api/events';
import { Company } from '@/api/companies';
import { ProfileStackParamList } from "./ProfileNavigator";

import ScreenActivityIndicator from '../../components/ScreenActivityIndicator';
import { View } from '../../components/Themed';
import { AuthContext } from '../../components/AuthContext';
import { EditProfileButton, LogoutButton } from '../../components/profileScreen/Buttons';
import UserProfile from '../../components/profileScreen/UserProfile';
import { Student } from '@/api/students';
import StudentProfile from '../../components/profileScreen/StudentProfile';
import CompanyProfile from '../../components/profileScreen/CompanyProfile';
import Colors from '../../constants/Colors';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { BookedEventList } from '../../components/profileScreen/BookedEventList';

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

  useFocusEffect(useCallback(() => {
    setLoading(true);
    getUser();
    getRegisteredEvents();
    setLoading(false);
  }, [isFocused]));

  
  if (loading || !user) {
    return <ScreenActivityIndicator />
  }
  
  return <>
    <ScrollView style={styles.container}>
      <UserProfile user={user as NonNullable<User>} />
      { student && <StudentProfile student={student} />}
      { company && <CompanyProfile company={company} />}
      <View style={styles.eventList}> 
        {!bookedEvents 
          ? <ActivityIndicator />
          : bookedEvents.length !== 0 &&
             <BookedEventList
                bookedEvents={bookedEvents}
                onPress={id => navigation.navigate('ProfileSwitchScreen', { screen: "details", id: id })} />
        }
      </View>
      <EditProfileButton editingProfile={false} onPress={() => navigation.navigate('ProfileSwitchScreen', { screen: "edit", id: 0 })} />
      <View style= {styles.logout}>
        <LogoutButton onPress={logout} />
      </View>
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
    fontSize: 24,
    color: Colors.darkBlue,
  },
  eventList: {
    paddingTop: '3%',
  },
  logout: {
    paddingBottom: '10%',
    backgroundColor: Colors.white,
  }
});
