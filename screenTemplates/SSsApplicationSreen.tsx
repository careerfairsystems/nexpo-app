import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";

import Colors from "../constants/Colors";

import { API } from "../api";
import { } from "../api/studentsessions";

import { View } from "../components/Themed";
import ScreenActivityIndicator from "../components/ScreenActivityIndicator";
import { ArkadButton } from "../components/Buttons";
import { ArkadText } from "../components/StyledText";
import { Role } from "../api/users";

export default function SSsApplicationScreen(companyId: number) {

  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  const sendApplication = async () => {
    setLoading(true);
    await API.sSApplications.sendApplication(companyId, msg);
    const company = await API.companies.getCompany(companyId);
    alert("Application to " + company.name + " sent");
    setLoading(false);
  };

  if (loading) {
    return <ScreenActivityIndicator />;
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <TextInput
          multiline
          style={styles.input}
          onChangeText={setMsg}
          value={msg}
          placeholder={"hejhej jag vill gärna jobba hos er \nhoppas ni vill ha mig <3"}
        />
        <ArkadButton onPress={sendApplication}>
          <ArkadText text="Send application" />
        </ArkadButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
  },
  input: {
    height: 80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
    borderradius: 10,
  },
});
