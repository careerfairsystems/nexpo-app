import * as React from "react";
import { TouchableOpacity, StyleSheet, Dimensions, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

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
import { TicketType } from "api/Tickets";

const { width } = Dimensions.get("window");

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
  const [showAllEvents, setShowAllEvents] = React.useState<boolean>(true);
  const [showAllTickets, setShowAllTickets] = React.useState<boolean>(false);
  const [QRMode, setQRMode] = React.useState<boolean>(true);
  const [eventTickets, setEventTickets] = React.useState<Event[] | null>(null);

  async function getRegisteredEvents() {
    const bookedEvents = await API.events.getBookedNotScannedEvents();

    setEventTickets(
      bookedEvents.filter((event) => event.type == TicketType.CompanyEvent)
    );
  }

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
    setShowAllEvents(true);
    setShowAllTickets(false);
  }

  function switchTickets() {
    setShowAllEvents(false);
    setShowAllTickets(true);
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
      getRegisteredEvents();
    }, [])
  );

  if (isLoading) {
    return <ScreenActivityIndicator />;
  }

  const TwoButtonSlider = ({
    onEventsPress,
    onTicketsPress,
  }: {
    onEventsPress: () => void;
    onTicketsPress: () => void;
  }) => {
    const [active, setActive] = React.useState("Events");
    const translateX = useSharedValue(0);

    const switchToEvents = () => {
      setActive("Events");
      translateX.value = withTiming(0, { duration: 250 }, () => {});
      onEventsPress();
    };

    const switchToTickets = () => {
      setActive("Your Tickets");
      translateX.value = withTiming(width * 0.38, { duration: 250 }, () => {});
      onTicketsPress();
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: translateX.value }],
      } as Animated.AnimateStyle<ViewStyle>;  
    });

    return (
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={switchToEvents}>
          <Text
            style={
              active === "Events" ? styles.activeText : styles.inactiveText
            }
          >
            Events
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={switchToTickets}>
          <Text
            style={
              active === "Your Tickets"
                ? styles.activeText
                : styles.inactiveText
            }
          >
            Your Tickets
          </Text>
        </TouchableOpacity>
        <Animated.View style={[styles.slider, animatedStyle]} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <TwoButtonSlider
          onEventsPress={switchEvents}
          onTicketsPress={switchTickets}
        />
        {/* <UpcomingButton showAllEvents={showAllEvents} onPress={switchEvents} /> */}
        {/* Admin button for QR Mode */}
        {role === Role.Administrator && (
          <AdministratorButton QRMode={QRMode} switchQRMode={switchQRMode} />
        )}

        <EventList
          events={showAllEvents ? events : eventTickets}
          onPress={openEventDetails}
          showTickets={showAllTickets}
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
  buttonsContainer: {
    flexDirection: "row",
    width: "80%",
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.arkadTurkos,
    overflow: "hidden",
    position: "relative",
    marginVertical: 20,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  activeText: {
    color: Colors.black,
  },
  inactiveText: {
    color: Colors.white,
  },
  slider: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: Colors.arkadTurkos,
    borderRadius: 25,
  },
});
