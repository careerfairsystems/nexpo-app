import { Ionicons } from "@expo/vector-icons";
import React from "react";
import Colors from "constants/Colors";
import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

type categoriesDropdownProps = {
  open: boolean;
  setOpen: (value: any) => void;
  value: any;
  setValue: (value: any) => void;
  items: any;
  setItems: (value: any) => void;
  filterCompanies?: () => void;
  title: string;
  onChangeValue?: () => void;
  categories: boolean;
  single?: boolean;
};

export function CategoriesDropdown(props: categoriesDropdownProps) {
  return (
    <DropDownPicker
      style={styles.dropdown}
      multiple={props.single ? false : true}
      open={props.open}
      value={props.value}
      items={props.items}
      onChangeValue={props.onChangeValue ? props.onChangeValue : () => {}}
      setOpen={props.setOpen}
      setValue={props.setValue}
      setItems={props.setItems}
      placeholder={props.title}
      modalTitle={props.title}
      modalTitleStyle={styles.modalTitle}
      categorySelectable={!props.categories}
      listParentContainerStyle={props.categories ? styles.listParentContainer : null}
      listParentLabelStyle={props.categories ? { color: Colors.white } : null}
      placeholderStyle={{
        color: Colors.arkadNavy,
        fontSize: 20,
        fontFamily: "main-font-bold",
      }}
      selectedItemContainerStyle={
        {
          //backgroundColor: Colors.arkadTurkos,
        }
      }
      selectedItemLabelStyle={{
        color: Colors.arkadTurkos,
      }}
      listItemLabelStyle={{
        color: Colors.arkadNavy,
        fontSize: 20,
        fontFamily: "main-font-bold",
      }}
      closeIconContainerStyle={styles.closeButton}
      listItemContainerStyle={styles.container}
      showArrowIcon={false}
      mode="BADGE"
      listMode="MODAL"
      badgeDotStyle={{
        backgroundColor: Colors.arkadNavy,
      }}
      onClose={props.filterCompanies ? props.filterCompanies : () => {}}
      CloseIconComponent={() => <Ionicons name="checkmark" style={styles.checkmark} />}
      TickIconComponent={() => <Ionicons name="checkmark" style={styles.tickIcon} />}
    />
  );
}
const styles = StyleSheet.create({
  modalTitle: {
    fontWeight: "bold",
    color: Colors.arkadNavy,
    fontFamily: "main-font-bold",
    fontSize: 32,
  },
  listParentContainer: {
    backgroundColor: Colors.arkadNavy,
    height: 40,
  },
  closeButton: {
    backgroundColor: Colors.lightGreen,
    borderRadius: 48,
    padding: 8,
    margin: 0,
  },
  dropdown: {
    borderColor: Colors.arkadNavy,
    borderWidth: 2,
  },
  container: {
    borderColor: Colors.arkadNavy,
    borderWidth: 0.5,
    height: 60,
  },
  checkmark: {
    color: Colors.white,
    fontSize: 32,
  },
  tickIcon: {
    color: Colors.arkadTurkos,
    fontSize: 32,
  },
});
