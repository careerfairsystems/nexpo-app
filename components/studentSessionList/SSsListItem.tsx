import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SSTimeslot } from "api/StudentSessions";
import { ArkadText } from "../StyledText";
import Colors from "constants/Colors";
import { API } from "api/API";

type ListedTimeslotProps = {
  timeslot: SSTimeslot;
  booked: boolean;
  bookedByMe: boolean;
  onPress: () => void;
};

export const SSListItem = ({
                             timeslot,
                             booked,
                             bookedByMe,
                             onPress,
                           }: ListedTimeslotProps) => (
  <Pressable onPress={onPress} style={[styles.container, bookedByMe ? styles.highlighted : {}]}>
    <ArkadText
      style={styles.timeslotTime}
      text={API.studentSessions.formatTime(timeslot.start, timeslot.end)}
    />
    {booked ? (
      <View
        style={[
          styles.timeslotStatusContainer,
          bookedByMe
            ? { backgroundColor: Colors.arkadTurkos }
            : { backgroundColor: Colors.darkRed },
        ]}
      >
        <ArkadText
          style={styles.timeslotStatusText}
          text={bookedByMe ? "Yours!" : "Booked"}
        />
      </View>
    ) : (
      <View style={[styles.timeslotStatusContainer, { backgroundColor: Colors.lightGreen }]}>
        <ArkadText style={styles.timeslotStatusText} text={"Available"} />
      </View>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.arkadNavy,
    padding: 16,
    borderRadius: 16,
    marginVertical: 4,
    //shadowColor: "#888",
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  highlighted: {
    borderColor: Colors.lightGreen,
    borderWidth: 2,
  },
  timeslotTime: {
    fontSize: 18,
    color: Colors.white,
  },
  timeslotStatusContainer: {
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  timeslotStatusText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: "600",
  },
});

