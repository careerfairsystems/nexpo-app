import React from "react";
import { View, Text } from "components/Themed";
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import Colors from "constants/Colors";

function ProfileTabViewer(props: {profile: any, contacts: any}) {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Profile' },
      { key: 'second', title: 'Contact List' },
    ]);
  
    const renderScene = SceneMap({
      first: props.profile,
      second: props.contacts,
    });
  
    return (
        <TabView
          style={styles.tabViewer}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      );
    }

  export default ProfileTabViewer;

  const styles = StyleSheet.create({
    tabViewer: {
      backgroundColor: Colors.white,
    },
  });
