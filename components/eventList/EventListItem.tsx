import React from "react";
import { Dimensions, Pressable, StyleSheet, View, ViewStyle, Image } from "react-native";

import { bookedEvent, Event } from "api/Events";
import { ArkadText } from "../StyledText";
import Colors from "constants/Colors";
import { API } from "api/API";

type ListedEventItemProps = {
  event: Event;
  itemStyle: ViewStyle;
  onPress: () => void;
};

export const EventListItem = ({
  event,
  itemStyle,
  onPress,
}: ListedEventItemProps) => (
  <Pressable onPress={onPress} style={[styles.container, itemStyle]}>
    <View style={styles.headerContainer}>
      <ArkadText style={styles.eventName} text={event.name} />
      <ArkadText
        style={styles.eventTime}
        text={API.events.formatTime(event.date, event.start, event.end)}
      />
    </View>

    {event.type === 0 && (
      <View style={styles.row}>
        <Image
            source={
              require("../../assets/images/event.png")
            }
            style={styles.logo}
          />
      </View>
    )}

    <View style={styles.footerContainer}>
      {/* Color of box changes depending on status */}
      <View
        style={[
          styles.eventBookedContainer,
          event.capacity == event.ticketCount
            ? { backgroundColor: Colors.darkRed }
            : { backgroundColor: Colors.arkadTurkos },
        ]}
      >
        <ArkadText
          style={styles.eventBookedText}
          text={event.ticketCount + "/" + event.capacity}
        />
      </View>
    </View>
  </Pressable>
);

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
  },
  row: {
    flex: 1,
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
    flexDirection: "column",
  },
});
