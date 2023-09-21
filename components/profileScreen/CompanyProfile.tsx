import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Company } from "api/Companies";
import { View, Text } from "../Themed";
import { Linking, StyleSheet } from "react-native";
import Colors from "constants/Colors";
import { Image } from "react-native";
import { ArkadText } from "../StyledText";

type CompanyProfileProps = {
  company: Company;
};

function showDays(days : string[]){
  return(
    <View>
      {days.sort().map((day) => <Text key={day} style={styles.daysText}>{day.slice(0, day.indexOf('T'))}</Text>)}
    </View>
  );
}

export default function CompanyProfile({ company }: CompanyProfileProps) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={
              company.logoUrl
                ? { uri: company.logoUrl }
                : require("../../assets/images/icon.png")
            }
            defaultSource={require("../../assets/images/icon.png")}
            style={styles.logo}
          />
        </View>

        <Text style={styles.nameLabel}>{company.name}</Text>

        <View style={styles.contactInfoContainer}>
          <Ionicons name="link" size={16} color={Colors.arkadNavy} />
          <Text
            style={styles.contactInfoText}
            onPress={() => {
              if (company.website) {
                Linking.openURL(company.website);
              }
            }}
          >
            {company.website ? company.website : "\u2013"}
          </Text>
        </View>

        <ArkadText text="About us" style={styles.header} />
        <Text style={styles.contactInfoText}>
          {company.description ? company.description : "\u2013"}
        </Text>

        <ArkadText text="Host Name" style={styles.header} />
        <Text style={styles.contactInfoText}>
          {company.hostName ? company.hostName : "\u2013"}
        </Text>
        <ArkadText text="Host Email" style={styles.header} />
        <Text
          style={styles.contactInfoText}
          onPress={() => {
            if (company.hostEmail) {
              Linking.openURL(`mailto:${company.hostEmail}`);
            }
          }}
        >
          {company.hostEmail ? company.hostEmail : "\u2013"}
        </Text>
        
        <ArkadText text="Host Phone" style={styles.header} />
        <Text
          style={styles.contactInfoText}
          onPress={() => {
            if (company.hostPhone) {
              Linking.openURL(`tel:${company.hostPhone}`);
            }
          }}
        >
          {company.hostPhone ? company.hostPhone : "\u2013"}
        </Text>

        <ArkadText text="Days at ARKAD" style={styles.header} />
        <Text
          style={styles.contactInfoText}
        >
          {company.daysAtArkad.length !== 0 ? showDays(company.daysAtArkad) : "\u2013"}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    marginTop: 24,
  },
  logoContainer: {
    height: 120,
    width: "100%",
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  nameLabel: {
    paddingTop: 8,
    paddingBottom: 16,
    fontSize: 32,
    fontFamily: "main-font-bold",
    color: Colors.white,
  },
  contactInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 4,
  },
  contactInfoText: {
    fontSize: 18,
    paddingLeft: 8,
    fontFamily: "main-font-bold",
    color: Colors.white,
  },
  header: {
    fontFamily: "main-font-bold",
    color: Colors.white,
    fontSize: 22,
    marginTop: 12,
    marginBottom: 4,
  },
  daysText: {
    fontSize: 17,
    padding: 1,
    margin: 1,
    fontFamily: "main-font-bold",
    color: Colors.white,
  },
});
