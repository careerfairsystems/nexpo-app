import React from "react";
import { Text, Dimensions, FlatList, StyleSheet, View } from "react-native";

import { Event } from "api/Events";
import Colors from "constants/Colors";
import { EventListItem } from "./EventListItem";
import { API } from "api/API";
import { ArkadText } from "components/StyledText";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

type EventListProps = {
  events: Event[] | null;
  onPress: (id: number) => void;
};

const { width, height } = Dimensions.get("window");

export function EventList({ events, onPress }: EventListProps) {
  if (events?.length == 0) {
    return <Text style={styles.text}>No upcoming events</Text>;
  }

  const getTicketsForEvent = async (event: Event) => {
    const ticket = await API.tickets.getTicketForEvent(event);
    const id = ticket?.eventId;
    if (id) return id;
    return null;
  };

  const oddEvent = (index: number) => {
    return index % 2 !== 0;
  };

  // Sort the events so that "Career Room" comes first
  const sortedEvents = events?.sort((a, b) => {
    if (a.name === "Career Room") return -1;
    if (b.name === "Career Room") return 1;
    return 0;
  });

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={sortedEvents}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item: event, index }) => {
        // Get the ticket information for the current event
        const ticket_eventid = getTicketsForEvent(event);

        return (
          <View style={styles.eventBox}>
            <EventListItem
              event={event}
              itemStyle={{}}
              onPress={() => onPress(event.id)}
              ticket_eventid={ticket_eventid}
              odd={oddEvent(index)}
            />
            <View>
              <ArkadText style={styles.eventText} text={event.name} />
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons
                name="date-range"
                size={24}
                color={
                  oddEvent(index) ? Colors.arkadOrange : Colors.arkadTurkos
                }
              />
              <ArkadText
                style={{
                  ...styles.infoText,
                  color: oddEvent(index)
                    ? Colors.arkadOrange
                    : Colors.arkadTurkos,
                  paddingRight: 10,
                }}
                text={API.events.formatTime(event.date, event.start, event.end)}
              />

              <FontAwesome name="cutlery" size={24} color={Colors.white} />
              <ArkadText
                style={styles.infoText}
                text={event.ticketCount + "/" + event.capacity}
              />
              {event.capacity === event.ticketCount && (
                <ArkadText
                  style={styles.infoText}
                  text={"Food tickets sold out. Seats available"}
                />
              )}
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  eventBox: {
    width: width * 0.95,
    height: height * 0.3,
    backgroundColor: Colors.arkadNavy,
    padding: 10, // Adjust padding to align the content
  },
  text: {
    paddingTop: 40,
    fontFamily: "main-font-bold",
    fontSize: 32,
    color: Colors.white,
  },
  eventText: {
    paddingLeft: 10,
    fontSize: 20,
    textAlign: "left",
    fontFamily: "main-font-bold",
    color: Colors.white,
    paddingTop: 10, // Space between event box and event name
  },
  infoRow: {
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 20,
    textAlign: "left",
    fontFamily: "main-font-bold",
    paddingLeft: 10, // Adjust padding to align text properly
  },
});
