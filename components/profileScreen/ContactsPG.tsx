import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { ScrollView, StyleSheet } from "react-native";
import Colors from "constants/Colors";
import { ArkadText, SelectableArkadText } from "components/StyledText";
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

  const handlePhoneNumberPress = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <ScrollView style={styles.container}>
      <ArkadText
        text={"Click on the Phone number to access it on your phone"}
        style={styles.header}
      />
      {contacts?.reverse().map((contact) => (
        <View key={contact.id} style={styles.contactContainer}>
          <ArkadText text={contact.roleInArkad} style={styles.role} />
          <ArkadText
            text={`${contact.firstName} ${contact.lastName}`}
            style={styles.text}
          />
          <ArkadText text={contact.email} style={styles.text} />
          <TouchableOpacity
            onPress={() => handlePhoneNumberPress(contact.phoneNumber)}
          >
            <SelectableArkadText
              text={contact.phoneNumber}
              style={styles.text}
            />
          </TouchableOpacity>
        </View>
      ))}
      <ArkadText
        text={"NAKED SPACE"}
        style={styles.header && { color: Colors.arkadNavy }}
      ></ArkadText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.arkadNavy,
  },
  header: {
    fontSize: 30,
    color: Colors.white,
    marginBottom: 12,
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
    marginBottom: 5,
  },
});
