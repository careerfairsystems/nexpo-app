import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
  Image,
} from "react-native";

import { bookedEvent, Event } from "api/Events";
import { ArkadText } from "../StyledText";
import Colors from "constants/Colors";
import { API } from "api/API";
import { Ticket } from "api/Tickets";

type ListedEventItemProps = {
  event: Event;
  itemStyle: ViewStyle;
  onPress: () => void;
  ticket_eventid: Promise<number | null>;
};

export const EventListItem = ({
  event,
  itemStyle,
  onPress,
  ticket_eventid,
}: ListedEventItemProps) => {
  const [backgroundColor, setBackgroundColor] = useState<{
    backgroundColor: string;
  }>({ backgroundColor: Colors.arkadTurkos });

  useEffect(() => {
    const updateBackgroundColor = async () => {
      try {
        const resolvedTicketEventId = await ticket_eventid;

        if (resolvedTicketEventId === event.id) {
          setBackgroundColor({ backgroundColor: Colors.arkadGreen });
        } else if (event.capacity === event.ticketCount) {
          setBackgroundColor({ backgroundColor: Colors.darkRed });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    updateBackgroundColor();
  }, [ticket_eventid, event.id, event.capacity, event.ticketCount]);

  return (
    <Pressable onPress={onPress} style={[styles.container, itemStyle]}>
      <View style={styles.headerContainer}>
        <ArkadText style={styles.eventName} text={event.name} />
        <ArkadText
          style={styles.eventTime}
          text={API.events.formatTime(event.date, event.start, event.end)}
        />
        {/*       {event.type === 0 && (
          <View style={styles.row}>
            <Image
              source={require("../../assets/images/event.png")}
              style={styles.logo}
            />
          </View>
        )} */}
      </View>

      <View style={styles.footerContainer}>
        {/* Color of box changes depending on status */}
        <View style={[styles.eventBookedContainer, backgroundColor]}>
          <ArkadText
            style={styles.eventBookedText}
            text={event.ticketCount + "/" + event.capacity}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.arkadOrange,
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 16,
    borderWidth: 4,
  },
  headerContainer: {
    flex: 1,
  },
  eventName: {
    flex: 1,
    fontSize: 22,
    textAlign: "left",
    color: Colors.arkadNavy,
    marginBottom: 10,
  },
  footerContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    /* Footer is pushed to bottom since header
      has flex: 1. */
    paddingBottom: 4,
  },
  eventTime: {
    paddingBottom: 6,
    fontSize: 16,
    textAlign: "left",
    color: Colors.arkadNavy,
  },
  eventBookedContainer: {
    padding: 2,
    alignSelf: "flex-end",
    borderRadius: 10,
  },
  eventBookedText: {
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal: 12,
    color: Colors.white,
  },
  logo: {
    width: "40%",
    height: Dimensions.get("window").height * 0.16,
    resizeMode: "contain",
    position: "absolute",
  },
  row: {
    flex: 1,
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
    flexDirection: "column",
  },
});
