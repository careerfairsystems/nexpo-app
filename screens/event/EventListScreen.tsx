import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "components/Themed";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "api/API";
import { Event } from "api/Events";
import { EventList } from "components/eventList/EventList";
import { EventStackParamlist } from "./EventsNavigator";
import { UpcomingButton } from "components/eventList/UpcomingButton";
import { AdministratorButton } from "components/eventList/AdministratorButton";
import ScreenActivityIndicator from "components/ScreenActivityIndicator";
import { Role } from "api/Role";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import Toast from "react-native-toast-message";
import Colors from "constants/Colors";

type EventsNavigation = {
  navigation: StackNavigationProp<EventStackParamlist, "EventListScreen">;
};

export default function EventListScreen({ navigation }: EventsNavigation) {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [events, setEvents] = React.useState<Event[] | null>(null);
  const [role, setRole] = React.useState<Role | null>(null);

  const [upcomingEvents, setUpcomingEvents] = React.useState<Event[] | null>(
    null
  );
  const [showAllEvents, setShowAllEvents] = React.useState<boolean>(false);
  const [QRMode, setQRMode] = React.useState<boolean>(true);

  const getEvents = async () => {
    setLoading(true);
    let events = await API.events.getAllEvents();
    const isSignedIn = await API.auth.isAuthenticated();
    if (isSignedIn) {
      const role = await API.auth.getUserRole();
      setRole(role);
    }

    // Filter out Banquet and Lunch events as they shouldn't be shown in the event list
    events = events.filter((event) => {
      const nameLower = event.name.toLowerCase();
      if (nameLower.includes("lunch") || nameLower.includes("banquet")) {
        if (nameLower.includes("lecture")) {
          return true;
        }
        return false;
      }
      return true;
    });

    setEvents(events);
    setUpcomingEvents(API.events.getUpcomingEvents(events));
    setLoading(false);
  };

  function switchEvents() {
    setShowAllEvents(!showAllEvents);
  }

  function switchQRMode() {
    setQRMode(!QRMode);
  }

  const openEventDetails = (id: number) => {
    if (role === null) {
      Toast.show({
        type: "info",
        text1: "Please login to see event details.",
        visibilityTime: 5000,
      });
      return;
    }
    if (role === Role.Administrator && QRMode) {
      navigation.navigate("EventSwitchScreen", {
        id: id,
        screen: "participatians",
      });
    } else {
      navigation.navigate("EventSwitchScreen", { id: id, screen: "details" });
    }
  };

  useFocusEffect(
    useCallback(() => {
      getEvents();
    }, [])
  );

  if (isLoading) {
    return <ScreenActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <UpcomingButton showAllEvents={showAllEvents} onPress={switchEvents} />
        {/* Admin button for QR Mode */}
        {role === Role.Administrator && (
          <AdministratorButton QRMode={QRMode} switchQRMode={switchQRMode} />
        )}
        <EventList
          events={showAllEvents ? events : upcomingEvents}
          onPress={openEventDetails}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.arkadNavy,
  },
});
