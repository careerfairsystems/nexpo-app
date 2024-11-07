import Colors from "constants/Colors"
import { StyleSheet } from "react-native"

export const profileInputStyles = StyleSheet.create({
    textInput: {
        width: "100%",
        maxWidth: 400,
        borderColor: Colors.white,
        color: Colors.white,
        placeholderTextColor: "#404040",
    },
    inputLabel: {
        color: Colors.white,
        paddingTop: 5,
        fontFamily: "main-font",
        fontSize: 20,
        width: "80%",
        maxWidth: 400,
        textAlign: "left",
    },
    dropdownContainer: {
        maxWidth: 400,
        width: "80%",
        paddingVertical: 12,
    },
})


// picker: {
//     width: "80%",
//     maxWidth: 400,
//     padding: 10,
//     borderRadius: 7,
//     borderWidth: 5,
//     borderColor: Colors.white,
//     margin: 12,
//     backgroundColor: Colors.arkadNavy,
//     color: Colors.white,
//   },
//   programmepicker: {
//     width: "80%",
//     maxWidth: 433,
//     padding: 10,
//     borderColor: Colors.white,
//     margin: 12,
//     backgroundColor: Colors.arkadNavy,
//     color: Colors.white,
//     fontFamily: "main-font-bold",
//     borderRadius: 7,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     fontSize: 18,
//   },