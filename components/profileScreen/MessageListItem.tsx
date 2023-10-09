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

type ListedMessageItemProps = {
  message: Message;
};

const { width, height } = Dimensions.get("window");

export default function MessageListItem({ message }: ListedMessageItemProps) {
  const [messagePressed, setMessagePressed] = useState<boolean>(true);

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
          <ArkadText style={styles.messageContent} text={message.message} />
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
    width: width,
    height: height * 0.24,
  },
  messageBoxPressed: {
    flexBasis: "fit-content",
    width: width,
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
