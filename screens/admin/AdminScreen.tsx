import Colors from "constants/Colors";
import React from "react";
import { useState } from "react";
import { TextInput, View, StyleSheet, Modal } from "react-native";
import { ArkadButton } from "components/Buttons";
import { ArkadText } from "components/StyledText";
import { StackNavigationProp } from "@react-navigation/stack";
import { AdminStackParamList } from "./AdminNavigator";

type adminNavigation = {
    navigation: StackNavigationProp<AdminStackParamList, "AdminScreen">;
};

const comittees = ["Economics & Sustainability", "Business Relations", "Marketing & Public Relations", "Event & Recruitment", "Fair & Logistics", "Information Technology"]

export default function AdminScreen({ navigation }: adminNavigation) {
    const [text, onChangeText] = useState("");
    const [modalVisible, setModalVisible] = useState(false); 
    const [checkedState, setCheckedState] = useState(
        new Array(comittees.length).fill(false)
    );

    const handleCheckState = (position: number) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);
    }

    const send = () => {
        console.log(text);
    }

    return (
        <View style={styles.container}>
            <SelectComitteeModal/>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder={"Message to send..."}
                placeholderTextColor={Colors.lightGray}
                multiline={true}
                textAlignVertical="top"
                numberOfLines={10}
            />
            <ArkadButton onPress={send} style={styles.buttonContainer1}>
                <ArkadText text="Send" style={styles.buttonText} />
            </ArkadButton>
            <ArkadButton onPress={() => setModalVisible(true)} style={styles.buttonContainer2}>
                <ArkadText text="Select committee" style={styles.buttonText} />
            </ArkadButton>
        </View>
    );

    function SelectComitteeModal() {
        return (
          <Modal
            animationType="none"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
                
                {comittees.map((item, index) => {
                    return (
                        <label>
                            <input 
                                type="checkbox"
                                checked={checkedState[index]}
                                onChange={() => handleCheckState(index)}
                            />
                            <ArkadText text={item} />
                            {item}
                        </label>
                    )
                })};

              <ArkadButton onPress={() => setModalVisible(!modalVisible)}>
              <ArkadText text={"Save"} />
              </ArkadButton>
            </View>
          </Modal>
        );
      }
}
       

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    input: {
        height: "40%",
        margin: 12,
        borderColor: Colors.arkadNavy,
        color: Colors.arkadNavy,
        borderRadius: 7,
        borderWidth: 2,
        fontSize: 20,
        fontFamily: "main-font-bold",
        padding: 10,
        width: "80%",
    },
    buttonText: {
        padding: "1%",
        alignItems: "center",
    },
    buttonContainer1: {
        alignSelf: "center",
        padding: "4%",
        marginBottom: "2%",
        width: "45%",
        backgroundColor: Colors.arkadOrange,
    },
    buttonContainer2: {
        alignSelf: "center",
        padding: "4%",
        marginBottom: "2%",
        width: "45%",
        backgroundColor: Colors.arkadNavy,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
});