import React, { useEffect, useState } from 'react';
import { Image, ActivityIndicator, StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { TextInput } from '../components/TextInput';

import { ArkadButton } from '../components/Buttons';
import { ArkadText } from '../components/StyledText';

import { API } from '../api'
import { AuthContext } from '../components/AuthContext';

export default function SignUpScreen() {
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const signUp = async () => {
    setLoading(true);
    const success = await API.signup.initialSignUp({ email, firstName, lastName });
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
        { loading
        ? <ActivityIndicator/>
        : <ArkadButton onPress={signUp} style={{}}>
          <ArkadText text='Sign Up' style={{}}/>
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
