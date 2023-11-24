/*

General: 1337

E-Huset vänster: 101

E-Huset höger: 102

Kårhuset: 201

Studiecentrum Nedan: 1

Studiecentrum Ovan: 2

Tält 1: 301

Tält 2: 302

*/

import Colors from "constants/Colors";
import { ScrollView, StyleSheet, View } from "react-native";
import { ArkadText } from "components/StyledText";
import { Ionicons } from "@expo/vector-icons";

export default function VisitorTab() {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <ArkadText text={"Visitors on the Fair"} style={styles.header} />

      <ArkadText text={"Kårhuset"} style={styles.houseText} />
      <View style={styles.centeredView}>
        <ArkadText text={"Current: "} style={styles.peopleText} />
        <Ionicons name="person-outline" size={22} color={Colors.arkadGreen} />
        <ArkadText
          text={"1111"}
          style={
            styles.peopleText && { color: Colors.arkadGreen, marginLeft: 5 }
          }
        />
      </View>
      <View style={styles.centeredView}>
        <ArkadText text={"Total: "} style={styles.peopleText} />
        <Ionicons name="people-outline" size={22} color={Colors.arkadGreen} />
        <ArkadText
          text={"1111"}
          style={
            styles.peopleText && { color: Colors.arkadGreen, marginLeft: 5 }
          }
        />
      </View>

      <ArkadText text={"Studiecentrum"} style={styles.houseText} />
      <Ionicons name="people-outline" size={22} color={Colors.arkadGreen} />

      <ArkadText text={"E-huset"} style={styles.houseText} />
      <Ionicons name="people-outline" size={22} color={Colors.arkadGreen} />

      <ArkadText text={"Tält"} style={styles.houseText} />
      <Ionicons name="people-outline" size={22} color={Colors.arkadGreen} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    backgroundColor: Colors.arkadNavy,
  },
  header: {
    width: "100%",
    textAlign: "center",
    fontSize: 34,
    color: Colors.white,
  },
  houseText: {
    width: "100%",
    textAlign: "center",
    fontSize: 30,
    color: Colors.white,
    marginTop: 30,
  },
  peopleText: {
    textAlign: "center",
    fontSize: 22,
    color: Colors.white,
    marginLeft: 5,
  },
  centeredView: {
    flexDirection: "row", // Make the children arrange horizontally
    alignItems: "center", // Center vertically
  },
});
