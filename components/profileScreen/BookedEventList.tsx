import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";

import { Event } from "api/Events";
import { EventListItem } from "../eventList/EventListItem";
import { API } from "api/API";
import { ArkadText } from "components/StyledText";
import Colors from "constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

type BookedEventListProps = {
  bookedEvents: Event[] | null;
  onPress: (eventId: number) => void;
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const itemHeight = windowHeight * 0.25;


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
            <View style={[styles.item, { height: itemHeight }]}>
              <EventListItem
                event={event}
                itemStyle={{ width: windowWidth * 0.6 }}
                onPress={() => onPress(event.id)}
                ticket_eventid={ticket_eventid}
                odd={false}
              />
              <View>
                <ArkadText style={styles.eventText} text={event.name} />
              </View>
              <View style={styles.infoRow}>
                <ArkadText
                  style={{
                    ...styles.infoText,
                    color: Colors.arkadOrange,
                    paddingRight: 10,
                  }}
                  text={API.events.formatTime(
                    event.date,
                    event.start,
                    event.end
                  )}
                />
              </View>

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
    height: 300,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  infoText: {
    fontSize: 16,
    textAlign: "left",
    fontFamily: "main-font-bold",
    paddingLeft: 10, // Adjust padding to align text properly
  },
  infoRow: {
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  eventText: {
    paddingLeft: 10,
    fontSize: 20,
    textAlign: "left",
    fontFamily: "main-font-bold",
    color: Colors.white,
    paddingTop: 10, // Space between event box and event name
  },


});
