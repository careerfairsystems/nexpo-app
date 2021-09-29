import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

import { API } from '../api'
import { UserInformation } from '../api/users';
import ScreenActivityIndicator from '../components/ScreenActivityIndicator';
import { PrimaryButton } from '../components/Buttons';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileParamList } from '../types';

type ProfileScreenParams = {
  navigation: StackNavigationProp<ProfileParamList, 'ProfileScreen'>;
}

export default function ProfileScreen({ navigation }: ProfileScreenParams) {
  const [userInformation, setUserInformation] = useState<UserInformation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getUserInformation = async () => {
    setLoading(true);
    const userInformation = await API.users.getMe();
    console.log(userInformation)
    setUserInformation(userInformation);
    setLoading(false);
  }

  useEffect(() => {
    getUserInformation();
  }, []);

  const logout = async () => {
    await API.auth.logout();
    
    navigation.dangerouslyGetParent()?.dangerouslyGetParent()?.navigate('Login');
  };

  if (loading) {
    return (<ScreenActivityIndicator />);
  }
  else {
    return (
      <View style={styles.container}>
        <Text>{userInformation?.first_name}</Text>
        <Text>{userInformation?.last_name}</Text>
        <Text>{userInformation?.email}</Text>

        <PrimaryButton title="Logout" onPress={logout} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
