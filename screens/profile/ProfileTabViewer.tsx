import React from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { StyleSheet } from "react-native";
import Colors from "constants/Colors";

function ProfileTabViewer(props: { profile: any; contacts: any }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Profile" },
    { key: "second", title: "Contact List" },
  ]);

  const renderScene = SceneMap({
    first: props.profile,
    second: props.contacts,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Colors.arkadOrange }}
      style={{ backgroundColor: Colors.arkadNavy }}
      labelStyle={{
        fontWeight: "bold",
        fontFamily: "main-font",
        fontSize: 20,
      }}
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
