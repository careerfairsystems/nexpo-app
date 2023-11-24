import React, { useCallback } from "react";
import { View, Text } from "../Themed";
import { Linking, Pressable, StyleSheet } from "react-native";
import Colors from "constants/Colors";
import { Programme, Student } from "api/Students";
import { ArkadButton } from "../Buttons";
import { ArkadText } from "../StyledText";

type StudentProfileProps = {
  volunteer: Student;
};

export default function VolunteerProfile({ volunteer }: StudentProfileProps) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>Programme</Text>
        <Text style={styles.text}>
          {volunteer.programme
            ? `${Programme[volunteer.programme]
                .replace("_", " ")
                .replace("_", " ")
                .replace("_", " ")
                .replace("_", " ")}`
            : "\u2013"}
        </Text>

        <Text style={styles.label}>Year</Text>
        <Text style={styles.text}>
          {volunteer.year ? volunteer.year : "\u2013"}
        </Text>

        <Text style={styles.label}>Master</Text>
        <Text style={styles.text}>
          {volunteer.masterTitle ? volunteer.masterTitle : "\u2013"}
        </Text>

        {volunteer.linkedIn !== "" &&
          volunteer.linkedIn !== null &&
          OpenURLButton(volunteer.linkedIn)}
      </View>
    </>
  );
}
const OpenURLButton = (url: string) => {
  const handlePress = useCallback(async () => {
    await Linking.openURL(url);
  }, [url]);

  return (
    <ArkadButton onPress={handlePress}>
      <ArkadText text={"Open linkedIn profile"} />
    </ArkadButton>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: Colors.arkadNavy,
  },
  label: {
    marginTop: 8,
    fontSize: 20,
    fontFamily: "main-font-bold",
    color: Colors.white,
  },
  text: {
    fontSize: 18,
    fontFamily: "main-font-bold",
    color: Colors.white,
  },
  url: {
    fontFamily: "main-font-bold",
    color: Colors.arkadTurkos,
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
