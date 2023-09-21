import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";

import Colors from "constants/Colors";

import { API } from "api/API";
import {} from "api/StudentSessions";

import { View } from "components/Themed";
import ScreenActivityIndicator from "components/ScreenActivityIndicator";
import { ArkadButton } from "components/Buttons";
import { ArkadText } from "components/StyledText";
import { CardWithHeader } from "components/sSApplication/SSApplicationMsg";
import { PublicCompanyDto } from "api/Companies";
import Toast from "react-native-toast-message";

type SSsApplicationScreenParams = {
  companyId: number;
};

export default function SSsApplicationScreen({
  companyId,
}: SSsApplicationScreenParams) {
  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [company, setCompany] = useState<PublicCompanyDto | null>(null);

  const sendApplication = async () => {
    if (msg === "") {
      Toast.show({
        type: "error",
        text1: "Message cannot be empty",
        visibilityTime: 2000,
      });
    } else {
      setLoading(true);
      await API.applications.sendApplication(companyId, msg);
      Toast.show({
        type: "success",
        text1: "Application to " + company?.name + " sent",
        visibilityTime: 2500,
      });
      setLoading(false);
    }
  };
  const getCompany = async () => {
    const company = await API.companies.getCompany(companyId);
    setCompany(company);
  };
  useEffect(() => {
    setLoading(true);
    getCompany();
    setLoading(false);
  }, []);

  if (loading) {
    return <ScreenActivityIndicator />;
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {company?.studentSessionMotivation && (
          <>
            <ArkadText style={styles.header} text={`from ${company.name}:`} />
            <ArkadText
              style={styles.companyMotivation}
              text={company.studentSessionMotivation}
            />
          </>
        )}
        <ArkadText
          text="Motivation for the company:"
          style={styles.smallHeader}
        />
        <TextInput
          multiline
          style={styles.input}
          onChangeText={setMsg}
          value={msg}
          placeholder={
            "Hey! \nMy name is X and I'm curious about your Y position. \nCurrently I'm studying Z which I believe would be useful because of W. \nI have previous experience in H, from projects such as M,B,J."
          }
        />
        <CardWithHeader
          msg={
            "The company will see your entire profile! Make sure to add CV and/or Linkedin-link in your profile for better chances of getting approved!" +
            "\n \nWhen accepted, you will receive an e-mail telling you to book a session."
          }
          header={"Remember!"}
        />
        <ArkadButton onPress={sendApplication}>
          <ArkadText text="Send application" />
        </ArkadButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    marginBottom: 0,
    color: Colors.arkadNavy,
  },
  smallHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
  },
  companyMotivation: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: Colors.white,
    fontFamily: "main-font",
  },
  scrollView: {
    backgroundColor: Colors.arkadNavy,
  },
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  input: {
    textAlign: "left",
    textAlignVertical: "top",
    borderColor: Colors.arkadOrange,
    backgroundColor: Colors.white,
    borderWidth: 3,
    color: Colors.arkadNavy,
    padding: 10,
    height: 180,
    borderRadius: 7,
    margin: 10,
    fontSize: 18,
    fontFamily: "main-font-bold",
    paddingHorizontal: 10,
  },
});
