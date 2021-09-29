import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { TextInput } from '../components/TextInput';
import { PrimaryButton } from '../components/Buttons';

import { API } from '../api'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (await API.auth.isAuthenticated()) {
        navigation.navigate('Root');
      }
    })();
  })

  const login = async () => {
    setLoading(true);
    
    const success = await API.auth.login(email, password);

    setLoading(false);

    if (!success) {
      alert('Login not successful');
    }
    else {
      navigation.navigate('Root');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email" 
        keyboardType="email-address"
        onChangeText={setEmail}
        style={styles.input} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input} />
      { loading
        ? <ActivityIndicator />
        : <PrimaryButton
            title="Login"
            onPress={login} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
  },
});