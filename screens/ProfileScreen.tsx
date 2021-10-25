import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TextInput } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

import { API } from '../api'
import { Role, UpdateUserDto, User } from '../api/users';
import { Event } from '../api/events';
import { Company, UpdateCompanySelfDto } from '../api/companies';
import { ProfileStackParamList } from '../navigation/BottomTabNavigator';

import ScreenActivityIndicator from '../components/ScreenActivityIndicator';
import { Text, View } from '../components/Themed';
import { ArkadText } from '../components/StyledText';
import { AuthContext } from '../components/AuthContext';
import { EditProfileButton, LogoutButton, ScanQRButton, TicketsButton } from '../components/profileScreen/Buttons';
import { EmptyEventItem } from '../components/profileScreen/EmptyEventItem';
import { BookedEventList } from '../components/profileScreen/BookedEventList';

const { width, height } = Dimensions.get("window");

export type profileNavigation = {
  navigation: StackNavigationProp<ProfileStackParamList, 'ProfileScreen'>
};


export default function ProfileScreen({ navigation }: profileNavigation) {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [bookedEvents, setBookedEvents] = useState<Event[] | null>(null);
  const [editingProfile, setEditingProfile] = useState<boolean>(false);
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
  }

  function openQR() {
    navigation.navigate('QRScreen');
  }

  function updateCompany(newComp: Object) {
    if(company) {
      setCompany(Object.assign(company, newComp));
    }
  }

  function updateUser(newUser: Object) {
    if(user) {
      setUser(Object.assign(user, newUser));
    }
  }

  async function editProfile() {
    if(user == null) {
      setEditingProfile(!editingProfile);
      return
    }
    if(editingProfile) {
      if(user.role == Role.CompanyRepresentative && company) {
        const postComp: UpdateCompanySelfDto = {
          description: company.description ? company.description : "",
          website: company.website ? company.website : "",
        }
        const newComp: Company = await API.companies.updateMe(postComp)
        setCompany(newComp)
      } 
      else if(user.role == Role.Student) {
        const postUser: UpdateUserDto = {
          firstName: user.firstName ? user.firstName : "First name",
          lastName: user.lastName ? user.lastName : "Last name",
          phoneNr: user.phoneNr ? user.phoneNr : "-",
        }
        const newUser: User = await API.users.updateMe(postUser)
        setUser(newUser)
      }
    } 
    
    setEditingProfile(!editingProfile);
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
        <LogoutButton onPress={logout} />
      </View>
    );
  }
  switch (user.role) {
    case Role.CompanyRepresentative: 
      return (
        user != null && company != null
        ? <View style={styles.container}>
            <ScrollView style={styles.container}>
              <View style={styles.hostContainer}>
                <Image 
                  source={company.logoUrl 
                    ? {uri: company.logoUrl}
                    : require('../assets/images/adaptive-icon.png')}
                  style={styles.logo} 
                  defaultSource={require('../assets/images/adaptive-icon.png')} />
                <TextInput
                  defaultValue={company.name}
                  style={[styles.text, styles.companyName]}
                  multiline={true}
                  editable={false} />

                <View style={styles.infoItem}>
                  <Ionicons name="link" size={16} color="black"/>
                  <TextInput
                    defaultValue={company.website != null ? company.website : "www.example.com"}
                    style={[styles.text, styles.itemText]}
                    multiline={true}
                    editable={editingProfile}
                    onChangeText={text => updateCompany({website: text})} />
                </View>

                <ArkadText text={"About us"} style={styles.header} />
                <View style={styles.descriptionContainer}>
                  <ScrollView showsVerticalScrollIndicator={false} style={{height: height * 0.2}}>
                    <TextInput
                      defaultValue={company.description != null ? company.description : "Company description"}
                      style={[styles.text, styles.description]}
                      editable={editingProfile}
                      multiline={true}
                      numberOfLines={8}
                      onChangeText={text => updateCompany({description: text})} />
                  </ScrollView>
                  
                </View>
                  
                <ArkadText text={"About me"} style={styles.header} />

                <TextInput
                    defaultValue={company.hostName != null ? company.hostName : "Host name"}
                    style={[styles.text, styles.name]}
                    multiline={true}
                    editable={false} />

                <View style={styles.infoItem}>
                  <Ionicons name="mail" size={16} color="black"/>
                  <TextInput
                    defaultValue={company.hostEmail != null ? company.hostEmail : "host@example.com"}
                    style={[styles.text, styles.itemText]}
                    multiline={true}
                    editable={false} />
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="call" size={16} color="black" />
                  <TextInput
                    defaultValue={company.hostPhone ? company.hostPhone : '\u2013'}
                    style={[styles.text, styles.itemText]}
                    multiline={true}
                    editable={false} />
                </View>
              </View>

              <View style={styles.buttonList}>
                <ScanQRButton onPress={openQR} />
                <EditProfileButton editingProfile={editingProfile} onPress={editProfile} />
                <LogoutButton onPress={logout} />
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
            <View style={styles.studentContainer}>
              <TextInput
                defaultValue={user.firstName + " " + user.lastName}
                style={[styles.text, styles.name]}
                editable={editingProfile}
                multiline={true}
                onChangeText={text => {
                  let name = text.split("")
                  updateUser({
                    firstName: name[0],
                    lastName: name[1]
                  })
                }} />
              <View style={styles.infoList}>
                {/* Email is currently not editable by backend call

                <View style={styles.infoItem}>
                  <Ionicons name="mail" size={16} color="black"/>
                  <TextInput
                    defaultValue={user.email}
                    style={[styles.text, styles.itemText]}
                    editable={editingProfile}
                    onChangeText={text => updateUser({email: text})} />
                </View> */}
                <View style={styles.infoItem}>
                  <Ionicons name="call" size={16} color="black"/>
                  <TextInput
                    defaultValue={user.phoneNr ? user.phoneNr : '\u2013'}
                    style={[styles.text, styles.itemText]}
                    multiline={true}
                    editable={editingProfile}
                    onChangeText={text => updateUser({phoneNr: text})} />
                </View>
              </View>
                  
              <ArkadText text={"Booked events"} style={styles.header} />

              <View style={styles.eventList}> 
                {bookedEvents == undefined 
                  ? <Text>Loading events...</Text>
                  : bookedEvents.length == 0 
                    ? <EmptyEventItem />
                    : <BookedEventList
                        bookedEvents={bookedEvents}
                        onPress={openEventDetails} />
                }
              </View>
            </View>

            <View style={styles.buttonList}>
              <TicketsButton onPress={openTicketDetails} /> 
              <EditProfileButton editingProfile={editingProfile} onPress={editProfile} />
              <LogoutButton onPress={logout} />
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
  hostContainer: {
    alignItems: 'center',
  },
  logo: {
    // TODO: Make adaptive
    width: 120,
    height: 120,
  },
  companyName: {
    paddingTop: '2%',
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.darkBlue,
  },
  name: {
    paddingTop: '2%',
    fontSize: 20,
    color: Colors.darkBlue,
  },
  infoItem: {
    width: 200,
    paddingTop: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    color: Colors.darkBlue,
    fontSize: 12,
    paddingHorizontal: 8,
  },
  header: {
    paddingTop: '10%',
    paddingLeft: '4%',
    width: '100%',
    textAlign: 'left',
    fontSize: 16,
    color: Colors.darkBlue,
  },
  descriptionContainer: {
    marginTop: 8,
    width: '92%',
    borderRadius: 8,
    borderColor: Colors.black,
    borderWidth: 1,
    backgroundColor: Colors.lightGray
  },
  description: {
    color: Colors.darkBlue,
    width: '100%',
    fontSize: 14,
    padding: 12,
    textAlign: 'left',
    textAlignVertical: 'top'
  },
  studentContainer: {
    alignItems: 'center',
  },
  eventList: {
    paddingTop: '2%',
    alignItems: 'center',
    width: '100%',
  },
  infoList: {
    paddingTop: '2%',
  },
  buttonList: {
    marginTop: '10%',
  },
  text: {
    justifyContent: "center",
    textAlignVertical: 'center',
    textAlign: 'center',
    fontFamily: 'montserrat',
    color: Colors.white,
  },
});
