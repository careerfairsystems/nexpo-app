import { StyleSheet, Animated, View, LayoutChangeEvent } from "react-native";
import React from "react";
import { ArkadText } from "../StyledText";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "constants/Colors";
import { AntDesign } from "@expo/vector-icons";

export default function Expandable(props: any) {
    const [expanded, setExpanded] = React.useState(false);
    const [animatedHeight, setAnimatedHeight] = React.useState(new Animated.Value(0));
    const [maxHeightSet, setMaxHeightSet] = React.useState(false);
    const [maxHeight, setMaxHeight] = React.useState(0);
    
    const animatinDuration = 200;

    const toggleDropdown = () => {
        if (expanded) {
            Animated.timing(animatedHeight, {
                toValue: 0,
                duration: animatinDuration,
                useNativeDriver: true
            }).start();

            setTimeout(() => {
                setExpanded(!expanded);
            }, animatinDuration);
        } else {
            setExpanded(!expanded);

            Animated.timing(animatedHeight, {
                toValue: 100,
                duration: animatinDuration,
                useNativeDriver: true
            }).start();
        }
    }

    const _setMaxHeight = (event : LayoutChangeEvent) => {
        if (!maxHeightSet && event.nativeEvent.layout.height > maxHeight) {
            setMaxHeight(event.nativeEvent.layout.height);
            setMaxHeightSet(true);
        }
    }

    const height = animatedHeight.interpolate({
        inputRange: [0, 100],
        outputRange: [0, maxHeight]
    });

    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={() => {toggleDropdown()}}>
                <ArkadText text={props.title} style={styles.title}></ArkadText>
                <AntDesign name={expanded ? "up" : "down"} size={24} color="black" style={styles.icon}/>
            </TouchableOpacity>
            <Animated.View style={[styles.descContainer, {height: maxHeightSet ? height : 'auto'}]} onLayout={(event) => {_setMaxHeight(event)}}>
                <ArkadText text={"Låååååååååååååååååååååååååååååååååååååååååååååååååååååååååååååååååååååååååååååång text"} style={styles.desc}></ArkadText>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: Colors.arkadOrange,
        justifyContent: "center",
        borderBottomColor: Colors.arkadNavy,
        borderBottomWidth: 2
    },
    title: {
        padding: 5,
        fontFamily: "main-font-bold",
        fontSize: 30
    },
    descContainer: {
        width: "100%",
        backgroundColor: Colors.arkadNavy
    },
    desc: {
        padding: 10,
        fontFamily: "main-font",
    },
    icon: {
        position: "absolute",
        right: 10
    }
}) 