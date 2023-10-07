import React, { useState } from "react";
import Colors from "constants/Colors";
import { ScrollView, StyleSheet, TextInput, Linking } from "react-native";
import { ArkadText } from "components/StyledText";
import { ArkadButton } from "components/Buttons";
import { getMe } from "api/Users";

export default function QuestionTab() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const sendEmail = async () => {
    try {
      const user = await getMe();
      const recipient = ["company.arkad@tlth.se"]; // List of recipient email addresses
      const subject = title;

      const sender = "From: " + user.email;
      const body =
        "Please do not remove the From and Message tags!\n\n" +
        sender +
        "\nMessage: " +
        text;

      const emailUrl = `mailto:${recipient}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      Linking.openURL(emailUrl)
        .then(() => console.log("Email opened"))
        .catch((error) => console.error("Error opening email:", error));

      setText("");
      setTitle("");
    } catch (error) {
      console.error("Error sending email:", error);
      // Handle the error gracefully, e.g., show an error message to the user.
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <ArkadText
        text={
          "If you have any questions please\nsend us an email and we will\nrespond as fast as we can!"
        }
        style={styles.header}
      />
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
      <ArkadButton onPress={sendEmail} style={styles.buttonContainer1}>
        <ArkadText text="Send" style={styles.buttonText} />
      </ArkadButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    backgroundColor: Colors.arkadNavy,
  },
  header: {
    width: "100%",
    textAlign: "center",
    fontSize: 30,
    color: Colors.white,
    marginBottom: 15,
  },
  textInput: {
    height: "40%", // Updated to a number
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
    height: "10%", // Updated to a number
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
  buttonText: {
    padding: 1, // Updated to a number
    alignItems: "center",
    fontSize: 18,
  },
  buttonContainer1: {
    alignSelf: "center",
    padding: 4, // Updated to a number
    marginBottom: 2, // Updated to a number
    width: "45%", // Updated to a number
  },
});
