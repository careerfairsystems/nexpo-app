import * as React from "react";

import { Text, TextProps } from "./Themed";
import { StyleSheet, TextStyle } from "react-native";
import Colors from "constants/Colors";
import Fonts from "constants/Fonts";

export function DefaultText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "main-font-bold" }]} />
  );
}

interface textProps {
  text: string;
  style?: TextStyle;
}

export function ArkadText(props: textProps) {
  return <Text style={[styles.text, props.style]}>{props.text}</Text>;
}
export function SelectableArkadText(props: textProps) {
  return (
    <Text style={[styles.text, props.style]} selectable>
      {props.text}
    </Text>
  );
}
export function NoButton(props: textProps) {
  return <Text style={[styles.acceptedText, props.style]}>{props.text}</Text>;
}

const styles = StyleSheet.create({
  acceptedText: {
    fontSize: 20,
    padding: 20,
    color: Colors.white,
    fontFamily: "main-font-bold",
    justifyContent: "center",
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
    fontFamily: Fonts.MyriadProBold,
    color: Colors.white,
  },
});
