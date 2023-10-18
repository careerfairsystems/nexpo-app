import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Linking } from "react-native";

import { Text, View } from "components/Themed";

import { Locations, PublicCompanyDto } from "api/Companies";
import { API } from "api/API";
import ScreenActivityIndicator from "components/ScreenActivityIndicator";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ArkadText } from "components/StyledText";
import { companyLocations } from "components/companies/CompanyLocationsMap";

type CompanyDetailsScreenParams = {
  route: {
    params: {
      id: number;
    };
  };
};

export default function CompanyDetailsScreen({
  route,
}: CompanyDetailsScreenParams) {
  const { id } = route.params;

  const [company, setCompany] = useState<PublicCompanyDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getCompany = async () => {
    setLoading(true);

    const company = await API.companies.getCompany(id);
    setCompany(company);

    setLoading(false);
  };

  useEffect(() => {
    getCompany();
  }, []);

  if (loading || company == null) {
    return <ScreenActivityIndicator />;
  }

  return (
    <View style={styles.outerContainer}>
      <ScrollView>
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

          <Text style={styles.title}>{company?.name}</Text>

          <View style={styles.contactInfoContainer}>
            <Ionicons name="link" size={16} color={Colors.white} />
            <Text
              style={styles.linkText}
              onPress={() => {
                if (company.website) {
                  Linking.openURL(company.website);
                }
              }}
            >
              {company.website
                ? company.website.replace(/^https?:\/\//, "")
                : "No website available"}
            </Text>
          </View>
          <View style={styles.contactInfoContainer}>
            <Ionicons name="map" size={18} color="white" />
            <ArkadText
              text={(
                Locations[companyLocations[company.id]] ?? "No data"
              ).replace("_", " ")}
              style={styles.contactInfoText}
            />
          </View>

          <Text style={styles.descHeader}>About us</Text>
          <Text style={styles.desc}>
            {company.description ? company.description : "\u2013"}
          </Text>
          <Text style={styles.descHeader}>Did you know?</Text>
          <Text style={styles.desc}>
            {company.didYouKnow ? company.didYouKnow : "\u2013"}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: Colors.arkadNavy,
  },
  container: {
    display: "flex",
    flex: 1,
    padding: "8%",
    alignItems: "center",
    backgroundColor: Colors.arkadNavy,
  },
  logoContainer: {
    paddingTop: 20,
    height: 120,
    width: "90%",
    backgroundColor: Colors.white,
    borderColor: Colors.arkadOrange,
    borderWidth: 4,
    borderRadius: 10,
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  title: {
    marginTop: 24,
    paddingBottom: 8,
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
  linkText: {
    fontSize: 18,
    paddingLeft: 8,
    fontFamily: "main-font-bold",
    color: Colors.arkadTurkos,
    textDecorationLine: "underline",
  },
  descHeader: {
    alignSelf: "center",
    textDecorationLine: "underline",
    paddingTop: 16,
    fontSize: 18,
    fontFamily: "main-font-bold",
    color: Colors.arkadTurkos,
  },
  desc: {
    paddingTop: 6,
    fontSize: 16,
    fontFamily: "secondary-font",
    color: Colors.white,
  },
});
