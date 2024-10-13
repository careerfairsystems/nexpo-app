import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { ArkadText } from "components/StyledText";
import { getAllNotifications, Message } from "api/Notifications";
import MessageListItem from "./MessageListItem";
import { API } from "api/API";
import ScreenActivityIndicator from "components/ScreenActivityIndicator";
import Colors from "constants/Colors";
import Notification from "expo-notifications"

export default function MessagesTab() {
  const [messages, setMessages] = useState<Message[]>([]); // Initialize as an empty array
  const [isLoading, setLoading] = useState<boolean>(true);

  const getMessages = async () => {
    setLoading(true);
    const notifications = await (getAllNotifications());
    setMessages(notifications);
    setLoading(false);
  };

  useEffect(() => {
    getMessages();
  }, []);


  if (isLoading) {
    return <ScreenActivityIndicator />;
  }

  if (messages.length === 0) { // Change to messages.length
    return <ArkadText text={"No messages"} style={styles.text}></ArkadText>;
  } else {
    return (
      <FlatList
        style={{
          backgroundColor: Colors.arkadNavy,
        }}
        showsVerticalScrollIndicator={false}
        data={messages.reverse()} // No need to use '?'
        keyExtractor={(message) => message.title}
        renderItem={({ item: message }) => (
          <MessageListItem message={message} />
        )}
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
