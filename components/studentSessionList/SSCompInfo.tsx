import { StyleSheet, Image } from "react-native";

import { Text, View } from "../Themed";

import { PublicCompanyDto } from "api/Companies";
import Colors from "constants/Colors";
import { ArkadText } from "components/StyledText";

type CompanyDetailsScreenProps = {
  company: PublicCompanyDto;
};

export default function SSCompInfo({ company }: CompanyDetailsScreenProps) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.logoOuterContainer}>
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
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{company?.name}</Text>
        <ArkadText style={styles.descHeader} text={"ABOUT US"} />
        <ArkadText style={styles.desc} text={company.description ? company.description : "\u2013"} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.arkadTurkos,
  },
  logoOuterContainer: {
    marginTop: 8,
    marginBottom: -28,
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
  hardShadow: {
    height: 128,
    width: 136,
    borderRadius: 15,
    position: "absolute",
    backgroundColor: "#000000",
  },
  infoContainer: {
    marginTop: 30,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  descHeader: {
    paddingHorizontal: 15,
    marginTop: 16,
    marginBottom: 6,
    alignSelf: "center",
    fontSize: 20,
    color: Colors.white,
    fontStyle: "normal",
    lineHeight: 25,
    fontWeight: "700",
    letterSpacing: -0.45,
    textAlign: "left", // Align text to the left
    width: "100%", // Ensure it uses full width
  },
  desc: {
    padding: 15,
    fontSize: 17,
    color: Colors.white,
    alignSelf: "center",
    textAlign: "left",
    fontWeight: "400",
    lineHeight: 25,
    letterSpacing: -0.43,
  },
});
