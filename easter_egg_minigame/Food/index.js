import React from "react";
import { View, Image } from "react-native";
export default function Food({ position, size }) {
  return (
    <Image
      source={require("../../assets/images/BottomNavigatorIconPackage/Business2W.png")}
      style={{
        width: size,
        height: size,
        backgroundColor: "white",
        position: "absolute",
        left: position[0] * size,
        top: position[1] * size,
      }}
    />
  );
}