import { useCallback, useContext, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";

import { API } from "api/API";
import { User } from "api/Users";
import { Role } from "api/Role";
import { Event } from "api/Events";
import { Company } from "api/Companies";
import { getAllTickets, Ticket, getTicketType } from "api/Tickets";
import { ProfileStackParamList } from "./ProfileNavigator";

import ScreenActivityIndicator from "components/ScreenActivityIndicator";
import { View } from "components/Themed";
import { AuthContext } from "components/AuthContext";
import { EditProfileButton, LogoutButton, ShowLunchTicketButton } from "components/profileScreen/Buttons";
import UserProfile from "components/profileScreen/UserProfile";
import { Student } from "api/Students";
import StudentProfile from "components/profileScreen/StudentProfile";
import CompanyProfile from "components/profileScreen/CompanyProfile";
import Colors from "constants/Colors";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { BookedEventList } from "components/profileScreen/BookedEventList";
import { ArkadText, NoButton } from "components/StyledText";
import TicketQRCode from "../../components/profileScreen/TicketQRCode";

export type ProfileScreenParams = {
  navigation: StackNavigationProp<ProfileStackParamList, "ProfileScreen">;
};

export default function ProfileScreen({ navigation }: ProfileScreenParams) {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [bookedEvents, setBookedEvents] = useState<Event[] | null>(null);
  const [showLunchTicket, setShowLunchTicket] = useState<boolean>(false);
  const [lunchTicket, setLunchTicket] = useState<Ticket | null>(null);
  const authContext = useContext(AuthContext);
  const isFocused = useIsFocused();

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
  }

  const getLunchTicket = async () => {
    const apiResponse = await getAllTickets();
    const tickets = apiResponse as Ticket[];
    const types = await Promise.all(tickets.map((t) => getTicketType(t.id)));

    // indexOf will return -1 if the lunch type is not present in the list
    if (types.indexOf(1) !== -1) setLunchTicket(tickets[types.indexOf(1)]);
  };

  async function logout() {
    await API.auth.logout();
    authContext.signOut();
    window.location.reload();
  }

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getUser();
      getRegisteredEvents();
      getLunchTicket();
      setLoading(false);
    }, [isFocused])
  );

  if (isLoading || !user) {
    return <ScreenActivityIndicator />;
  } else {
    return (
      <>
        <ScrollView style={styles.container}>
          <UserProfile user={user as NonNullable<User>} />
          {student && <StudentProfile student={student} />}
          {company && <CompanyProfile company={company} />}
          <ArkadText text={"Tickets to Events:"} style={styles.header} />
          <View style={styles.eventList}>
            {!bookedEvents ? (
              <ActivityIndicator />
            ) : (
              bookedEvents.length !== 0 && (
                <BookedEventList
                  bookedEvents={bookedEvents}
                  onPress={(id) =>
                    navigation.navigate("ProfileSwitchScreen", { screen: "details", id: id })
                  }
                />
              )
            )}
          </View>
          <EditProfileButton
            editingProfile={false}
            onPress={() => navigation.navigate("ProfileSwitchScreen", { screen: "edit", id: 0 })}
          />
          { !company && (
            <View style={(lunchTicket && !lunchTicket.isConsumed) ? styles.enabled : styles.disabled}>
              <ShowLunchTicketButton onPress={() => setShowLunchTicket(true)} />
              <TicketQRCode
                modalVisible={showLunchTicket}
                setModalVisible={setShowLunchTicket}
                title="Lunch"
                ticket={lunchTicket}
              />
            </View>
          )}
          <View style={styles.logout}>
            <LogoutButton onPress={logout} />
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingVertical: 24,
    backgroundColor: Colors.white,
  },
  header: {
    width: "100%",
    textAlign: "center",
    fontSize: 24,
    color: Colors.arkadNavy,
    justifyContent: "center",
  },
  eventList: {
    paddingTop: "3%",
  },
  logout: {
    paddingBottom: "10%",
    backgroundColor: Colors.white,
  },
  enabled: {},
  disabled: {
    opacity: 0.5,
  },
});
