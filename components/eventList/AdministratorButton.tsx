import { Text, View } from "components/Themed";
import { ArkadButton } from "../../components/Buttons";
import { StyleSheet } from "react-native";
import Colors from "constants/Colors";

type AdministratorButtonProps = {
    QRMode: boolean;
    switchQRMode: () => void;
  };

export function AdministratorButton(props: AdministratorButtonProps) {
    return (
        <View style={styles.eventBox}>
            <ArkadButton style={styles.button} onPress={props.switchQRMode}>
            <Text style={styles.text}>
                {props.QRMode ? "QR Mode" : "Apply event mode"}
            </Text>
            </ArkadButton>
        </View>
    )
}

const styles = StyleSheet.create({
    eventBox: {
        alignItems: "center",
        backgroundColor: Colors.arkadNavy,
      },
      button: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 12,
        margin: 8,
      },
      greenBack: {
        backgroundColor: Colors.lightGreen,
      },
      text: {
        fontFamily: "main-font-bold",
        fontSize: 20,
        color: Colors.white,
      },
});