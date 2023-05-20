import Colors from "constants/Colors";
import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { ArkadText } from "components/StyledText";
import { Message, getMessages } from "api/Messages";
import MessageListItem from "./MessageListItem";

export default function MessagesTab() {
  // Temporary solution until API is ready
  const messages: Message[] = [MockMessage1, MockMessage2];

  const testmessages = getMessages();
  setTimeout(() => {
    console.log(testmessages);
  }, 1000);

  if (messages.length === 0) {
    return <ArkadText text={"No messages"} style={styles.text}></ArkadText>;
  }
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={messages}
      keyExtractor={(message) => message.title}
      renderItem={({ item: message }) => <MessageListItem message={message} />}
    />
  );
}

const MockMessage1 = {
  title: "Large mock message",
  message: `This is a mock message \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque purus semper eget. Tellus pellentesque eu tincidunt tortor aliquam. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. Sit amet nisl suscipit adipiscing. Ac turpis egestas integer eget aliquet nibh praesent tristique. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Ullamcorper malesuada proin libero nunc consequat interdum varius sit amet. Arcu bibendum at varius vel pharetra vel turpis nunc. Non sodales neque sodales ut etiam sit amet. Est velit egestas dui id ornare.
  
  Eget sit amet tellus cras adipiscing enim eu turpis egestas. Orci porta non pulvinar neque laoreet suspendisse. Quam quisque id diam vel. Facilisi morbi tempus iaculis urna id volutpat lacus. Fusce id velit ut tortor pretium viverra suspendisse potenti. Sed ullamcorper morbi tincidunt ornare massa eget. Ut aliquam purus sit amet luctus venenatis lectus magna fringilla. Et tortor at risus viverra adipiscing. Senectus et netus et malesuada fames. Est placerat in egestas erat. Magna ac placerat vestibulum lectus mauris. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Eleifend mi in nulla posuere sollicitudin. Vehicula ipsum a arcu cursus.
  
  Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. In aliquam sem fringilla ut morbi tincidunt augue interdum velit. Aliquam nulla facilisi cras fermentum odio. Nibh sit amet commodo nulla facilisi nullam vehicula. Mollis nunc sed id semper risus. Id aliquet lectus proin nibh nisl condimentum id venenatis. Aenean sed adipiscing diam donec adipiscing tristique risus. Nibh nisl condimentum id venenatis a condimentum vitae. Massa enim nec dui nunc. Phasellus egestas tellus rutrum tellus pellentesque. Pellentesque diam volutpat commodo sed egestas. Arcu ac tortor dignissim convallis aenean et tortor at risus. Faucibus et molestie ac feugiat sed lectus vestibulum. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec. Ipsum nunc aliquet bibendum enim facilisis. \n bye!`,
  date: "2021-10-10",
  // time: "10:00",
  // receiver: "Everyone",
  // sender: "Jesse Pinkman",
};
const MockMessage2 = {
  title: "Small mock message",
  message: "This is a small mock message \n bye!",
  date: "2023-04-27",
  // time: "23:59",
  // receiver: "Everyone",
  // sender: "Walter White",
};

const styles = StyleSheet.create({
  text: {
    paddingTop: 40,
    fontFamily: "main-font-bold",
    fontSize: 32,
    color: Colors.arkadNavy,
  },
});
