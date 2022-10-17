import React, { useState } from 'react';
import { Image, ActivityIndicator, StyleSheet, Pressable } from 'react-native';

import { Text, View } from '../components/Themed';
import { TextInput } from '../components/TextInput';

import { ArkadButton } from '../components/Buttons';
import { ArkadText } from '../components/StyledText';

import { API } from '../api'
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation';
import Colors from '../constants/Colors';
import { Checkbox } from '../components/Checkbox';

type SignUpScreenParams = {
  navigation: StackNavigationProp<
    AuthStackParamList,
    'SignUpScreen'
  >;
};

export default function SignUpScreen({ navigation }: SignUpScreenParams) {
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [checkboxState, setCheckboxState] = useState<boolean>(false);
  const [invalidSignUp, setInvalidSignUp] = useState<boolean>(false);

  const signUp = async () => {
    if(!checkboxState) {
      setInvalidSignUp(true);
      alert('You must accept the terms and conditions to sign up');
      return;
    }
    setLoading(true);
    const success = await API.signup.initialSignUp({ email: email.toLowerCase(), firstName, lastName });
    setLoading(false);

    if (success) {
      alert('Account created, check your email for a link to finalize it before you can use it');
    } else {
      alert('Something went wrong, please try again');
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
          placeholder="First Name"
          onChangeText={setFirstName} />
        <TextInput
          placeholder="Last Name"
          onChangeText={setLastName} />
        <Checkbox
          text="I accept that Arkad will store my data in accordance with the GDPR"            
          onPress={(value) => setCheckboxState(!value)}
          style={invalidSignUp ? styles.checkboxError : styles.checkbox}
        />
        { loading
        ? <ActivityIndicator/>
        : <ArkadButton onPress={signUp} style={{}}>
          <ArkadText text='Sign Up' style={{}}/>
        </ArkadButton>
        }
        <Pressable style={styles.loginContainer} onPress={() => navigation.navigate('LoginScreen') }>
          <Text style={styles.loginText}>Already have an account? Login here!</Text>
        </Pressable>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    fontSize: 14,
    color: Colors.darkBlue,
    marginLeft: 12,
  },
  checkboxError: {
    fontSize: 14,
    color: Colors.lightRed,
    marginLeft: 12,
  },
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
  loginContainer: {
    marginTop: 20,
    padding: 16,
  },
  loginText: {
    textAlign: 'center',
    textDecorationLine: 'underline',
  }
});
