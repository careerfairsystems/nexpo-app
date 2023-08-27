import { Dimensions, FlatList, StyleSheet, View } from "react-native";

import { Event } from "api/Events";
import { EventListItem } from "../eventList/EventListItem";

type BookedEventListProps = {
  bookedEvents: Event[] | null;
  onPress: (eventId: number) => void;
};

const windowWidth = Dimensions.get("window").width;

export const BookedEventList = ({
  bookedEvents,
  onPress,
}: BookedEventListProps) => (
  <View
    style={
      bookedEvents
        ? { height: 180 * bookedEvents?.length, alignItems: "center" }
        : { height: 180, alignItems: "center" }
    }
  >
    <FlatList
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      data={bookedEvents}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item: event }) => (
        <View style={styles.item}>
          <EventListItem
            event={event}
            itemStyle={{ width: windowWidth * 0.6 }}
            onPress={() => onPress(event.id)}
          />
        </View>
      )}
    />
  </View>
);

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
