import React from "react"
import { ArkadText } from "../StyledText"
import { StyleSheet } from 'react-native';
import { ArkadButton } from "../Buttons";
import Colors from "constants/Colors";

type EditProfileParams = {
  editingProfile: boolean,
  onPress: () => void,
}

export const EditProfileButton = ({ editingProfile, onPress }: EditProfileParams) =>
  <ArkadButton
    onPress={onPress}
    style={editingProfile ? styles.editing : styles.buttonContainer1}>
    <ArkadText
      text={editingProfile ? 'Save' : 'Edit profile'}
      style={styles.logoutText} />
  </ArkadButton>

type ButtonPressParams = {
  onPress: () => void,
}

export const LogoutButton = ({ onPress }: ButtonPressParams) => 
  <ArkadButton onPress={onPress} style={styles.buttonContainer2}>
    <ArkadText text='Logout' style={styles.logoutText} />
  </ArkadButton>

export const LoginButton = ({ onPress }: ButtonPressParams) =>
  <ArkadButton onPress={onPress} style={styles.buttonContainer2}>
    <ArkadText text='Login' style={styles.logoutText} />
  </ArkadButton>

export const ScanQRButton = ({ onPress }: ButtonPressParams) => 
  <ArkadButton onPress={onPress} style={styles.buttonContainer1}>
    <ArkadText text='Scan QR' style={styles.logoutText} />
  </ArkadButton> 

const styles = StyleSheet.create({
  logoutText: {
    padding: '1%',
    alignItems: 'center',
  },
  buttonContainer1: {
    alignSelf: 'center',
    padding: '4%',
    marginBottom: '2%',
    width: '45%',
  },
  buttonContainer2: {
    alignSelf: 'center',
    padding: '4%',
    marginBottom: '2%',
    width: '45%',
    backgroundColor: Colors.arkadNavy,
  },
  editing: {
    alignSelf: 'center',
    padding: '4%',
    marginBottom: '2%',
    width: '85%',
    backgroundColor: Colors.lightGreen
  },
});