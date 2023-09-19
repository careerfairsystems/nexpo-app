import { StyleSheet } from "react-native";
import { ArkadButton } from "./Buttons";
import { ArkadText } from "./StyledText";
import * as Linking from "expo-linking";
import { API } from "api/API";
import React from "react";
import { AuthDispatchContext } from "./AuthContextProvider";

export default function SSO() {
  const setSignedIn = React.useContext(AuthDispatchContext);

  const sso = () => {
    console.log("Attempting to do SSO stuff");
    API.sso.InitiateSSO(setSignedIn);
  };

  return (
    <ArkadButton onPress={sso} style={styles.button}>
      <ArkadText text="Sign in with SSO" style={styles.text} />
    </ArkadButton>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "50%",
    alignSelf: "center",
  },
  text: {},
});
