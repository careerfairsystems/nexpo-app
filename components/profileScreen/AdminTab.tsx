import React, { useEffect } from "react";
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
import { Role, updateRole } from "api/Role";
import { CategoriesDropdown } from "components/companies/CategoriesDroppdown";
import { API } from "api/API";
import { User, getUser } from "api/Users";
import { useNavigation } from "@react-navigation/native";

export default function AdminTab() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [committees, setCommittees] = useState(COMMITTEES);
  const [committeeValue, setCommitteeValue] = useState<Committee[]>([]);
  const [committeeModal, setCommitteeModal] = useState(false);

  const [firstLunch, setFirstLunch] = useState<number>();
  const [secondLunch, setSecondLunch] = useState<number>();
  const [banquetEvent, setBanquet] = useState<number>();

  const [roles, setRoles] = useState(ROLES);
  const [roleValue, setRoleValue] = useState<Role | null>(null);
  const [roleModal, setRoleModal] = useState(false);

  const [userName, setUserName] = useState("");

  const [user, setUser] = useState<User | null>(null);

  const navigation = useNavigation();

  async function getSenderUser() {
    const user = await API.users.getMe();
    setUser(user);
  }

  async function getLunchID() {
    const events = await API.events.getAllEvents();
    const lunchEvents = events.filter((event) => event.type === 1);
    setFirstLunch(lunchEvents[0]["id"]);
    setSecondLunch(lunchEvents[1]["id"]);
  }

  async function getBanquetID() {
    const events = await API.events.getAllEvents();
    const banquet = events.filter((event) => event.type === 2)[0]; // First in list as "ARKAD" is the first row, alphabetical order
    setBanquet(banquet["id"]);
  }

  useEffect(() => {
    getSenderUser();
    getLunchID();
    getBanquetID();
  }, []); // Empty dependency array ensures it runs only once after the component mounts

  const lunch_day1 = () => {
    navigation.navigate("EventSwitchScreen", {
      id: firstLunch,
      screen: "participatians",
    });
  };

  const lunch_day2 = () => {
    navigation.navigate("EventSwitchScreen", {
      id: secondLunch,
      screen: "participatians",
    });
  };

  const banquet = () => {
    navigation.navigate("EventSwitchScreen", {
      id: banquetEvent,
      screen: "participatians",
    });
  };

  const send = async () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Ensure two digits for the month
    const day = today.getDate().toString().padStart(2, "0"); // Ensure two digits for the day
    const hours = today.getHours().toString().padStart(2, "0"); // Ensure two digits for the hours
    const minutes = today.getMinutes().toString().padStart(2, "0"); // Ensure two digits for the minutes

    const messageToSend: Message = {
      title: title,
      message:
        text +
        "\n\n" +
        "Received: " +
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        "\n" +
        "Sent by: " +
        user?.firstName +
        " " +
        user?.lastName,
      topic: "Volunteer",
    };

    sendNotification(messageToSend);


    console.log("Sending message: ");
    console.log(messageToSend);

    

    setText("");
    setTitle("");
    setCommitteeValue([]);
    alert("Success!");
  };

  const changeUserRole = () => {
    console.log("Changing user role: " + userName);
    updateRole(userName, roleValue);
    if (userName) {
      setUserName("");
    }
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
      {/*       <View style={styles.centeredViewCommittee}>
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
      </View> */}
      <TextInput
        style={styles.titleInput}
        onChangeText={setTitle}
        value={title}
        placeholder={"Title..."}
        placeholderTextColor={Colors.lightGray}
        multiline={false}
        textAlign="left"
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
        text="Scan special tickets"
        style={{
          fontSize: 40,
          color: Colors.white,
          marginTop: 10,
          marginBottom: 10,
        }}
      />
      <ArkadButton onPress={lunch_day1} style={styles.buttonContainer1}>
        <ArkadText text="Lunch Day 1" style={styles.buttonText} />
      </ArkadButton>
      <ArkadButton onPress={lunch_day2} style={styles.buttonContainer1}>
        <ArkadText text="Lunch Day 2" style={styles.buttonText} />
      </ArkadButton>
      <ArkadButton onPress={banquet} style={styles.buttonContainer1}>
        <ArkadText text="Banquet" style={styles.buttonText} />
      </ArkadButton>

      <ArkadText
        text="Change user role"
        style={{
          fontSize: 40,
          color: "white",
          marginTop: "5%",
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
        placeholder={"E-mail..."}
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
    height: "30%",
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
    height: 48,
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
    height: 48,
    margin: 0,
    borderColor: Colors.white,
    color: Colors.white,
    borderRadius: 7,
    borderWidth: 2,
    fontSize: 20,
    fontFamily: "main-font-bold",
    padding: 10,
    width: "90%",
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
    width: "90%",
  },
});
