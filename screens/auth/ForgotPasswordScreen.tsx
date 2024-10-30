import React, { useState } from "react";
import { Image, ActivityIndicator, StyleSheet, ScrollView } from "react-native";

import { View } from "components/Themed";
import { TextInput } from "components/TextInput";

import { ArkadButton } from "components/Buttons";
import { ArkadText } from "components/StyledText";

import { API } from "api/API";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "./AuthNavigator";
import Colors from "constants/Colors";

type ForgotPasswordScreenParams = {
  navigation: StackNavigationProp<AuthStackParamList, "ForgotPasswordScreen">;
};

export default function ForgotPasswordScreen({
  navigation,
}: ForgotPasswordScreenParams) {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const forgotPassword = async () => {
    if (email.length === 0) return;

    setLoading(true);

    const success = await API.auth.forgotPassword(email.toLowerCase());

    setLoading(false);

    if (!success) {
      alert("Something went wrong, please try again later");
    } else {
      alert(
        "If the email exists you will now recieve a link to reset your password. Please check your spam filter if you can't find it."
      );
    }
  };

  return (
    <ScrollView
      scrollEnabled={false}
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
    >
      <Image
        style={styles.logo}
        source={require("../../assets/images/arkad_logo_inverted.png")}
      />
      <View style={styles.inputContainer}>
        <ArkadText text="Email" style={styles.inputTitle} />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={setEmail}
          onSubmitEditing={forgotPassword}
          style={{
            borderColor: Colors.white,
            color: Colors.black,
            backgroundColor: Colors.white,
            paddingTop: 15,
          }}
        />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <ArkadButton
            onPress={forgotPassword}
            style={{ backgroundColor: Colors.arkadTurkos }}
          >
            <ArkadText text="Submit" style={{}} />
          </ArkadButton>
        )}
        <ArkadButton
          onPress={() => navigation.navigate("LoginScreen")}
          style={{}}
        >
          <ArkadText text="Back" style={{}} />
        </ArkadButton>
      </View>
    </ScrollView>
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

  inputTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "left",
    paddingLeft: 12,
    marginBottom: -10,
  },
});
