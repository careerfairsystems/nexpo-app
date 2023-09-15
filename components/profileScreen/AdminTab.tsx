import React from "react";
import Colors from "constants/Colors";
import { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { ArkadButton } from "components/Buttons";
import { ArkadText } from "components/StyledText";
import { Message, sendNotification } from "api/Messages";
import { COMMITTEES, ROLES } from "./DroppdownItems";
import { Committee } from "api/Committee";
import { Role } from "api/Role";
import { CategoriesDropdown } from "components/companies/CategoriesDroppdown";
import { API } from "api/API";
import { User, getUser } from "api/Users";

export default function AdminTab() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [committees, setCommittees] = useState(COMMITTEES);
  const [committeeValue, setCommitteeValue] = useState<Committee[]>([]);
  const [committeeModal, setCommitteeModal] = useState(false);

  const [roles, setRoles] = useState(ROLES);
  const [roleValue, setRoleValue] = useState<Role[]>([]);
  const [roleModal, setRoleModal] = useState(false);

  const [userName, setUserName] = useState("");

  const [user, setUser] = useState<User | null>(null);

  async function getSenderUser() {
    const user = await API.users.getMe();
    setUser(user);
  }

  getSenderUser();

  const send = () => {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time = today.getHours() + ":" + today.getMinutes();

    const messageToSend: Message = {
      title: title,
      message:
        text +
        "\n\n" +
        "Received: " +
        date +
        " " +
        time +
        "\n" +
        "Sent by: " +
        user?.firstName +
        " " +
        user?.lastName,
      topic: "arkad",
    };

    sendNotification(messageToSend);

    console.log("Sending message: ");
    console.log(messageToSend);
  };

  const changeUserRole = () => {
    console.log("Changing user role: " + userName);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: Colors.arkadNavy }}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <ArkadText
        text="Send mass message"
        style={{
          fontSize: 40,
          color: Colors.white,
          marginTop: 10,
          marginBottom: 10,
        }}
      />
      <View style={styles.centeredViewCommittee}>
        <CategoriesDropdown
          title="Select committee"
          items={committees}
          setOpen={setCommitteeModal}
          setValue={setCommitteeValue}
          open={committeeModal}
          value={committeeValue}
          setItems={setCommittees}
          categories={false}
          single={false}
        />
      </View>
      <TextInput
        style={styles.titleInput}
        onChangeText={setTitle}
        value={title}
        placeholder={"Title..."}
        placeholderTextColor={Colors.lightGray}
        multiline={false}
        textAlign="center"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setText}
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

      <ArkadText
        text="Change user role"
        style={{
          fontSize: 40,
          color: "white",
          marginTop: "10%",
          marginBottom: 12,
        }}
      />
      <View style={styles.centeredViewRoles}>
        <CategoriesDropdown
          title="Change role to..."
          items={roles}
          setOpen={setRoleModal}
          setValue={setRoleValue}
          open={roleModal}
          value={roleValue}
          setItems={setRoles}
          categories={false}
          single={true}
        />
      </View>
      <TextInput
        style={styles.userNameInput}
        onChangeText={setUserName}
        value={userName}
        placeholder={"Username..."}
        placeholderTextColor={Colors.lightGray}
        multiline={false}
        textAlign="left"
      />
      <ArkadButton onPress={changeUserRole} style={styles.buttonContainer1}>
        <ArkadText text="Change" style={styles.buttonText} />
      </ArkadButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: "60",
    margin: 0,
    borderColor: Colors.white,
    color: Colors.white,
    borderRadius: 7,
    borderWidth: 2,
    fontSize: 20,
    fontFamily: "main-font-bold",
    padding: 10,
    width: "90%",
    backgroundColor: Colors.arkadNavy,
  },
  titleInput: {
    height: "20",
    borderColor: Colors.white,
    color: Colors.white,
    borderRadius: 7,
    borderWidth: 2,
    fontSize: 20,
    fontFamily: "main-font-bold",
    padding: 10,
    margin: 0,
    marginBottom: 12,
    width: "90%",
    backgroundColor: Colors.arkadNavy,
  },
  userNameInput: {
    height: "20",
    margin: 0,
    borderColor: Colors.white,
    color: Colors.white,
    borderRadius: 7,
    borderWidth: 2,
    fontSize: 20,
    fontFamily: "main-font-bold",
    padding: 10,
    width: "40%",
  },
  buttonText: {
    padding: "1%",
    alignItems: "center",
    fontSize: 18,
  },
  buttonContainer1: {
    alignSelf: "center",
    padding: "4%",
    marginBottom: "2%",
    width: "45%",
  },
  centeredViewCommittee: {
    justifyContent: "flex-start",
    borderWidth: 0,
    borderColor: Colors.lightGray,
    borderRadius: 15,
    padding: 0,
    margin: 0,
    marginBottom: 12,
    alignItems: "center",
    width: "90%",
  },
  centeredViewRoles: {
    justifyContent: "flex-start",
    borderWidth: 0,
    borderColor: Colors.lightGray,
    borderRadius: 15,
    padding: 0,
    margin: 0,
    marginBottom: 12,
    width: "40%",
  },
});
