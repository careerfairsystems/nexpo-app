import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { UpdateUserDto, User } from '../../api/users';
import ProfilePicture from '../ProfilePicture';
import { View, Text } from '../Themed';
import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { TextInput } from '../TextInput';
import { EditStatus } from '../../screens/EditProfileScreen';

type EditUserProfileProps = {
  user: User;
  setUpdateUserDto: (dto: UpdateUserDto) => void;
  setEditStatus: (status: EditStatus) => void;
}

export default function EditUserProfile({ user, setUpdateUserDto, setEditStatus }: EditUserProfileProps) {
  const [firstName, setFirstName] = React.useState<string | null>(user.firstName);
  const [lastName, setLastName] = React.useState<string | null>(user.lastName);
  const [phoneNr, setPhoneNr] = React.useState<string | null>(user.phoneNr);
  const [password, setPassword] = React.useState<string>('');
  const [repeatPassword, setRepeatPassword] = React.useState<string>('');

  React.useEffect(() => {
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

  return <>
    <View style={styles.container}>
      <ProfilePicture url={user.profilePictureUrl} />

      <Text>First name</Text>
      <TextInput value={firstName ? firstName : ''} placeholder="John" onChangeText={setFirstName}/>

      <Text>Last name</Text>
      <TextInput value={lastName ? lastName : ''} placeholder="Doe" onChangeText={setLastName}/>

      <Text>Phone number</Text>
      <TextInput value={phoneNr ? phoneNr : ''} placeholder="076-1234567" onChangeText={setPhoneNr}/>

      <Text>Password</Text>
      <TextInput secureTextEntry placeholder="New password" onChangeText={setPassword}/>
      <TextInput secureTextEntry placeholder="Repeat password" onChangeText={setRepeatPassword}/>
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
  contactInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 4,
  },
  contactInfoText: {
    fontSize: 14,
    paddingLeft: 8,
    fontFamily: 'montserrat',
    color: Colors.darkBlue,
  }
});
