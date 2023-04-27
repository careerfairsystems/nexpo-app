import React from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";

import { ArkadText } from "../StyledText";
import Colors from "constants/Colors";
import { Message } from "api/Messages";
import { API } from "api/API";

type ListedMessageItemProps = {
  message: Message;
  itemStyle: ViewStyle;
  onPress: () => void;
};

export const MessageListItem = ({ message, itemStyle, onPress }: ListedMessageItemProps) => (
  <Pressable onPress={onPress} style={[styles.container, itemStyle]}>
    <View style={{flex: 1}}>
      <ArkadText style={styles.messageTitle} text={message.title} />
      <ArkadText style={styles.messageContent} text={message.content} />
      <ArkadText
        style={styles.messageTime}
        text={API.messages.formatTime(message.date, message.time)}
      />
    </View>
  </Pressable>
);

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
      textAlign: "center",
      color: Colors.white,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: Colors.arkadNavy,
    padding: 16,
    borderRadius: 16,
  },
  messageTitle: {
    flex: 1,
    fontSize: 22,
    textAlign: "left",
    color: Colors.white,
  },
});
