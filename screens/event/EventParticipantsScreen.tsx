import * as React from "react";
import { StyleSheet } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { View } from "components/Themed";
import { StackNavigationProp } from "@react-navigation/stack";
import { EventStackParamlist } from "./EventsNavigator";
import { Event } from "api/Events";
import ScreenActivityIndicator from "components/ScreenActivityIndicator";
import { ScanQRButton } from "components/profileScreen/Buttons";
import { useCallback } from "react";
import { TicketDto } from "api/Tickets";
import { API } from "api/API";
import { StudentTicketList } from "components/ticketList/studentTicketList";
import { ArkadText } from "components/StyledText";
import Colors from "constants/Colors";

type EventNavigation = {
  navigation: StackNavigationProp<EventStackParamlist, "EventSwitchScreen">;
  route: {
    params: {
      id: number;
    };
  };
};

export default function EventParticipantsScreen(
  navigation: StackNavigationProp<EventStackParamlist, "EventSwitchScreen">,
  id: number
) {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [tickets, setTickets] = React.useState<TicketDto[] | null>(null);
  const [event, setEvent] = React.useState<Event | null>(null);
  const [consumed, setConsumed] = React.useState<number>(0);
  const [total, setTotal] = React.useState<number>(0);

  const getTickets = async () => {
    const tkts = await API.tickets.getAllTicketsForEvent(id);
    setTickets(tkts);

    let consumed = 0;
    const total = tkts.length;
    tkts.forEach((item, index) => {
      if (item["ticket"]["isConsumed"]) {
        consumed++;
      }
    });
    setTotal(total);
    setConsumed(consumed);
  };

  const getEvent = async () => {
    const event = await API.events.getEvent(id);
    setEvent(event);
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getTickets();
      getEvent();
      setLoading(false);
    }, [])
  );

  if (isLoading) {
    return <ScreenActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <ArkadText
          text={`All participants for the event\n ${event?.name}`}
          style={styles.title}
        />
      </View>
      <ScanQRButton onPress={() => navigation.navigate("QRScreen", { id })} />
      <ArkadText text={consumed + "/" + total} style={styles.count} />
      <StudentTicketList tickets={tickets} />
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    justifyContent: "center",
    fontSize: 24,
    color: Colors.white,
    backgroundColor: Colors.arkadTurkos,
    borderRadius: 14,
    borderWidth: 4,
    borderColor: Colors.arkadTurkos,
  },
  count: {
    justifyContent: "center",
    fontSize: 24,
    color: Colors.white,
  },
  titleContainer: {
    width: "90%",
    height: 80,
    justifyContent: "center",
    backgroundColor: Colors.arkadNavy,
    marginTop: 10,
  },
  container: {
    alignItems: "center",
    backgroundColor: Colors.arkadNavy,
    borderRadius: 14,
    borderWidth: 4,
    borderColor: Colors.white,
  },
});
