import Colors from "constants/Colors";
import React, { useState } from "react";
import { TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { View } from "components/Themed";
import { ArkadText } from "components/StyledText";

interface Item {
  id: number;
  title: string;
  content: string;
}

interface ExpandableListProps {
  data: Item[];
}

const ExpandableListItem: React.FC<{ item: Item }> = ({ item }) => {
  const [expanded, setExpanded] = React.useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={toggleExpand} style={styles.itemTouchable}>
        <ArkadText style={styles.itemTitle} text={item.title} />
      </TouchableOpacity>
      {expanded && <ArkadText style={styles.itemContent} text={item.content} />}
    </View>
  );
};

const ExpandableList: React.FC<ExpandableListProps> = ({ data }) => {
  const renderItem = ({ item }: { item: Item }) => (
    <ExpandableListItem item={item} />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const Expandable: React.FC<ExpandableListProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <ExpandableList data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.arkadNavy,
  },
  itemContainer: {
    alignSelf: "center", // Center the item horizontally
    width: "90%", // Set the item width to 90% of the container
    marginBottom: 15,
    padding: 10,
    backgroundColor: Colors.arkadOrange,
    borderRadius: 10,
    elevation: 3,
  },
  itemTouchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  itemTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "left",
  },
  itemContent: {
    marginTop: 10,
    fontSize: 18,
    color: Colors.white,
    textAlign: "left",
  },
  icon: {
    position: "absolute",
    right: 10,
  },
});

export default Expandable;
