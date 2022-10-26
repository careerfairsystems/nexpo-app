import React, { useEffect, useState } from 'react';
import { Image, ActivityIndicator, StyleSheet, Pressable } from 'react-native';

import { Text, View } from '../../components/Themed';
import { TextInput } from '../../components/TextInput';

import { ArkadButton } from '../../components/Buttons';
import { ArkadText } from '../../components/StyledText';

import { API } from '../../api'
import { AuthContext } from '../../components/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from "./AuthNavigator";
import Colors from '../../constants/Colors';

type LoginScreenParams = {
  navigation: StackNavigationProp<
    AuthStackParamList,
    'LoginScreen'
  >;
};

export default function LoginScreen({ navigation }: LoginScreenParams) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const authContext = React.useContext(AuthContext);

  const login = async () => {
    // We get errors when unmounting for some reason, this might be a solution: 
    // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
    // but I am not too sure of the call stack in this async call, it should be fine as the unmount is the last call
    // It is probably because the state updates don't happen immediately.
    setLoading(true);
    
    const success = await API.auth.login(email.toLowerCase(), password);

    setLoading(false);

    if (!success) {
      alert('Login not successful');
    }
    else {
      authContext.signIn();
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
          placeholder="Email" 
          keyboardType="email-address"
          onChangeText={setEmail}
          onSubmitEditing={login} />
        <TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          onSubmitEditing={login} />
        { loading
          ? <ActivityIndicator/>
          : <ArkadButton onPress={login} style={styles.loginButton}>
              <ArkadText text='Login' style={{}}/>
          </ArkadButton>
        }
        <Pressable style={styles.signUpContainer} onPress={() => navigation.navigate('SignUpScreen') }>
          <Text style={styles.signUpText}>Don't have an account? Sign up here!</Text>
        </Pressable>
        <Pressable style={styles.signUpContainer} onPress={() => navigation.navigate('ForgotPasswordScreen') }>
          <Text style={styles.signUpText}>Forgot your password?</Text>
        </Pressable>
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
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  signUpContainer: {
    marginTop: 20,
    padding: 16,
  },
  signUpText: {
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  loginButton: {
    width: '45%',
    alignSelf: 'center',
  }
});
