import React, { useState } from "react";
import { Image, ActivityIndicator, StyleSheet } from "react-native";

import { Text, View } from "components/Themed";
import { TextInput } from "components/TextInput";

import { ArkadButton } from "components/Buttons";
import { ArkadText } from "components/StyledText";

import { API } from "api/API";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "./AuthNavigator";
import Toast from "react-native-toast-message";

type ResetPasswordScreenParams = {
  navigation: StackNavigationProp<AuthStackParamList, "ResetPasswordScreen">;
  route: {
    params: {
      token: string;
    };
  };
};

export default function ResetPasswordScreen({
  navigation,
  route,
}: ResetPasswordScreenParams) {
  const { token } = route.params;
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const resetPassword = async () => {
    if (password.length < 8) {
      Toast.show({
        type: "error",
        text1: "Password is too weak",
        text2: "Please choose a stronger one",
        visibilityTime: 5000,
      });
      return;
    }

    if (password !== repeatPassword) {
      Toast.show({
        type: "error",
        text1: "Passwords does not match",
        text2: "Please make sure they are the same",
        visibilityTime: 5000,
      });
      return;
    }

    setLoading(true);

    console.log(token);
    const success = await API.auth.resetPassword(token, password);

    setLoading(false);

    if (!success) {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
        text2: "Please try again later",
        visibilityTime: 5000,
      });
    } else {
      alert("Success, the new password is set. Redirecting to the login page.");
      navigation.navigate("LoginScreen");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/images/arkad_logo_inverted.png")}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="New password"
          secureTextEntry
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Repeat password"
          secureTextEntry
          onChangeText={setRepeatPassword}
          onSubmitEditing={resetPassword}
        />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <ArkadButton onPress={resetPassword} style={{}}>
            <ArkadText text="Reset password" style={{}} />
          </ArkadButton>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  inputContainer: {
    width: "80%",
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
