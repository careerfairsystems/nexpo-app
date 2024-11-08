import { ArkadText } from "components/StyledText";
import Colors from "constants/Colors";
import { StyleSheet, View, Image } from "react-native";
import { HeaderStyles } from "components/HeaderStyles";


type CompanyDetailsHeaderProps = {
    logoUrl?: string | null,
    name?: string | null,
};

export default function CompanyDetailsHeader({logoUrl, name}: CompanyDetailsHeaderProps) {
  
  return (
    <View style={styles.container}>
        <Image source={logoUrl
        ? { uri: logoUrl }
        : require("../../assets/images/icon.png")} 
        style={styles.icon}
        
        />
        <ArkadText text={name ? name : "-"} style={HeaderStyles.headerTitleStyle} numberOfLines={1} ellipsizeMode="tail" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 16,
    flexGrow: 1,
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 5,
    resizeMode: "contain",
    backgroundColor: Colors.white
  },
});
