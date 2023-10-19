import { Message } from "api/Messages";
import { ArkadText } from "components/StyledText";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

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
    : styles.messageBoxNotPressed;

  return (
    <TouchableOpacity onPress={toggleExpand}>
      <View style={messageBoxStyle}>
        <ArkadText style={styles.messageContent} text={message.title} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  messageContent: {
    fontSize: 16,
    color: "black",
  },
  messageBoxNotPressed: {
    padding: 16,
    backgroundColor: "lightblue",
  },
  messageBoxPressed: {
    padding: 16,
    backgroundColor: "lightpink",
  },
});
