import React, { useEffect, useState } from 'react';
import { Image, ActivityIndicator, StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import { TextInput } from '../../components/TextInput';

import { ArkadButton } from '../../components/Buttons';
import { ArkadText } from '../../components/StyledText';

import { AuthStackParamList } from "./AuthNavigator";

import { API } from '../../api'
import { StackNavigationProp } from '@react-navigation/stack';

type FinalizeSignUpScreenParams = {
  route: {
    params: {
      token: string;
    };
  };
  navigation: StackNavigationProp<
    AuthStackParamList,
    'FinalizeSignUpScreen'
  >;
}

export default function FinalizeSignUpScreen({ route, navigation }: FinalizeSignUpScreenParams) {
  const token = decodeURIComponent(route.params.token);

  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const finalizeSignUp = async () => {
    if (password != passwordConfirm) {
      alert('Passwords does not match');
      return;
    }

    // TODO Change this for something better, maybe zxcvbn password strength
    if (password.length < 8) {
      alert('Password is weak, choose a stronger one');
      return;
    }

    setLoading(true);
    const success = await API.signup.finalizeSignUp({ token, password });
    setLoading(false);

    if (success) {
      alert('Account is now created fully. You will now be redirected to the signin page');
      navigation.navigate('LoginScreen');
    } else {
      alert('Something went wrong, maybe the token expired');
    }
  }
  
  return (
    <View style={styles.container}>
      <Image 
        style={styles.logo} 
        source={require('../../assets/images/arkad_logo.png')} 
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password" 
          secureTextEntry
          onChangeText={setPassword} />
        <TextInput
          placeholder="Confirm password"
          secureTextEntry
          onChangeText={setPasswordConfirm} />
        {loading
          ? <ActivityIndicator/>
          : <ArkadButton onPress={finalizeSignUp} style={{}}>
              <ArkadText text='Save' style={{}}/>
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
    fontSize: 24,
    fontWeight: 'bold',
  },
});
