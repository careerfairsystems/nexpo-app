import React, { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { StyleSheet } from "react-native";
import Colors from "constants/Colors";

function ProfileTabViewer(props: {
  profile?: any;
  contacts?: any;
  messages?: any;
  admin?: any;
  question?: any;
  faq?: any;
}) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes] = props.admin // Admin
    ? React.useState([
        { key: "first", title: "Profile" },
        { key: "second", title: "Admin" },
        { key: "third", title: "Messages" },
        { key: "fourth", title: "Contact List" },
        { key: "fifth", title: "FAQ" },
        { key: "sixth", title: "Questions" },
      ])
    : props.messages // Volunteer
    ? React.useState([
        { key: "first", title: "Profile" },
        { key: "second", title: "Messages" },
        { key: "third", title: "Contact List" },
        { key: "fourth", title: "FAQ" },
        { key: "fifth", title: "Questions" },
      ])
    : Object.keys(props).length === 2 // Student
    ? React.useState([
        { key: "first", title: "Profile" },
        { key: "second", title: "Questions" },
      ])
    : React.useState([
        // Company representative
        { key: "first", title: "Profile" },
        { key: "second", title: "Contact List" },
        { key: "third", title: "Questions" },
      ]);

  const renderScene = props.admin
    ? SceneMap({
        first: props.profile,
        second: props.admin,
        third: props.messages,
        fourth: props.contacts,
        fifth: props.faq,
        sixth: props.question,
      })
    : props.messages
    ? SceneMap({
        first: props.profile,
        second: props.messages,
        third: props.contacts,
        fourth: props.faq,
        fifth: props.question,
      })
    : Object.keys(props).length === 2
    ? SceneMap({
        first: props.profile,
        second: props.question,
      })
    : SceneMap({
        first: props.profile,
        second: props.contacts,
        third: props.question,
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
