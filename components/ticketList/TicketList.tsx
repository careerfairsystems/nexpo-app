import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";

import { TicketListItem } from "./TicketListItem";
import { TicketItem } from "./TicketItem";

type TicketListProps = {
  ticketItems: TicketItem[] | null;
  onPress: (ticketItem: TicketItem) => void;
};

const { width, height } = Dimensions.get("window");

export const TicketList = ({ ticketItems, onPress }: TicketListProps) => (
  <FlatList
    showsVerticalScrollIndicator={false}
    data={ticketItems}
    keyExtractor={({ ticket }) => ticket.id.toString()}
    renderItem={({ item: ticketItem }) => (
      <View style={styles.eventBox}>
        <TicketListItem
          ticketItem={ticketItem}
          itemStyle={{}}
          onPress={() => onPress(ticketItem)}
        />
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  eventBox: {
    width: width * 0.85,
    height: height * 0.24,
  },
});
