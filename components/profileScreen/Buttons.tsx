import React from "react"
import { ArkadText } from "../StyledText"
import { StyleSheet } from 'react-native';
import { ArkadButton } from "../Buttons";
import Colors from "../../constants/Colors";

type EditProfileParams = {
  editingProfile: boolean,
  onPress: () => void,
}

export const EditProfileButton = ({ editingProfile, onPress }: EditProfileParams) =>
  <ArkadButton
    onPress={onPress}
    style={editingProfile ? styles.editing : styles.buttonContainer}>
    <ArkadText
      text={editingProfile ? 'Save' : 'Edit profile'}
      style={styles.logoutText} />
  </ArkadButton>

type ButtonPressParams = {
  onPress: () => void,
}

export const LogoutButton = ({ onPress }: ButtonPressParams) => 
  <ArkadButton onPress={onPress} style={styles.buttonContainer}>
    <ArkadText text='Logout' style={styles.logoutText} />
  </ArkadButton>

export const ScanQRButton = ({ onPress }: ButtonPressParams) => 
  <ArkadButton onPress={onPress} style={styles.buttonContainer}>
    <ArkadText text='Scan QR' style={styles.logoutText} />
  </ArkadButton> 

const styles = StyleSheet.create({
  logoutText: {
    padding: '1%',
    alignItems: 'center',
  },
  buttonContainer: {
    alignSelf: 'center',
    padding: '4%',
    marginBottom: '2%',
    width: '45%',
  },
  editing: {
    alignSelf: 'center',
    padding: '4%',
    marginBottom: '2%',
    width: '85%',
    backgroundColor: Colors.lightGreen
  },
});