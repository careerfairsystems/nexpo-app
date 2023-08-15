import { Ionicons } from "@expo/vector-icons";
import { Pressable, View, StyleSheet, TextStyle } from "react-native";
import { ArkadText } from "./StyledText";
import Colors from "constants/Colors";


type CheckboxProps = {
  checked: boolean; 
  onChange: () => void;
  text: string;
  style?: TextStyle;
};

export function ArkadCheckbox ({checked, onChange, text}: CheckboxProps) {
    return (
      <Pressable onPress={onChange} style={styles.checkboxContainer}>
          <View style={[styles.checkboxBase, checked && styles.checkboxChecked]}>
              {checked && <Ionicons name="checkmark" size={30} style={styles.checkmark} />}
          </View>
          <ArkadText style={styles.checkboxText} text={text} />
      </Pressable>
    );
}


const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.white,
    backgroundColor: "transparent",
    marginLeft: 12,
    marginTop: 5,
    padding: 12,
  },
  checkboxText: {
    fontSize: 18,
    color: Colors.white,
    align: "center",
    margin: 6,
    padding: 2,
  },
  checkboxChecked: {
    backgroundColor: Colors.arkadNavy,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  checkmark: {
    color: Colors.white,
    alignSelf: "center",
  },
});
