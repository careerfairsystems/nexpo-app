import React, { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";

import { API } from "api/API";
import { User } from "api/Users";
import { Role } from "api/Role";
import { Event } from "api/Events";
import { Company } from "api/Companies";
import { ProfileStackParamList } from "./ProfileNavigator";

import ScreenActivityIndicator from "components/ScreenActivityIndicator";
import { View } from "components/Themed";
import {
  EditProfileButton,
  LogoutButton,
} from "components/profileScreen/Buttons";
import UserProfile from "components/profileScreen/UserProfile";
import { Student } from "api/Students";
import StudentProfile from "components/profileScreen/StudentProfile";
import CompanyProfile from "components/profileScreen/CompanyProfile";
import Colors from "constants/Colors";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { BookedEventList } from "components/profileScreen/BookedEventList";
import { ArkadText } from "components/StyledText";
import ProfileTabViewer from "./ProfileTabViewer";
import Contacts from "components/profileScreen/ContactsPG";
import AdminTab from "components/profileScreen/AdminTab";
import MessagesTab from "components/profileScreen/MessagesTab";
import QuestionTab from "components/profileScreen/QuestionTab";
import { AuthDispatchContext } from "components/AuthContextProvider";
import { TicketType } from "api/Tickets";
import { set } from "date-fns";
import FaqTab from "components/profileScreen/FAQ";

export type ProfileScreenParams = {
  navigation: StackNavigationProp<ProfileStackParamList, "ProfileScreen">;
};

export default function ProfileScreen({ navigation }: ProfileScreenParams) {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [bookedEvents, setBookedEvents] = useState<Event[] | null>(null);
  const setSignedIn = useContext(AuthDispatchContext);
  const isFocused = useIsFocused();

  const [eventticket, setEventticket] = useState<Event[] | null>(null);
  const [lunchticket, setLunchticket] = useState<Event[] | null>(null);
  const [banquetticket, setBanquetticket] = useState<Event[] | null>(null);

  async function getUser() {
    const user = await API.users.getMe();
    if (user.role === Role.CompanyRepresentative) {
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
    const bookedEvents = await API.events.getBookedNotScannedEvents();
    setBookedEvents(bookedEvents);

    setEventticket(
      bookedEvents.filter((event) => event.type == TicketType.CompanyEvent)
    );
    setLunchticket(
      bookedEvents.filter((event) => event.type == TicketType.Lunch)
    );
    setBanquetticket(
      bookedEvents.filter((event) => event.type == TicketType.Banquet)
    );
  }

  async function logout() {
    await API.auth.logout();
    setSignedIn(false);
  }

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getUser();
      getRegisteredEvents();
      setLoading(false);
    }, [isFocused])
  );

  const userProfile = () => {
    return (
      <ScrollView style={styles.container}>
        <UserProfile user={user as NonNullable<User>} />
        {student && <StudentProfile student={student} />}
        {company && <CompanyProfile company={company} />}
        <View style={styles.eventList}>
          {!bookedEvents ? (
            <ActivityIndicator />
          ) : (
            eventticket?.length !== 0 && (
              <>
                <ArkadText text={"Tickets to Events:"} style={styles.header} />
                <BookedEventList
                  bookedEvents={eventticket}
                  onPress={(id) =>
                    navigation.navigate("ProfileSwitchScreen", {
                      screen: "details",
                      id: id,
                    })
                  }
                />
              </>
            )
          )}
          {!bookedEvents ? (
            <ActivityIndicator />
          ) : (
            lunchticket?.length !== 0 &&
            user?.role !== Role.Student && (
              <>
                <ArkadText text={"Lunch tickets:"} style={styles.header} />
                <BookedEventList
                  bookedEvents={lunchticket}
                  onPress={(id) =>
                    navigation.navigate("ProfileSwitchScreen", {
                      screen: "details",
                      id: id,
                    })
                  }
                />
              </>
            )
          )}
          {!bookedEvents ? (
            <ActivityIndicator />
          ) : (
            banquetticket?.length !== 0 &&
            user?.role !== Role.Student && (
              <>
                <ArkadText text={"Banquet tickets:"} style={styles.header} />
                <BookedEventList
                  bookedEvents={banquetticket}
                  onPress={(id) =>
                    navigation.navigate("ProfileSwitchScreen", {
                      screen: "details",
                      id: id,
                    })
                  }
                />
              </>
            )
          )}
        </View>
        <EditProfileButton
          editingProfile={false}
          onPress={() =>
            navigation.navigate("ProfileSwitchScreen", {
              screen: "edit",
              id: 0,
            })
          }
        />
        <View style={styles.logout}>
          <LogoutButton onPress={logout} />
        </View>
      </ScrollView>
    );
  };

  if (isLoading || !user) {
    return <ScreenActivityIndicator />;
  } else {
    return (
      <>
          {user.role === Role.Administrator && (
            <ProfileTabViewer
              profile={userProfile}
              contacts={Contacts}
              messages={MessagesTab}
              admin={AdminTab}
              question={QuestionTab}
              faq={FaqTab}
            />
          )}
          {user.role === Role.Volunteer && (
            <ProfileTabViewer
              profile={userProfile}
              contacts={Contacts}
              messages={MessagesTab}
              faq={FaqTab}
              question={QuestionTab}
            />
          )}
          {user.role === Role.CompanyRepresentative && (
            <ProfileTabViewer
              profile={userProfile}
              contacts={Contacts}
              question={QuestionTab}
            />
          )}
          {user.role === Role.Student && (
            <ProfileTabViewer profile={userProfile} question={QuestionTab} />
          )}
        {/* <ScrollView style={styles.container}>
      <UserProfile user={user as NonNullable<User>} />
      { student && <StudentProfile student={student} />}
      { company && <CompanyProfile company={company} />}
      <ArkadText text={"Tickets to Events:"} style={styles.header}/>
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
    </ScrollView> */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingVertical: 24,
    backgroundColor: Colors.arkadNavy,
  },
  header: {
    width: "100%",
    textAlign: "center",
    fontSize: 24,
    color: Colors.white,
    justifyContent: "center",
  },
  eventList: {
    paddingTop: "3%",
  },
  logout: {
    paddingBottom: "10%",
    backgroundColor: Colors.arkadNavy,
  },
});
