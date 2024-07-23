import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ArkadText } from "components/StyledText";
import { Locations, PublicCompanyDto } from "api/Companies";
import { API } from "api/API";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import ScreenActivityIndicator from "components/ScreenActivityIndicator";
import Colors from "constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { companyLocations } from "components/companies/CompanyLocationsMap";
import { EMap, TentMap, SCMap, KarhusetMap } from "components/maps/MapProps";
import { IconLinkButton } from "components/companies/IconLinkButton";
import { ShowOptions, TagsList } from "components/companies/TagsList";

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

  const greenZone = true;

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

  console.log(company.description)

  return (
    <View style={styles.outerContainer}>
      <ScrollView>
        <View style={styles.colorBackgroundContainer} >
          {/* <View style={greenZone ? styles.colorBackgroundGreenZone : styles.colorBackgroundRegular} /> */}
        </View>
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

          <View style={styles.titleContainer} >
            <ArkadText style={styles.title} text={company?.name} />
            {greenZone && <Image source={require("../../assets/images/leaf-icon.png")} style={styles.greenZoneIcon}/>}
          </View>

          <TouchableOpacity 
            style={styles.companyLocationContainer}
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
            <Image source={require("../../assets/images/location_pin_white.png")} style={styles.locationPin} />
            <ArkadText style={styles.companyLocationText} text={(
                Locations[companyLocations[company.id]] ?? "No data"
              ).replace("_", "-")}
            />
          </TouchableOpacity>

          <View style={styles.actionsContainer}>
            <IconLinkButton icon={require("../../assets/images/linked-in-icon.png")} url={null} text="LinkedIn" style={{backgroundColor: Colors.white}} />
            <IconLinkButton icon={require("../../assets/images/globe-icon.png")} url={company.website} text="Website" style={greenZone ? {backgroundColor: Colors.arkadGreen} : {backgroundColor: Colors.arkadTurkos}} />
          </View>


          <View style={styles.infoContainer}>
            <ArkadText style={styles.descHeader} text={"ABOUT US"} />
            <ArkadText style={styles.desc} text={company.description ? company.description : "\u2013"} />

            <ArkadText style={styles.descHeader} text="WHAT WE OFFER" />
            <TagsList company={company} showOptions={ShowOptions.Positions} />

            <ArkadText style={styles.descHeader} text="TAGS" />
            <TagsList company={company} showOptions={ShowOptions.Industries} />

            <ArkadText style={styles.descHeader} text="DID YOU KNOW?" />
            <ArkadText style={styles.desc} text={company.didYouKnow ? company.didYouKnow : "\u2013"} />
          </View>

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
  colorBackgroundContainer: {
    width: "100%",
    height: 166,
    
    zIndex: 0,
    elevation: 0,
    position: "absolute"
  },
  colorBackgroundRegular: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: Colors.arkadTurkos,
  },
  colorBackgroundGreenZone: {
    width: 357,
    height: 357,
    borderRadius: 178.5,
    transform: [
      {scaleX: 2}
    ],
    backgroundColor: Colors.arkadGreen,
  },
  container: {
    display: "flex",
    flex: 1,
    padding: "8%",
    alignItems: "center",
    marginTop: -45,
    zIndex: 100,
    elevation: 100,
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
    zIndex: 1000,
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 7,
    alignItems: "baseline",
  },
  title: {
    marginTop: 11,
    paddingBottom: 8,
    fontSize: 34,
    fontFamily: "main-font-bold",
    color: Colors.white,
    letterSpacing: 0.4,
  },
  greenZoneIcon: {
    width: 16,
    height: 16,
  },
  companyLocationContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  locationPin: {
    width: 24,
    height: 24,
  },
  companyLocationText: {
    flex: 1,
    fontSize: 17,
    margin: 0,
    fontWeight: "600",
    textAlign: "left",
    lineHeight: 22,
    color: Colors.lightGray,
    letterSpacing: -0.43
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 13,
  },
  infoContainer: {
    flexDirection: "column",
    alignItems: "flex-start"
  },
  descHeader: {
    marginTop: 16,
    marginBottom: 6,
    alignSelf: "flex-start",
    fontSize: 20,
    color: Colors.white,
    fontStyle: "normal",
    lineHeight: 25,
    fontWeight: "700",
    letterSpacing: -0.45,
  },
  desc: {
    fontSize: 17,
    color: Colors.white,
    alignSelf: "flex-start",
    textAlign: "left",
    fontWeight: "400",
    lineHeight: 25,
    letterSpacing: -0.43,
  },
});
