import React, { useEffect, useState } from 'react';
import { UpdateUserDto, User } from '../../api/users';
import ProfilePicture from '../ProfilePicture';
import { View, Text } from '../Themed';
import { Platform, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { TextInput } from '../TextInput';
import { EditStatus } from '../../screens/EditProfileScreen';
import { ArkadButton } from '../Buttons';
import { ArkadText } from '../StyledText';
import { API } from '../../api';
import * as ImagePicker from 'expo-image-picker';

type EditUserProfileProps = {
  user: User;
  setUpdateUserDto: (dto: UpdateUserDto) => void;
  setEditStatus: (status: EditStatus) => void;
}

export default function EditUserProfile({ user, setUpdateUserDto, setEditStatus }: EditUserProfileProps) {
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(user.profilePictureUrl);
  const [firstName, setFirstName] = useState<string | null>(user.firstName);
  const [lastName, setLastName] = useState<string | null>(user.lastName);
  const [phoneNr, setPhoneNr] = useState<string | null>(user.phoneNr);
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  useEffect(() => {
    // TODO Validate password strength with zxvcbn
    if (password && password.length < 8) {
      setEditStatus({
        ok: false,
        message: 'Password is not strong enough',
      });
    }
    else if (password && password !== repeatPassword) {
      setEditStatus({
        ok: false,
        message: 'Passwords does not match',
      });
    }
    else {
      setEditStatus({
        ok: true,
        message: null,
      })
    }

    const dto = {
      firstName,
      lastName,
      phoneNr,
      password,
    }
    setUpdateUserDto(dto);

  }, [firstName, lastName, phoneNr, password, repeatPassword])

  const setProfilePicture = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('We need camera roll permissions to upload a new profile picture');
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      const dto = await API.files.updateProfilePicture(result.base64 ? result.base64 : result.uri);
      setProfilePictureUrl(dto.url);
    }
  }

  const removeProfilePicture = async () => {
    await API.files.removeProfilePicture();
    setProfilePictureUrl(null);
  }

  return <>
    <View style={styles.container}>
      <ProfilePicture url={profilePictureUrl} />
      <ArkadButton onPress={setProfilePicture}>
        {profilePictureUrl 
        ? <ArkadText text="Change profile picture" />
        : <ArkadText text="Set profile picture" />
        }
      </ArkadButton>
      {profilePictureUrl &&
        <ArkadButton onPress={removeProfilePicture}>
          <ArkadText text="Remove profile picture" />
        </ArkadButton>
      }

      <Text>First name</Text>
      <TextInput style={styles.textInput}
        value={firstName ? firstName : ''} placeholder="John" onChangeText={setFirstName}/>

      <Text>Last name</Text>
      <TextInput style={styles.textInput}
        value={lastName ? lastName : ''} placeholder="Doe" onChangeText={setLastName}/>

      <Text>Phone number</Text>
      <TextInput style={styles.textInput}
        value={phoneNr ? phoneNr : ''} placeholder="076-1234567" onChangeText={setPhoneNr}/>

      <Text>Password</Text>
      <TextInput style={styles.textInput}
        secureTextEntry placeholder="New password" onChangeText={setPassword}/>
      <TextInput style={styles.textInput}
        secureTextEntry placeholder="Repeat password" onChangeText={setRepeatPassword}/>
    </View>
  </>;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  nameLabel: {
    paddingTop: 8,
    paddingBottom: 16,
    fontSize: 24,
    fontFamily: 'montserrat',
    color: Colors.darkBlue,
  },
  textInput: {
    width: '80%',
    maxWidth: 400,
  },
});
