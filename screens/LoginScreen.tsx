import React, { useEffect, useState } from 'react';
import { Image, ActivityIndicator, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { TextInput } from '../components/TextInput';

import { ArkadButton } from '../components/Buttons';
import { ButtonText } from '../components/StyledText';

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
      <Image 
        style={styles.logo} 
        source={require('../assets/images/arkad_logo.png')} 
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email" 
          keyboardType="email-address"
          onChangeText={setEmail} />
        <TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword} />
        { loading
          ? <ActivityIndicator/>
          : <ArkadButton
            onPress={login}>
              <ButtonText text='Login'></ButtonText>
          </ArkadButton>
        }
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
