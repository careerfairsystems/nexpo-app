import { ArkadText } from "components/StyledText"
import { View } from "components/Themed"
import Colors from "constants/Colors";
import { StyleSheet } from "react-native";


type CompanyListDivider = {
    text: string
}

export default function CompanyListDivider({text}: CompanyListDivider) {

    return (
        <View style={styles.container}>
            <ArkadText text={text} style={styles.text}/>
            <View style={styles.line}/>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        marginTop: 8,
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
    },
    line: {
        height: 1,
        backgroundColor: Colors.white,
        flex: 1,
    },
});
