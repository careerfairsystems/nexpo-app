import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { ArkadText } from "components/StyledText";
import { Locations, PublicCompanyDto } from "api/Companies";
import { API } from "api/API";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ScreenActivityIndicator from "components/ScreenActivityIndicator";
import Colors from "constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { companyLocations } from "components/companies/CompanyLocationsMap";
import { EMap, TentMap, SCMap, KarhusetMap } from "components/maps/MapProps";
import { ArkadButton } from "components/Buttons";
import { IconLinkButton } from "components/companies/IconLinkButton";

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

  const navigation = useNavigation();

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

          <View style={styles.companyLocationContainer}>
                <Image source={require("../../assets/images/location_pin_white.png")} style={styles.locationPin} /> 

                <ArkadText style={styles.companyLocationText} text={(
                      Locations[companyLocations[company.id]] ?? "No data"
                    ).replace("_", "-")}
            />
          </View>

          {/* <View style={styles.contactInfoContainer}>
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
          </View> */}

          <View style={styles.actionsContainer}>
            <IconLinkButton icon={require("../../assets/images/linked-in-icon.png")} url={null} text="LinkedIn" style={{backgroundColor: Colors.white}} />
            <IconLinkButton icon={require("../../assets/images/globe-icon.png")} url={company.website} text="Website" style={{backgroundColor: Colors.arkadTurkos}} />
          </View>

          {/* <TouchableOpacity
            style={styles.contactInfoContainer}
            onPress={() => {
              const position = Locations[companyLocations[company.id]]
                ? Locations[companyLocations[company.id]].replace("_", "-")
                : undefined;
              if (position) {
                const map_list = [EMap, KarhusetMap, SCMap, TentMap];
                const position_map = map_list.find((m) =>
                  m.name.includes(position)
                );
                navigation.navigate("Maps", {
                  screen: "ZoomMapScreen",
                  params: { map: position_map },
                });
              } else {
                navigation.navigate("Maps", { screen: "MapScreen" });
              }
            }}
          >
            <Ionicons name="map" size={18} color="white" />
            <ArkadText
              text={(
                Locations[companyLocations[company.id]] ?? "No data"
              ).replace("_", "-")}
              style={styles.contactInfoText}
            />
          </TouchableOpacity> */}

          <Text style={styles.descHeader}>ABOUT US</Text>
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
    paddingTop: 10,
    height: 128,
    width: 128,
    backgroundColor: Colors.white,
    borderRadius: 15,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  title: {
    marginTop: 24,
    paddingBottom: 8,
    fontSize: 34,
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
    textDecorationLine: "underline",
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
  companyLocationContainer: {
    alignItems: "baseline",
    flexDirection: "row",
    gap: 4,
  },
  locationPin: {
    width: 16,
    height: 16,
  },
  companyLocationText: {
    flex: 1,
    fontSize: 17,
    margin: 0,
    fontWeight: "400",
    textAlign: "left",
    lineHeight: 22,
    color: Colors.lightGray
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 8,
  }
});
