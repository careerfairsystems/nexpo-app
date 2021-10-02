import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

import { API } from '../api'
import { UserInformation } from '../api/users';
import ScreenActivityIndicator from '../components/ScreenActivityIndicator';
import { ArkadButton } from '../components/Buttons';
import { ButtonText } from '../components/StyledText';
import { AuthContext } from '../components/AuthContext';

export default function ProfileScreen() {
  const [userInformation, setUserInformation] = useState<UserInformation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const authContext = useContext(AuthContext);

  const getUserInformation = async () => {
    setLoading(true);

    const userInformation = await API.users.getMe();
    setUserInformation(userInformation);

    setLoading(false);
  }

  useEffect(() => {
    getUserInformation();
  }, []);

  const logout = async () => {
    await API.auth.logout();
    authContext.signOut();
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

        <ArkadButton onPress={logout}>
          <ButtonText text='Logout'></ButtonText>
        </ArkadButton> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
