import React, { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { StyleSheet } from "react-native";
import Colors from "constants/Colors";

function ProfileTabViewer(props: {
  profile: any;
  contacts: any;
  messages?: any;
  admin?: any;
}) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes] = props.admin
    ? React.useState([
        { key: "first", title: "Profile" },
        { key: "second", title: "Contact List" },
        { key: "third", title: "Messages" },
        { key: "fourth", title: "Admin" },
      ])
    : props.messages
    ? React.useState([
        { key: "first", title: "Profile" },
        { key: "second", title: "Contact List" },
        { key: "third", title: "Messages" },
      ])
    : React.useState([
        { key: "first", title: "Profile" },
        { key: "second", title: "Contact List" },
      ]);

  const renderScene = props.admin
    ? SceneMap({
        first: props.profile,
        second: props.contacts,
        third: props.messages,
        fourth: props.admin,
      })
    : props.messages
    ? SceneMap({
        first: props.profile,
        second: props.contacts,
        third: props.messages,
      })
    : SceneMap({
        first: props.profile,
        second: props.contacts,
      });

  useEffect(() => {});

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Colors.arkadTurkos }}
      style={{ backgroundColor: Colors.arkadOrange, color: Colors.white }}
      labelStyle={{
        fontFamily: "main-font-bold",
        fontSize: 20,
      }}
      scrollEnabled={true}
    />
  );

  return (
    <TabView
      style={styles.tabViewer}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}

export default ProfileTabViewer;

const styles = StyleSheet.create({
  tabViewer: {
    backgroundColor: Colors.white,
  },
});
