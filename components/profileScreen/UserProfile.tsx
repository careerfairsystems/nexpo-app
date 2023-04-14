import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { User } from 'api/Users';
import ProfilePicture from '../ProfilePicture';
import { View, Text } from '../Themed';
import { StyleSheet } from 'react-native';
import Colors from 'constants/Colors';
import { Role } from 'api/Role';

type UserProfileProps = {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  return <>
    <View style={styles.container}>
      <ProfilePicture url={user.profilePictureUrl} />
      <Text style={styles.nameLabel}>{`${user.firstName} ${user.lastName}`}</Text>
      <Text style={styles.accountTypeText}>
        {Role[user.role]}
      </Text>

      <View style={styles.contactInfoContainer}>
        <Ionicons name="mail" size={16} color={Colors.arkadNavy} />
        <Text style={styles.contactInfoText}>{user.email}</Text>
      </View>
      <View style={styles.contactInfoContainer}>
        <Ionicons name="call" size={16} color={Colors.arkadNavy} />
        <Text style={styles.contactInfoText}>{ user.phoneNr ? user.phoneNr : '\u2013'}</Text>
      </View>
      <View style={styles.contactInfoContainer}>
        <Ionicons name="pizza" size={16} color={Colors.arkadNavy} />
        <Text style={styles.contactInfoText}>{ user.foodPreferences ? user.foodPreferences : '\u2013'}</Text>
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
    fontSize: 32,
    fontFamily: 'main-font-bold',
    color: Colors.arkadNavy,
  },
  contactInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 4,
  },
  contactInfoText: {
    fontSize: 18,
    paddingLeft: 8,
    fontFamily: 'main-font-bold',
    color: Colors.arkadNavy,
  },
  accountTypeText: {
    fontFamily: 'main-font',
    color: Colors.arkadNavy,
    fontSize: 16
  }
});
