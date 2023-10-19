import Colors from "constants/Colors";
import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { ArkadText } from "components/StyledText";
import { Message } from "api/Messages";
import MessageListItem from "./MessageListItem";
import { API } from "api/API";
import ScreenActivityIndicator from "components/ScreenActivityIndicator";

export default function MessagesTab() {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  const getMessagees = async () => {
    setLoading(true);
    const notifications = await API.messages.getNotifications();
    setMessages(notifications);
    setLoading(false);
  };

  useEffect(() => {
    getMessagees();
  }, []);

  if (isLoading) {
    return <ScreenActivityIndicator />;
  }

  if (messages?.length === 0) {
    return <ArkadText text={"No messages"} style={styles.text}></ArkadText>;
  } else {
    return (
      <FlatList
        style={{
          backgroundColor: Colors.arkadNavy,
        }}
        showsVerticalScrollIndicator={false}
        data={messages?.reverse()}
        keyExtractor={(message) => message.title}
        renderItem={({ item: message }) => <ArkadText text="hejsan" />}
      />
    );
  }
}

const styles = StyleSheet.create({
  text: {
    paddingTop: 40,
    fontFamily: "main-font-bold",
    fontSize: 32,
    color: Colors.white,
  },
});
