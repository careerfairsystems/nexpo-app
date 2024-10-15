import React from "react";
import { Text, Dimensions, FlatList, StyleSheet, View } from "react-native";
import { Student } from "api/Students";
import { SSTimeslot } from "api/StudentSessions";
import Colors from "constants/Colors";
import { SSListItem } from "./SSsListItem";

type TimeslotListProps = {
  timeslots: SSTimeslot[] | null;
  onPress: (id: number) => void;
  student: Student | null;
};

const { width } = Dimensions.get("window");

export function TimeslotList({ timeslots, onPress, student }: TimeslotListProps) {
  if (timeslots?.length == 0 || timeslots == null) {
    return <Text style={styles.text}>No upcoming timeslots =(</Text>;
  }

  timeslots.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={timeslots}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item: timeslot }) => (
        <View style={styles.ssBox}>
          <SSListItem
            key={timeslot.id}
            timeslot={timeslot}
            booked={timeslot.studentId !== null}
            bookedByMe={timeslot.studentId === student?.id}
            onPress={() => onPress(timeslot.id)}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  ssBox: {
    width: width * 0.95,
    marginVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.arkadNavy,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  text: {
    paddingTop: 40,
    fontFamily: "main-font-bold",
    fontSize: 24,
    color: Colors.white,
    textAlign: "center",
  },
});
