import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";

import Colors from "../../../constants/Colors";

import { API } from "../../../api";
import { } from "../../../api/studentsessions";

import { View } from "../../../components/Themed";
import ScreenActivityIndicator from "../../../components/ScreenActivityIndicator";
import { ArkadButton } from "../../../components/Buttons";
import { ArkadText } from "../../../components/StyledText";
import { CardWithHeader } from "../../../components/sSApplication/SSApplicationMsg";
import { PublicCompanyDto } from "../../../api/companies";

type SSsApplicationScreenParams = {
  companyId: number;
};

export default function SSsApplicationScreen({companyId} : SSsApplicationScreenParams) {

  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [company, setCompany] = useState<PublicCompanyDto | null>(null);

  const sendApplication = async () => {
    if(msg === "") {
      alert("Message cannot be empty");
    } else {
      setLoading(true);
      await API.sSApplications.sendApplication(companyId, msg);
      alert("Application to " + company?.name + " sent");
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
        {company?.studentSessionMotivation && <>
        <ArkadText style={styles.header} text={`from ${company.name}:`}/>
        <ArkadText style={styles.companyMotivation} text={company.studentSessionMotivation}/>
        </>}
        <TextInput
          multiline
          style={styles.input}
          onChangeText={setMsg}
          value={msg}
          placeholder={"here you can write a motivation to the company: \n \nhejhej jag vill gärna jobba hos er \nhoppas ni vill ha mig <3"}
        />
        <CardWithHeader msg={'The company you send your application to can not only see your message but also your entire profile!' +
         '\n \nA good idea is to make sure you have added CV and/or Linkedin-link in your profile to have the best chance at getting approved.' +
         '\n \nWhen accepted, you will receive an e-mail telling you to book a session.'
         } header={"Remember!"} />
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
    color: Colors.darkBlue,
  },
  companyMotivation: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: Colors.darkBlue,
    fontFamily: "main-font"
  },
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
    textAlign: 'left',
    textAlignVertical: 'top',
    borderColor: Colors.darkBlue,
    borderWidth: 3,
    color: Colors.darkBlue,
    padding: 10,
    height: 120,
    borderRadius: 7,
    margin: 10,
    fontSize: 18,
    fontFamily: 'main-font-bold',
    paddingHorizontal: 10
  },
});
