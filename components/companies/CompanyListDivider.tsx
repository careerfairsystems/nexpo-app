import { ArkadText } from "components/StyledText"
import { View } from "components/Themed"
import Colors from "constants/Colors";
import { Platform, StyleSheet, TextStyle, Text, ViewStyle } from "react-native";


type CompanyListDivider = {
    text: string,
    style?: ViewStyle,
}

export default function CompanyListDivider({text, style}: CompanyListDivider) {

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.text}>{text}</Text>
            <View style={styles.line}/>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.arkadNavy,
        paddingTop: 8,
        flexDirection: "row",
        flex: 1,
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
    },
    text: {
        fontSize: 17,
        color: Colors.white,
        height: 22,
    },
    line: {
        height: 1,
        backgroundColor: Colors.white,
        flex: 1,
    },
});
