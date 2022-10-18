import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";

import Colors from "../../../constants/Colors";

import { API } from "../../../api";
import { } from "../../../api/studentsessions";

import { View } from "../../../components/Themed";
import ScreenActivityIndicator from "../../../components/ScreenActivityIndicator";
import { ArkadButton } from "../../../components/Buttons";
import { ArkadText } from "../../../components/StyledText";
import { CardWithHeader } from "../../../components/sSApplication/SSApplicationMsg";

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
          placeholder={"here you can write a motivation to the company: \n \nhejhej jag vill gärna jobba hos er \nhoppas ni vill ha mig <3"}
        />
        <CardWithHeader msg={"The company you send your application to can not only see your message but also your entire profile! \nA good idea is to make sure you have added CV and/or Linkedin-link in your profile to have the best chance at getting approved."} header={"Remember!"} />
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
    width: '85%',
    borderColor: Colors.darkBlue,
    borderWidth: 3,
    color: Colors.darkBlue,
    padding: 10,
    height: 120,
    borderRadius: 7,
    margin: 10,
    fontSize: 13,
    fontFamily: 'montserrat',
    paddingHorizontal: 10
  },
});
