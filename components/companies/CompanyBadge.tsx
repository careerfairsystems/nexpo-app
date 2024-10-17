import { Ionicons } from "@expo/vector-icons"
import Colors from "constants/Colors"
import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { RenderBadgeItemPropsInterface } from "react-native-dropdown-picker"

export function CompanyBadge ({label, value, onPress}: RenderBadgeItemPropsInterface<any>) {
  
  return (
    <TouchableOpacity onPress={(event) => onPress(value)}>  
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{label}</Text>
        <Ionicons name="close-outline" size={16} color={Colors.white} />
      </View>
    </TouchableOpacity>
  )

}


const styles = StyleSheet.create({
  badge: {
    backgroundColor: Colors.arkadTurkos,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: Colors.white,
    fontSize: 14,
    
  }
})