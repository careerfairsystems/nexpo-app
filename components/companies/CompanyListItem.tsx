import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Colors from "constants/Colors";

import { Locations, PublicCompanyDto } from "api/Companies";
import { ArkadText } from "../StyledText";
import { companyLocations } from "components/companies/CompanyLocationsMap";
import { color } from "react-native-reanimated";

type CompanyListItemProps = {
  company: PublicCompanyDto;
  onPress: () => void;
};


export const CompanyListItem = ({ company, onPress }: CompanyListItemProps) => (
  <View
    style={styles.container}
  >
    <Pressable onPress={onPress} style={{width: "100%"}}>
      <View style={styles.container}>
        <View style={styles.companyContainer} >
          <Image
              source={
                company.logoUrl
                  ? { uri: company.logoUrl }
                  : require("../../assets/images/icon.png") //ADAPTIVE?
              }
              style={styles.logo}

            />
            <View style={styles.companyInfo} >
              <ArkadText text={company.name} style={styles.companyName} ellipsizeMode="tail" numberOfLines={1} />

              <View style={styles.companyLocationContainer}>
                <Image source={require("../../assets/images/location_pin_white.png")} style={styles.locationPin} /> 

                <ArkadText style={styles.companyLocationText} text={(
                      Locations[companyLocations[company.id]] ?? "No data"
                    ).replace("_", "-")}
                />
              </View>
            </View>
        </View>
      </View>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    overflow: "hidden",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 8,
    marginHorizontal: 10,
  },
  column: {
    flex: 1,
    justifyContent: "center", //Centered vertically
    alignItems: "center", //Centered horizontally
    flexDirection: "column",
  },
  companyContainer: {
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
    flexDirection: "row",
    gap: 8,
    flex: 1,
  },
  logo: {
    width: 64,
    height: 64,
    resizeMode: "contain",
    backgroundColor: Colors.white,
    borderRadius: 15,
  },
  companyInfo: {
    marginLeft: 8,
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  companyName: {
    flex: 1,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "left",
    padding: 0,
    margin: 0,
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
    fontSize: 14,
    margin: 0,
    fontWeight: "400",
    textAlign: "left",
    lineHeight: 22,
    color: Colors.lightGray
  },
});
