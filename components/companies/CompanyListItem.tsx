import React from "react";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import Colors from "constants/Colors";

import { PublicCompanyDto } from "api/Companies";
import { ArkadText } from "../StyledText";
import { TagsList } from "./TagsList";

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
        <ArkadText text={company.name} style={styles.companyName} />
        <Image
          source={
            company.logoUrl
              ? { uri: company.logoUrl }
              : require("../../assets/images/adaptive-icon.png")
          }
          style={styles.logo}
        />
      </View>
    </Pressable>
    <TagsList company={company} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: Colors.white,
    paddingTop: 12,
    borderRadius: 16,
    borderWidth: 4,
    borderColor: Colors.arkadOrange,
  },
  row: {
    flex: 1,
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
    flexDirection: "column",
  },
  logo: {
    width: "85%",
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
