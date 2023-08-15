import React, { useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import { ArkadText } from "../StyledText";
import Colors from "constants/Colors";
import { Message } from "api/Messages";
import { API } from "api/API";

type ListedMessageItemProps = {
  message: Message;
};

const { width, height } = Dimensions.get("window");

export default function MessageListItem({ message }: ListedMessageItemProps) {
  const [messagePressed, setMessagePressed] = useState<boolean>(false);

  const onPress = () => {
    setMessagePressed(!messagePressed);
  };

  return (
    <View
      style={
        messagePressed ? styles.messageBoxPressed : styles.messageBoxNotPressed
      }
    >
      <Pressable onPress={onPress} style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <ArkadText style={styles.messageTitle} text={message.title} />
          <ArkadText style={styles.messageContent} text={message.content} />
          <ArkadText
            style={styles.messageTime}
            text={
              API.messages.formatTime(message.date, message.time) +
              " from " +
              message.sender
            }
          />
        </ScrollView>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  messageTime: {
    paddingBottom: 6,
    fontSize: 16,
    textAlign: "left",
    color: Colors.white,
  },
  messageContent: {
    paddingBottom: 6,
    fontSize: 16,
    textAlign: "left",
    color: Colors.white,
  },
  messageBoxNotPressed: {
    width: width * 0.95,
    height: height * 0.24,
  },
  messageBoxPressed: {
    flexBasis: "fit-content",
    width: width * 0.95,
    height: height * 0.6,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: Colors.arkadTurkos,
    padding: 16,
    borderRadius: 16,
  },
  messageTitle: {
    flex: 1,
    fontSize: 22,
    textAlign: "center",
    color: Colors.white,
  },
});
