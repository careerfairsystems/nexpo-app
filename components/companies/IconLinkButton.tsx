import React from "react";
import { Image, Linking, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import Colors from "constants/Colors";
import { ArkadText } from "../StyledText";
import { ArkadButton } from "components/Buttons";

type IconLinkButtonProps = {
  url: string | null,
  icon: any,
  text: string,
  style: ViewStyle,
};

export const IconLinkButton = ({ url, icon, style, text }: IconLinkButtonProps) => {
    const disabled = !url
    const calculatedStyle = {...styles.buttonArea, ...style, ...(disabled && styles.buttonAreaDisabled)} // Type Check error if using array styling

    
    return (
        <ArkadButton onPress={() => {
                    if (url) {
                        Linking.openURL(url)
                    }
            }}
            style={calculatedStyle}
        >
            <Image source={icon} style={styles.icon}/>
            <ArkadText text={text} style={styles.text} />
        </ArkadButton>
    )
}

const styles = StyleSheet.create({
    buttonArea: {
        borderRadius: 100,
        flex: 1,
        minWidth: 175,
        maxWidth: 275,
        backgroundColor: "#fff",
        flexDirection: "row",
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        overflow: "hidden",
        margin: 0,
    },
    buttonAreaDisabled: {
        opacity: 0.5
    },
    icon: {
        width: 24,
        height: 24,
    },
    text: {
        fontWeight: "400",
        fontSize: 20,
        fontStyle: "normal",
        textAlign: "center",
        lineHeight: 25,
        letterSpacing: -0.45,
        color: Colors.arkadNavy
    }

});
