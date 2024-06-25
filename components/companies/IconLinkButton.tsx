import React from "react";
import { Image, Linking, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import Colors from "constants/Colors";
import { ArkadText } from "../StyledText";

type IconLinkButtonProps = {
  url: string | null,
  icon: any,
  text: string,
  style: ViewStyle,
};

export const IconLinkButton = ({ url, icon, style, text }: IconLinkButtonProps) => {
    const disabled = !url

    return (
        <Pressable 
            onPress={() => {
                if (url) {
                    Linking.openURL(url)
                }
            }} 
            style={[styles.buttonArea, style, disabled ? styles.buttonAreaDisabled : undefined]}
            disabled={disabled}
        >
            <Image source={icon} style={styles.icon}/>
            <ArkadText text={text} style={styles.text} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonArea: {
        borderRadius: 100,
        backgroundColor: "#fff",
        flexDirection: "row",
        width: 175,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        gap: 8
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
        // color: var(--ARKAD-Navy, #041224);
        // text-align: center;
        // leading-trim: both;

        // text-edge: cap;
        // font-feature-settings: 'clig' off, 'liga' off;
        // /* Title3/Regular */
        // font-family: "Myriad Pro";
        // font-size: 20px;
        // font-style: normal;
        // font-weight: 400;
        // line-height: 25px; /* 125% */
        // letter-spacing: -0.45px;
    }

});
