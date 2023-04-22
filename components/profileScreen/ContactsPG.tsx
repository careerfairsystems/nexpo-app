import React from "react";
import { View, Text } from "../Themed";
import Colors from "constants/Colors";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { ArkadText } from "components/StyledText";
import { API } from "api/API";

async function testapi() {
    console.log("test");
    const test = await API.contacts.contacts();
    console.log(test)
}

export default function Contacts() {
    return (
        <ScrollView style={styles.container}>
            <ArkadText text={"Contacts"} style={styles.header}/>
            <button onClick={testapi}>Click me senpai</button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      display: "flex",
      paddingVertical: 24,
      backgroundColor: Colors.white,
    },
    header: {
        width: "100%",
        textAlign: "center",
        fontSize: 24,
        color: Colors.arkadNavy,
        justifyContent: "center",
      },
  });
  