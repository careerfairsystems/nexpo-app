import React from "react";
import { Image } from "react-native";
export default function Head({ position, size }) {
  return (
    <Image
      source={require("../../assets/images/android_icon.png")}
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