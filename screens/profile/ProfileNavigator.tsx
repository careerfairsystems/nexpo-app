import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import * as React from "react";
import { HeaderStyles } from "components/HeaderStyles";
import ProfileScreen from "./ProfileScreen";
import ProfileSwitchScreen from "./ProfileSwitchScreen";
import { Image } from "react-native";

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  EditProfileScreen: undefined;
  ProfileSwitchScreen: {
    screen: string;
    id: number;
  };
};
const ProfileStack = createStackNavigator<ProfileStackParamList>();
export function ProfileNavigator() {
  return (
    <ProfileStack.Navigator
      screenOptions={{ 
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true }}
    >
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerTitle: "Profile",
          headerRight: () => (
            <Image
              source={require("../../assets/images/arkad_logo.png")}
              style={{
                marginRight: 10,
                width: 60,
                height: undefined,
                flex: 1,
              }}
            />
          ),
          ...HeaderStyles,
        }}
      />
      <ProfileStack.Screen
        name="ProfileSwitchScreen"
        component={ProfileSwitchScreen}
        options={{
          headerTitle: "Profile",
          headerRight: () => (
            <Image
              source={require("../../assets/images/arkad_logo.png")}
              style={{
                marginRight: 10,
                width: 60,
                height: undefined,
                flex: 1,
              }}
            />
          ),
          ...HeaderStyles,
        }}
      />
    </ProfileStack.Navigator>
  );
}
