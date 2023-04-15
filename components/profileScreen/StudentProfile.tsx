import React, { useCallback } from "react";
import { View, Text } from "../Themed";
import { Linking, Pressable, StyleSheet } from "react-native";
import Colors from "constants/Colors";
import { Programme, Student } from "api/Students";
import { ArkadButton } from "../Buttons";
import { ArkadText } from "../StyledText";

type StudentProfileProps = {
  student: Student;
};

export default function StudentProfile({ student }: StudentProfileProps) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>Programme</Text>
        <Text style={styles.text}>
          {student.programme
            ? `${Programme[student.programme]
                .replace("_", " ")
                .replace("_", " ")
                .replace("_", " ")
                .replace("_", " ")}`
            : "\u2013"}
        </Text>

        <Text style={styles.label}>Year</Text>
        <Text style={styles.text}>{student.year ? student.year : "\u2013"}</Text>

        <Text style={styles.label}>Master</Text>
        <Text style={styles.text}>{student.masterTitle ? student.masterTitle : "\u2013"}</Text>

        {student.linkedIn !== "" && student.linkedIn !== null && OpenURLButton(student.linkedIn)}
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
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: "main-font-bold",
    color: Colors.arkadNavy,
  },
  text: {
    fontFamily: "main-font-bold",
    color: Colors.arkadNavy,
  },
  url: {
    fontFamily: "main-font-bold",
    color: Colors.arkadTurkos,
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
