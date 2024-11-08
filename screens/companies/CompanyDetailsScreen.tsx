import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ArkadText } from "components/StyledText";
import { Locations, PublicCompanyDto } from "api/Companies";
import { API } from "api/API";
import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Image, StyleSheet, View } from "react-native";
import ScreenActivityIndicator from "components/ScreenActivityIndicator";
import Colors from "constants/Colors";
import { companyLocations } from "components/companies/CompanyLocationsMap";
import { EMap, TentMap, SCMap, KarhusetMap } from "components/maps/MapProps";
import { IconLinkButton } from "components/companies/IconLinkButton";
import { ShowOptions, TagsList } from "components/companies/TagsList";
import CompanyDetailsHeader from "components/companies/CompanyDetailsHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const insets = useSafeAreaInsets();

  const [company, setCompany] = useState<PublicCompanyDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
  const [contentHeight, setContentHeight] = useState(0);

  const yOffset = useRef(new Animated.Value(0)).current;
  const headerOpacity = (contentHeight > screenHeight + 145)
  ? yOffset.interpolate({
      inputRange: [130, 145],
      outputRange: [0, 1],
      extrapolate: "clamp",
    })
  : 0;
  

  const greenZone = false;

  const getCompany = async () => {
    setLoading(true);

    const company = await API.companies.getCompany(id);
    console.log(company)
    setCompany(company);
    console.log(company);

    setLoading(false);
  };

  useEffect(() => {
    getCompany();
  }, []);


  const navigation = useNavigation();


  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Colors.arkadTurkos,
      },
      headerBackground: () => (
        <Animated.View
          style={{
            backgroundColor: Colors.arkadNavy,
            ...StyleSheet.absoluteFillObject,
            opacity: headerOpacity,
          }}
        />
      ),
      headerTitle: () => (
        <Animated.View
          style={{opacity: headerOpacity}}
        >
          <CompanyDetailsHeader logoUrl={company?.logoUrl} name={company?.name}/>
        </Animated.View>
      ),
      headerTitleStyle: {
        opacity: headerOpacity,
      },
      headerTransparent: true,
    });
  }, [headerOpacity, navigation, company]);

  if (loading || company == null) {
    return <ScreenActivityIndicator />;
  }


  return (

      <Animated.ScrollView
        style={[styles.outerContainer, {paddingTop: insets.top}]}
        onContentSizeChange={(width, height) => {setContentHeight(height); setScreenHeight(Dimensions.get('window').height)}}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: yOffset,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false} //Weird behavior with scrollbar on ios, disabled for now
      >
        <View style={styles.colorBackgroundContainer} >
          <View style={greenZone ? styles.colorBackgroundGreenZone : styles.colorBackgroundRegular} />
        </View>
        <View style={styles.container}>
          <View style={styles.logoOuterContainer} >
            <View style={styles.hardShadow} />
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

            <ArkadText style={styles.descHeader} text="DESIRED PROGRAMMES" />
            <TagsList company={company} showOptions={ShowOptions.DesiredProgrammes} />

            <ArkadText style={styles.descHeader} text="DESIRED COMPETENCES" />
            <TagsList company={company} showOptions={ShowOptions.DesiredCompetences} />


            <ArkadText style={styles.descHeader} text="DID YOU KNOW?" />
            <ArkadText style={styles.desc} text={company.didYouKnow ? company.didYouKnow : "\u2013"} />
          </View>

        </View>
      </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.arkadNavy,
  },
  colorBackgroundContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    height: 104,
    zIndex: 0,
    elevation: 0,
    position: "absolute"
  },
  colorBackgroundRegular: {
    width: "100%",
    height: "300%", //Oversized to compensate if safeAreaInset top padding, could probably be better implemented but time crunch hehe
    backgroundColor: Colors.arkadTurkos,
  },
  colorBackgroundGreenZone: {
    width: "90%",
    height: Dimensions.get("screen").width * 0.9,
    minHeight: 104 * 2,
    borderRadius: Dimensions.get("screen").width,
    transform: [
      {scaleX: 2}
    ],
    backgroundColor: Colors.arkadGreen,
  },
  container: {
    display: "flex",
    justifyContent: "flex-start",
    flex: 1,
    alignItems: "center",
    paddingHorizontal: "8%",
    paddingBottom: 16,
    marginTop: 15,
    zIndex: 100,
    elevation: 100,
  },
  logoOuterContainer: {
    height: 128,
    width: 128,
  },
  logoContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  logo: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    margin: 10,
    resizeMode: "contain",
  },
  hardShadow: {
    height: 128,
    width: 136,
    borderRadius: 15,
    position: "absolute",
    backgroundColor: "#000000",
    
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
    width: "100%",
    marginTop: 13,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  infoContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
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
