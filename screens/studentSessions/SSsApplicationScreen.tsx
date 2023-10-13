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
import { getMe, User } from "api/Users";

type SSsApplicationScreenParams = {
  companyId: number;
};

export default function SSsApplicationScreen({
  companyId,
}: SSsApplicationScreenParams) {
  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [company, setCompany] = useState<PublicCompanyDto | null>(null);
  const [user, setUser] = React.useState<User | null>(null);

  const sendApplication = async () => {
    if (!user?.hasCv) {
      Toast.show({
        type: "error",
        text1: "You must add a CV to your profile to apply for a session",
        visibilityTime: 5000,
      });
    } else {
      setLoading(true);
      await API.applications.sendApplication(companyId, msg);
      Toast.show({
        type: "success",
        text1: "Application to " + company?.name + " sent",
        visibilityTime: 5000,
      });
      setLoading(false);
    }
  };
  const getCompany = async () => {
    const company = await API.companies.getCompany(companyId);
    setCompany(company);
  };

  const getUser = async () => {
    const usr = await getMe();
    setUser(usr);
  };

  useEffect(() => {
    setLoading(true);
    getCompany();
    getUser();
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
          text="Recommended: Motivation for the company:"
          style={styles.smallHeader}
        />
        <TextInput
          multiline
          style={[styles.input, msg ? styles.inputText : null]}
          onChangeText={setMsg}
          value={msg}
          placeholder={
            "Hey! \nMy name is X and I'm curious about your Y position. \nCurrently I'm studying Z which I believe would be useful because of W. \nI have previous experience in H, from projects such as M,B,J."
          }
        />
        <CardWithHeader
          msg={
            "Your complete profile, including your CV, will be thoroughly reviewed by the company. To enhance your application, it is mandatory to upload your CV to your profile to apply for a session. Additionally, you may include a LinkedIn profile link for a more comprehensive evaluation.\n\n" +
            "Upon successful acceptance, you will be notified via email with instructions to proceed with booking your session."
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
    padding: 10,
    height: 180,
    borderRadius: 7,
    margin: 10,
    fontSize: 18,
    fontFamily: "main-font-bold",
    paddingHorizontal: 10,
    color: "#A9A9AC", // Gray text color
  },
  inputText: {
    color: "black", // Black text color when input is not empty
  },
});
