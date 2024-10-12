import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Message } from "api/Notifications";
import { ArkadText } from "components/StyledText";
import Colors from "constants/Colors";

type ListedMessageItemProps = {
  message: Message;
};

export default function MessageListItem({ message }: ListedMessageItemProps) {
  const [messagePressed, setMessagePressed] = useState<boolean>(false);

  const toggleExpand = () => {
    setMessagePressed(!messagePressed);
  };

  const messageBoxStyle = messagePressed
    ? styles.messageBoxPressed
    : styles.messageBox;

  return (
    <TouchableOpacity onPress={toggleExpand}>
      <View style={messageBoxStyle}>
        <ArkadText style={styles.messageTitle} text={message.title} />
        {messagePressed ? (
          <ArkadText style={styles.messageContent} text={message.message} />
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  messageBox: {
    width: "100%",
    marginTop: 12,
    backgroundColor: Colors.arkadTurkos,
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  messageBoxPressed: {
    width: "100%",
    marginTop: 12,
    backgroundColor: Colors.arkadTurkos,
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  messageTitle: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "left",
  },
  messageContent: {
    fontSize: 16,
    marginTop: 8,
    color: Colors.white,
    textAlign: "left",
  },
});
