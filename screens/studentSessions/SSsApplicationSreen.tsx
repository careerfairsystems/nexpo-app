import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, TextInput } from "react-native";

import Colors from "../../constants/Colors";

import { API } from "../../api";
import { } from "../../api/studentsessions";

import { View } from "../../components/Themed";
import ScreenActivityIndicator from "../../components/ScreenActivityIndicator";
import { ArkadButton } from "../../components/Buttons";
import { ArkadText } from "../../components/StyledText";

type SSsApplicationScreenParams = {
  route: {
    params: {
      companyId: number;
      companyName: string;
    };
  };
};

export default function SSsApplicationScreen({
  route,
}: SSsApplicationScreenParams) {
  const { companyId, companyName } = route.params;

  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("hello");

  const sendApplication = async () => {
    setLoading(true);
    await API.studenSessions.sendApplication(companyId, msg);
    alert("Application to " + companyName + " sent");
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
