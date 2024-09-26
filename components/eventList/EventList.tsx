import React from "react";
import { Text, Dimensions, FlatList, StyleSheet, View } from "react-native";

import { Event } from "api/Events";
import Colors from "constants/Colors";
import { EventListItem } from "./EventListItem";
import { API } from "api/API";

type EventListProps = {
  events: Event[] | null;
  onPress: (id: number) => void;
};

const { width, height } = Dimensions.get("window");

export function EventList({ events, onPress }: EventListProps) {
  if (events?.length == 0) {
    return <Text style={styles.text}>No upcoming events =(</Text>;
  }

  const getTicketsForEvent = async (event: Event) => {
    const ticket = await API.tickets.getTicketForEvent(event);
    const id = ticket?.eventId;
    if (id) return id;
    return null;
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={events}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item: event }) => {
        // Get the ticket information for the current event
        const ticket_eventid = getTicketsForEvent(event);

        return (
          <View style={styles.eventBox}>
            <EventListItem
              event={event}
              itemStyle={{}}
              onPress={() => onPress(event.id)}
              ticket_eventid={ticket_eventid}
            />
          </View>
        );
      }}
    />
  );
}
const styles = StyleSheet.create({
  eventBox: {
    width: width * 0.95,
    height: height * 0.24,
    backgroundColor: Colors.arkadNavy,
  },
  text: {
    paddingTop: 40,
    fontFamily: "main-font-bold",
    fontSize: 32,
    color: Colors.white,
  },
});
