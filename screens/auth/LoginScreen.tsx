import React, { useState } from "react";
import {
  Image,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";

import { View } from "components/Themed";
import { TextInput } from "components/TextInput";

import { ArkadButton } from "components/Buttons";
import { ArkadText } from "components/StyledText";

import { API } from "api/API";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "./AuthNavigator";
import Colors from "constants/Colors";
import { AuthDispatchContext } from "components/AuthContextProvider";

import SSO from "components/SSO";
import Toast from "react-native-toast-message";

type LoginScreenParams = {
  navigation: StackNavigationProp<AuthStackParamList, "LoginScreen">;
};

export default function LoginScreen({ navigation }: LoginScreenParams) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const setSignedIn = React.useContext(AuthDispatchContext);
  const [loginEmail, setLoginEmail] = useState<boolean>(false);

  const login = async () => {
    if (!loginEmail) {
      setLoginEmail(true);
      return;
    }
    // We get errors when unmounting for some reason, this might be a solution:
    // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
    // but I am not too sure of the call stack in this async call, it should be fine as the unmount is the last call
    // It is probably because the state updates don't happen immediately.
    setLoading(true);

    const success = await API.auth.login(email.toLowerCase(), password);

    setLoading(false);
    if (success.status === 400) {
      Toast.show({
        type: "error",
        text1: "Wrong email or password",
        visibilityTime: 5000, 
      });
    } else if (!success.ok) {
      Toast.show({
        type: "error",
        text1: "Something went wrong, please try again",
        visibilityTime: 5000,
      });
    } else {
      setSignedIn(true);
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
        <SSO />
        {loginEmail && (
          <View>
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={setEmail}
              onSubmitEditing={login}
              style={{ borderColor: Colors.white, color: Colors.white }}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              onChangeText={setPassword}
              onSubmitEditing={login}
              style={{ borderColor: Colors.white, color: Colors.white }}
            />
          </View>
        )}
        {loading ? (
          <ActivityIndicator />
        ) : (
          <ArkadButton onPress={login} style={styles.loginButton}>
            <ArkadText text="Sign in with Account" style={{}} />
          </ArkadButton>
        )}
        <Pressable
          style={styles.signUpContainer}
          onPress={() => navigation.navigate("SignUpScreen")}
        >
          <ArkadText
            style={styles.signUpText}
            text={"Don't have an account? Sign up here!"}
          />
        </Pressable>
        <Pressable
          style={styles.signUpContainer}
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <ArkadText style={styles.signUpText} text={"Forgot your password?"} />
        </Pressable>
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
  signUpContainer: {
    marginTop: 20,
    padding: 16,
  },
  signUpText: {
    textAlign: "center",
    textDecorationLine: "underline",
    color: Colors.arkadTurkos,
  },
  loginButton: {
    width: "65%",
    alignSelf: "center",
  },
});
