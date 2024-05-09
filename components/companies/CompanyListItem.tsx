import React from "react";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import Colors from "constants/Colors";

import { Locations, PublicCompanyDto } from "api/Companies";
import { ArkadText } from "../StyledText";
import { TagsList } from "./TagsList";
import { companyLocations } from "components/companies/CompanyLocationsMap";

type CompanyListItemProps = {
  company: PublicCompanyDto;
  onPress: () => void;
};

export const CompanyListItem = ({ company, onPress }: CompanyListItemProps) => (
  <View
    style={company.name === "Accenture" ? styles.accenture : styles.container}
  >
    <Pressable onPress={onPress}>
      <View style={styles.row}>
      <Image
          source={
            company.logoUrl
              ? { uri: company.logoUrl }
              : require("../../assets/images/icon.png") //ADAPTIVE?
          }
          style={styles.logo}

        />
        <View style={styles.column} >
          <ArkadText text={company.name} style={styles.companyName} />
          <ArkadText style={styles.companyLocation} text={(
                Locations[companyLocations[company.id]] ?? "No data"
              ).replace("_", "-")}
          />
        </View>
      </View>
    </Pressable>
    <TagsList company={company} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: Colors.white,
    padding: 8,
    paddingTop: 12,
    borderRadius: 16,
  },
  row: {
    flex: 1,
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
    flexDirection: "row",
  },
  column: {
    flex: 1,
    justifyContent: "center", //Centered vertically
    alignItems: "center", //Centered horizontally
    flexDirection: "column",
  },
  logo: {
    width: 64, //chansning
    height: Dimensions.get("window").height * 0.16,
    resizeMode: "contain",
  },
  companyName: {
    flex: 1,
    fontSize: 24,
    textAlign: "left",
    padding: 0,
    marginHorizontal: 4,
    color: Colors.arkadNavy,
  },
  companyLocation: {
    flex: 1,
    fontSize: 8,
    textAlign: "left",
    padding: 0,
    color: Colors.lightGray
  },
  accenture: {
    flex: 1,
    justifyContent: "flex-start",
    width: "90%",
    alignSelf: "center",
    marginTop: 0,
    marginHorizontal: 10,
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 10,
    borderColor: Colors.accenture,
  },
});
