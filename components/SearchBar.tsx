import * as React from "react";
import { StyleSheet } from "react-native";

import Colors from "constants/Colors";
import { Image, TextInputProps } from "react-native";
import { TextInput } from "./TextInput";
import { View } from "./Themed";
import { ArkadButton } from "./Buttons";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export interface SearchBarProps extends TextInputProps {
  text: string,
  onChangeText: (val: string) => void,
  toggleFilter: () => void,
  modalVisible: boolean,
  isFiltered: boolean,
  placeHolder: string,
}

export function SearchBar({text, onChangeText, toggleFilter, modalVisible, isFiltered, placeHolder}: SearchBarProps) {
  const [focused, setFocused] = React.useState(false);
  const [inputText, setInputText] = useState(text);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChangeText(inputText);
    }, 200); // some delay

    return () => {
      clearTimeout(handler);
    };
  }, [inputText, onChangeText]);

  return (
    <View style={[styles.searchContainer, {borderColor: focused ? Colors.arkadTurkos : "none"}]}>
      <Image source={require("../assets/images/search_icon_black.png")} style={styles.searchIcon} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setInputText}
          value={inputText}
          placeholder={placeHolder}
          placeholderTextColor={Colors.lightGray}
          numberOfLines={1}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
        />
      </View>
      {!!inputText && (
        <ArkadButton style={styles.clearButton} onPress={() => {setInputText("")}} >
          <Entypo name="cross" size={24} color="black" />
        </ArkadButton>
      )}

      <ArkadButton style={styles.filterbutton} onPress={() => toggleFilter()}>
        {modalVisible ? (
          <Entypo name="chevron-up" size={16} color="black" />
        ) : (
          <Image source={require("../assets/images/funnel_icon_black.png")} style={styles.filterIcon} />
        )}
        {isFiltered && <View style={styles.filterBadge} />}
      </ArkadButton>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    padding: 8,
    borderRadius: 100,
    zIndex: 1,
    backgroundColor: Colors.white,
    borderWidth: 2,
    width: "100%",
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    flexGrow: 1,
    height: "100%",
    margin: 0,
    paddingVertical: 0,
    flex: 1,
    borderWidth: 0,
    borderRadius: 0,
  },
  clearButton: {
    height: "100%",
    padding: 0,
    margin: 0,
    backgroundColor: "none",
  },
  filterbutton: {
    height: 36,
    width: 36,
    padding: 10,
    margin: 0,
    backgroundColor: Colors.arkadTurkos,
  },
  filterIcon: {
    height: 16,
    width: 16,
  },
  filterBadge: {
    position: "absolute",
    top: -1,
    left: -1,
    backgroundColor: Colors.arkadOrange,
    borderRadius: 50,
    width: 15,
    height: 15,
  },
});
