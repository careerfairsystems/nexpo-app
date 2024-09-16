import React from "react";
import { Text, Dimensions, FlatList, StyleSheet, View } from "react-native";

import { Event } from "api/Events";
import Colors from "constants/Colors";
import { EventListItem } from "./EventListItem";
import { API } from "api/API";
import { ArkadText } from "components/StyledText";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

type EventListProps = {
  events: Event[] | null;
  onPress: (id: number) => void;
  showTickets: boolean;
};

const { width, height } = Dimensions.get("window");

export function EventList({ events, onPress, showTickets }: EventListProps) {
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
          <View
            style={[
              styles.eventBox,
              showTickets && styles.eventBoxWithTickets, // Apply different styles when showTickets is true
            ]}
          >
            <View style={styles.eventItemContainer}>
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
                  text={API.events.formatTime(
                    event.date,
                    event.start,
                    event.end
                  )}
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

            {/* Extra 40% section for orange and light blue boxes */}
            {showTickets && (
              <View style={styles.ticketInfoContainer}>
                <View style={styles.QRBox}>
                  <AntDesign
                    name="qrcode"
                    size={height * 0.08}
                    color={Colors.black}
                  />
                  {/* <ArkadText
                    style={{
                      ...styles.infoText,
                      color: Colors.black,
                      paddingRight: 10,
                    }}
                    text={"Show QR"}
                  /> */}
                </View>
                <View style={styles.unregisterBox}>
                  <Entypo name="cross" size={height * 0.08} color="black" />{" "}
                  {/* <ArkadText
                    style={{
                      ...styles.infoText,
                      color: Colors.black,
                      paddingRight: 10,
                    }}
                    text={"Unregister"}
                  /> */}
                </View>
              </View>
            )}
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
    flexDirection: "column", // Default to column layout when showTickets is false
  },
  eventBoxWithTickets: {
    flexDirection: "row", // Use row layout when showTickets is true
  },
  eventItemContainer: {
    flex: 1.0,
  },
  ticketInfoContainer: {
    flex: 0.4, // Take up 40% of the width
    justifyContent: "space-between", // Evenly space the boxes
    paddingLeft: 5, // Add some padding between the event info and the boxes
  },
  QRBox: {
    flex: 1,
    backgroundColor: Colors.arkadTurkos,
    borderColor: Colors.arkadTurkos,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 10,
    padding: 16,
    borderRadius: 16,
    borderWidth: 4,
  },
  unregisterBox: {
    flex: 1,
    backgroundColor: Colors.arkadOrange,
    borderColor: Colors.arkadOrange,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 10,
    padding: 16,
    borderRadius: 16,
    borderWidth: 4,
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
    fontSize: 16,
    textAlign: "left",
    fontFamily: "main-font-bold",
    paddingLeft: 10, // Adjust padding to align text properly
  },
});
