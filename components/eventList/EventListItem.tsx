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
  odd: boolean;
};

export const EventListItem = ({
  event,
  itemStyle,
  onPress,
  ticket_eventid,
  odd,
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
    <Pressable
      onPress={onPress}
      style={[odd ? styles.containerOdd : styles.container, itemStyle]}
    >
      <Image
        source={require("../../assets/images/adaptive-icon.png")}
        style={styles.logo}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.arkadTurkos,
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: Colors.arkadTurkos,
    padding: 16,
    borderRadius: 16,
    borderWidth: 4,
  },
  containerOdd: {
    borderColor: Colors.arkadOrange,
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: Colors.arkadOrange,
    padding: 16,
    borderRadius: 16,
    borderWidth: 4,
  },
  headerContainer: {
    flex: 1,
  },
  eventName: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 22,
    textAlign: "left",
    color: Colors.arkadNavy,
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
