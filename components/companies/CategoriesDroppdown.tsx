import { Ionicons } from "@expo/vector-icons";
import React from "react";
import Colors from "../../constants/Colors";
import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

type categoriesDropdownProps = {
  open: boolean;
  setOpen: (value: any) => void;
  value: any;
  setValue: (value: any) => void;
  items: any;
  setItems: (value: any) => void;
  filterCompanies: () => void;
  title : string;
}

export function CategoriesDropdown(props: categoriesDropdownProps) {
  return(
    <DropDownPicker
      style={styles.dropdown}
      multiple={true}
      open={props.open}
      value={props.value}
      items={props.items}
      setOpen={props.setOpen}
      setValue={props.setValue}
      setItems={props.setItems}
      placeholder={props.title}
      modalTitle={props.title}
      modalTitleStyle={styles.modalTitle}
      placeholderStyle={{ 
        color: Colors.darkBlue,
        fontFamily: 'montserrat'}}
      selectedItemContainerStyle={{
        backgroundColor: Colors.lightGray
      }}
      listItemLabelStyle={{
        color: Colors.darkBlue,
        fontFamily: 'montserrat',
      }}
      closeIconContainerStyle={styles.closeButton}
      listItemContainerStyle={styles.container}
      showArrowIcon={false}
      mode = 'BADGE'
      listMode="MODAL"
      badgeDotStyle={{
        backgroundColor: Colors.darkBlue,
      }}
      onClose={props.filterCompanies}
      CloseIconComponent={() => <Ionicons name='checkmark' style={styles.checkmark} />}
    />
  )
}
const styles = StyleSheet.create({
  modalTitle: {
    fontWeight: "bold",
    color: Colors.darkBlue,
    fontFamily: 'montserrat',
    fontSize: 24
  },
  closeButton: {
    backgroundColor: Colors.lightGreen,
    borderRadius: 48,
    padding: 8,
    margin: 0,
  },
  dropdown: {
    borderColor: Colors.darkBlue,
    borderWidth: 2,
  },
  container: {
    borderBottomColor: Colors.darkBlue,
    borderBottomWidth: 1,
    height: 60,
  },
  checkmark: {
    color: Colors.white,
    fontSize: 32,
  }
});