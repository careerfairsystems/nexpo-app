import React, { useState } from "react";
import {
  Image,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Linking,
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
import { Checkbox } from "components/Checkbox";
import Toast from "react-native-toast-message";

type SignUpScreenParams = {
  navigation: StackNavigationProp<AuthStackParamList, "SignUpScreen">;
};

export default function SignUpScreen({ navigation }: SignUpScreenParams) {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [checkboxState, setCheckboxState] = useState<boolean>(false);
  const [invalidSignUp, setInvalidSignUp] = useState<boolean>(false);

  const signUp = async () => {
    if (!checkboxState) {
      setInvalidSignUp(true);
      Toast.show({
        type: "error",
        text1: "You must accept ARKADs Privacy policy to sign up",
        visibilityTime: 5000,
      });
      return;
    }
    setLoading(true);
    const success = await API.signup.initialSignUp({
      email: email.toLowerCase(),
      firstName,
      lastName,
    });
    setLoading(false);

    if (success.ok) {
      Toast.show({
        type: "success",
        text1: "Account created",
        text2:
          "Check your email for a link to finalize it before you can use it",
        visibilityTime: 5000,
      });
      navigation.navigate("LoginScreen");
    } else if (success.status === 409) {
      Toast.show({
        type: "error",
        text1: "Email already in use",
        text2: "Please use another email",
        visibilityTime: 5000,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
        text2: "Please try again",
        visibilityTime: 5000,
      });
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
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={setEmail}
          style={{ borderColor: Colors.white, color: Colors.white }}
        />
        <TextInput
          placeholder="First Name"
          onChangeText={setFirstName}
          style={{ borderColor: Colors.white, color: Colors.white }}
        />
        <TextInput
          placeholder="Last Name"
          onChangeText={setLastName}
          style={{ borderColor: Colors.white, color: Colors.white }}
        />
        <Checkbox
          text="I accept ARKADs privacy policy"
          onPress={(value) => setCheckboxState(!value)}
          style={invalidSignUp ? styles.checkboxError : styles.checkbox}
        />
        <Pressable
          style={styles.policyContainer}
          onPress={() =>
            Linking.openURL("https://www.arkadtlth.se/privacypolicy")
          }
        >
          <ArkadText style={styles.loginText} text={"See privacy policy"} />
        </Pressable>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <ArkadButton onPress={signUp} style={{}}>
            <ArkadText text="Sign Up" style={{}} />
          </ArkadButton>
        )}
        <Pressable
          style={styles.loginContainer}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <ArkadText
            style={styles.loginText}
            text={"Already have an account? Login here!"}
          />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    fontSize: 18,
    color: Colors.white,
    marginLeft: 12,
  },
  checkboxError: {
    fontSize: 18,
    color: Colors.lightRed,
    marginLeft: 12,
  },
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
  loginContainer: {
    marginTop: 20,
    padding: 16,
  },
  policyContainer: {
    padding: 16,
    margin: 5,
  },
  loginText: {
    textAlign: "center",
    textDecorationLine: "underline",
    color: Colors.arkadTurkos,
  },
});
