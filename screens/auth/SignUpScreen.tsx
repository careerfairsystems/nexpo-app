import React, { useState } from 'react';
import { Image, ActivityIndicator, StyleSheet, Pressable, Linking, ScrollView } from 'react-native';

import { Text, View } from '../../components/Themed';
import { TextInput } from '../../components/TextInput';

import { ArkadButton } from '../../components/Buttons';
import { ArkadText } from '../../components/StyledText';

import { API } from '../../api'
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from "./AuthNavigator";
import Colors from '../../constants/Colors';
import { Checkbox } from '../../components/Checkbox';

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
      alert('You must accept Arkads Privacy policy to sign up');
      return;
    }
    setLoading(true);
    const success = await API.signup.initialSignUp({ email: email.toLowerCase(), firstName, lastName });
    setLoading(false);

    if (success.ok) {
      alert('Account created, check your email for a link to finalize it before you can use it');
    } else if (success.status === 409) {
      alert('Email already in use');
    } else {
      alert('Something went wrong, please try again');
    }
  }

  return (
    <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled" style={{flex: 1}} contentContainerStyle={styles.container}>
      <Image 
        style={styles.logo} 
        source={require('../../assets/images/arkad_logo.png')} 
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
          text="I accept Arkads privacy policy"            
          onPress={(value) => setCheckboxState(!value)}
          style={invalidSignUp ? styles.checkboxError : styles.checkbox}
        />
        <Pressable style={styles.policyContainer} onPress={() => Linking.openURL("https://www.arkadtlth.se/privacypolicy") }>
          <ArkadText style={styles.loginText} text={"See privacy policy"}/>
        </Pressable>
        { loading
        ? <ActivityIndicator/>
        : <ArkadButton onPress={signUp} style={{}}>
          <ArkadText text='Sign Up' style={{}}/>
        </ArkadButton>
        }
        <Pressable style={styles.loginContainer} onPress={() => navigation.navigate('LoginScreen') }>
          <ArkadText style={styles.loginText} text={"Already have an account? Login here!"}/>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    fontSize: 18,
    color: Colors.darkBlue,
    marginLeft: 12,
  },
  checkboxError: {
    fontSize: 18,
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  loginContainer: {
    marginTop: 20,
    padding: 16,
  },
  policyContainer: {
    padding: 16,
    margin: 5,
  },
  loginText: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: Colors.darkBlue,
  }
});
