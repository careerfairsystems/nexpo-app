import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { User } from '../../api/users';
import ProfilePicture from '../ProfilePicture';
import { View, Text } from '../Themed';
import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

type UserProfileProps = {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  return <>
    <View style={styles.container}>
      <ProfilePicture url={user.profilePictureUrl} />
      <Text style={styles.nameLabel}>{`${user.firstName} ${user.lastName}`}</Text>

      <View style={styles.contactInfoContainer}>
        <Ionicons name="mail" size={16} color={Colors.darkBlue} />
        <Text style={styles.contactInfoText}>{user.email}</Text>
      </View>
      <View style={styles.contactInfoContainer}>
        <Ionicons name="call" size={16} color={Colors.darkBlue} />
        <Text style={styles.contactInfoText}>{ user.phoneNr ? user.phoneNr : '\u2013'}</Text>
      </View>
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
