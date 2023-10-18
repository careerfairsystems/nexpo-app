import React, { useEffect } from "react";
import { View, Text } from "../Themed";
import Colors from "constants/Colors";
import { ScrollView, StyleSheet } from "react-native";
import { ArkadText } from "components/StyledText";
import { API } from "api/API";
import { Contact } from "api/Contacts";

export default function Contacts() {
  const [contacts, setContacts] = React.useState<Contact[]>([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    const contacts = await API.contacts.contacts();
    setContacts(contacts);
  }

  return (
    <ScrollView style={styles.container}>
      <ArkadText text={"Contacts"} style={styles.header} />
      {contacts?.reverse().map((contact) => (
        <View key={contact.id} style={styles.contactContainer}>
          <ArkadText text={contact.roleInArkad} style={styles.role} />
          <ArkadText
            text={`${contact.firstName} ${contact.lastName}`}
            style={styles.text}
          />
          <ArkadText text={contact.email} style={styles.text} />
          <ArkadText text={contact.phoneNumber} style={styles.text} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16, // Adjust the padding for the container
    backgroundColor: Colors.arkadNavy,
  },
  header: {
    fontSize: 30,
    color: Colors.white,
    marginBottom: 16, // Add margin to separate header from contacts
    textAlign: "center",
  },
  role: {
    fontWeight: "bold",
    color: Colors.arkadOrange,
    fontSize: 21,
  },
  text: {
    color: Colors.white,
    fontSize: 18,
  },
  contactContainer: {
    backgroundColor: Colors.arkadNavy,
    padding: 8,
    marginBottom: 5, // Add margin between contact containers
  },
});
