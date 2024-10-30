import { Entypo, Ionicons } from "@expo/vector-icons";
import React from "react";
import Colors from "constants/Colors";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import DropDownPicker, { ThemeNameType } from "react-native-dropdown-picker";
import { PublicCompanyDto } from "api/Companies";
import { CompanyBadge } from "./CompanyBadge";

type categoriesDropdownProps = {
  open: boolean;
  setOpen: (value: any) => void;
  value: any;
  setValue: (value: any) => void;
  items: any;
  setItems: (value: any) => void;
  filterCompanies?: () => void;
  filteredCompanies: PublicCompanyDto[];
  title: string;
  itemFiltering: (company: PublicCompanyDto, value: any) => boolean;
  onChangeValue?: () => void;
  categories: boolean;
  single?: boolean;
};

export function CompanyCategoriesDropdown(props: categoriesDropdownProps) {
  const removeItem = (item: any) => {
    props.setValue((prevItems: []) => prevItems.filter((i) => i !== item));
  };


  return (
    <DropDownPicker
      style={styles.dropdown}
      multiple={props.single ? false : true}
      theme="DARK"
      placeholder="Choose options..."
      open={props.open}
      value={props.value}
      items={props.items}
      onChangeValue={props.onChangeValue ? props.onChangeValue : () => {}}
      setOpen={props.setOpen}
      setValue={props.setValue}
      setItems={(value) => props.setItems(value)}
      modalTitle={props.title}
      modalTitleStyle={styles.modalTitle}
      categorySelectable={!props.categories}
      placeholderStyle={{
        color: Colors.white,
        fontSize: 20,
        fontFamily: "main-font-bold",
      }}
      selectedItemLabelStyle={{
        color: Colors.arkadTurkos,
      }}
      listItemContainerStyle={styles.listItemContainer}
      listItemLabelStyle={styles.listItemLabel}
      closeIconContainerStyle={styles.closeButton}
      showArrowIcon={true}
      ArrowDownIconComponent={({style}) => <Entypo name="chevron-thin-right" size={18} color="white" />}
      ArrowUpIconComponent={({style}) => <Entypo name="chevron-thin-right" size={18} color="white" />}
      mode="BADGE"
      listMode="MODAL"
      modalAnimationType="fade"
      renderBadgeItem={(itemProps) => <CompanyBadge {...itemProps} onPress={removeItem}/>}
      onClose={props.filterCompanies ? props.filterCompanies : () => {}}
      CloseIconComponent={() => (
        <Ionicons name="checkmark" style={styles.checkmark} />
      )}
      TickIconComponent={() => (<Ionicons name="checkmark" style={styles.tickIcon} />)}
      
    />
  );
}
const styles = StyleSheet.create({
  modalTitle: {
    fontWeight: "bold",
    color: Colors.white,
    fontFamily: "main-font-bold",
    fontSize: 32,
  },
  closeButton: {
    backgroundColor: Colors.arkadGreen,
    borderRadius: 48,
    width: 48,
    height: 48,
    marginHorizontal: 6,
    padding: 4,
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  listItemContainer: {
    borderColor: Colors.white,
    borderLeftColor: Colors.arkadNavy,
    borderRightColor: Colors.arkadNavy,
    textShadowColor: Colors.white,
    borderWidth: 0.5,
    height: 60,
    color: Colors.white,
  },
  listItemLabel: {
    color: Colors.white,
    fontSize: 18,
  },
  dropdown: {
    color: Colors.white,
    backgroundColor: "none",
    borderWidth: 0,
    height:60,
    width: "100%",
    margin: 0,
  },
  checkmark: {
    color: Colors.white,
    fontSize: 32,
  },
  tickIcon: {
    color: Colors.arkadTurkos,
    fontSize: 30,
  },
});
