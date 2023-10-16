// import { StyleSheet, Animated, View, LayoutChangeEvent } from "react-native";
// import React from "react";
// import { ArkadText } from "../StyledText";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import Colors from "constants/Colors";
// import { AntDesign } from "@expo/vector-icons";

// export default function Expandable(props: any) {
//   const [expanded, setExpanded] = React.useState(false);
//   const [animatedHeight, setAnimatedHeight] = React.useState(
//     new Animated.Value(0)
//   );
//   const [maxHeightSet, setMaxHeightSet] = React.useState(false);
//   const [maxHeight, setMaxHeight] = React.useState(0);

//   const animationDuration = 200;

//   const toggleDropdown = () => {
//     if (expanded) {
//       Animated.timing(animatedHeight, {
//         toValue: 0,
//         duration: animationDuration,
//         useNativeDriver: true,
//       }).start(() => {
//         setExpanded(!expanded);
//       });
//     } else {
//       setExpanded(!expanded);

//       Animated.timing(animatedHeight, {
//         toValue: 100,
//         duration: animationDuration,
//         useNativeDriver: true,
//       }).start();
//     }
//   };

//   const _setMaxHeight = (event: LayoutChangeEvent) => {
//     if (!maxHeightSet && event.nativeEvent.layout.height > maxHeight) {
//       setMaxHeight(event.nativeEvent.layout.height);
//       setMaxHeightSet(true);
//     }
//   };

//   const height = animatedHeight.interpolate({
//     inputRange: [0, 100],
//     outputRange: [0, 50],
//   });

//   return (
//     <View>
//       <TouchableOpacity
//         style={styles.container}
//         onPress={() => {
//           toggleDropdown();
//         }}
//       >
//         <ArkadText text={props.title} style={styles.title}></ArkadText>
// <AntDesign
//   name={expanded ? "up" : "down"}
//   size={24}
//   color="black"
//   style={styles.icon}
// />
//       </TouchableOpacity>
//       <Animated.View
//         style={[
//           styles.descContainer,
//           { height: maxHeightSet ? height : "auto" },
//         ]}
//         onLayout={(event) => {
//           _setMaxHeight(event);
//         }}
//       >
//         <ArkadText text={props.desc} style={styles.desc}></ArkadText>
//       </Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: "100%",
//     backgroundColor: Colors.arkadOrange,
//     justifyContent: "center",
//     borderBottomColor: Colors.arkadNavy,
//     borderBottomWidth: 2,
//   },
//   title: {
//     padding: 5,
//     fontFamily: "main-font-bold",
//     fontSize: 22,
//   },
//   descContainer: {
//     width: "100%",
//     backgroundColor: Colors.arkadNavy,
//     overflow: "hidden",
//   },
//   desc: {
//     padding: 10,
//     fontFamily: "main-font",
//   },
//   icon: {
//     position: "absolute",
//     right: 10,
//   },
// });

import Colors from "constants/Colors";
import React, { useState } from "react";
import { TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { View } from "components/Themed";
import { ArkadText } from "components/StyledText";
import { AntDesign } from "@expo/vector-icons";

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
        <AntDesign
          name={expanded ? "up" : "down"}
          size={24}
          color="black"
          style={styles.icon}
        />
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
    fontSize: 22,
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
