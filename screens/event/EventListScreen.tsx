import * as React from "react";
import { StyleSheet } from "react-native";

import { View } from "components/Themed";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "api/API";
import { Event } from "api/Events";
import { EventList } from "components/eventList/EventList";
import { EventStackParamlist } from "./EventsNavigator";
import { UpcomingButton } from "components/eventList/UpcomingButton";
import ScreenActivityIndicator from "components/ScreenActivityIndicator";
import { Role } from "api/Role";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import Toast from "react-native-toast-message";

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

  const getEvents = async () => {
    setLoading(true);
    const events = await API.events.getAllEvents();
    const isSignedIn = await API.auth.isAuthenticated();
    if (isSignedIn) {
      const role = await API.auth.getUserRole();
      setRole(role);
    }

    // Filter out Banquet and Lunch events as they shouldn't be shown in the event list
    for (let i = 0; i < events.length; i++) {
      if (
        events[i].name.toLowerCase().includes("lunch") ||
        events[i].name.toLowerCase().includes("banquet")
      ) {
        if (events[i].name.toLowerCase().includes("lecture")) {
          continue;
        }
        delete events[i];
      }
    }

    setEvents(events);
    setUpcomingEvents(API.events.getUpcomingEvents(events));
    setLoading(false);
  };

  function switchEvents() {
    setShowAllEvents(!showAllEvents);
  }

  const openEventDetails = (id: number) => {
    if (role === null) {
      Toast.show({
        type: "info",
        text1: "Please login to see event details.",
      });
      return;
    }
    if (role === Role.Administrator) {
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
  },
});
