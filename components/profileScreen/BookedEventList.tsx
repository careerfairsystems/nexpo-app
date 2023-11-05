import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";

import { Event } from "api/Events";
import { EventListItem } from "../eventList/EventListItem";
import { API } from "api/API";

type BookedEventListProps = {
  bookedEvents: Event[] | null;
  onPress: (eventId: number) => void;
};

const windowWidth = Dimensions.get("window").width;

export const BookedEventList = ({
  bookedEvents,
  onPress,
}: BookedEventListProps) => {
  const getTicketsForEvent = async (event: Event) => {
    const ticket = await API.tickets.getTicketForEvent(event);
    const id = ticket?.eventId;
    if (id) return id;
    return null;
  };

  return (
    <View style={{ marginBottom: "5%" }}>
      <FlatList
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        data={bookedEvents}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item: event }) => {
          // Get the ticket information for the current event
          const ticket_eventid = getTicketsForEvent(event);

          return (
            <View style={styles.item}>
              <EventListItem
                event={event}
                itemStyle={{ width: windowWidth * 0.6 }}
                onPress={() => onPress(event.id)}
                ticket_eventid={ticket_eventid}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    alignItems: "center",
  },
  item: {
    height: 150,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
