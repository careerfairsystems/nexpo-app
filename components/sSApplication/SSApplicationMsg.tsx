import React from "react";
import { Text, Dimensions, StyleSheet, View } from "react-native";

import Colors from "constants/Colors";

const { width } = Dimensions.get("window");

type ApplicationsMsgProps = {
  header: string;
  msg: string;
};

export function CardWithHeader({ header, msg }: ApplicationsMsgProps) {
  return (
    <View style={styles.motivationBox}>
      <View style={styles.headerBox}>
        <Text style={styles.headerText}>{header}</Text>
      </View>
      <View style={styles.msgBox}>
        <Text style={styles.motivationText}>{msg}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  motivationBox: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: width * 0.75,
    borderWidth: 2,
    borderColor: Colors.arkadOrange,
    borderRadius: 10,
    overflow: "hidden",
    margin: 20,
  },
  headerBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.arkadOrange,
  },
  msgBox: {
    backgroundColor: Colors.white,
  },
  headerText: {
    padding: 15,
    fontFamily: "main-font-bold",
    fontSize: 22,
    color: Colors.white,
  },
  motivationText: {
    padding: 10,
    fontFamily: "main-font",
    fontSize: 19,
    color: Colors.arkadNavy,
  },
});
