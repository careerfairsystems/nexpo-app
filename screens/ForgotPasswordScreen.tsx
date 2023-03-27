import React, { useEffect, useState } from 'react';
import { Image, ActivityIndicator, StyleSheet, Pressable } from 'react-native';

import { Text, View } from '../components/Themed';
import { TextInput } from '../components/TextInput';

import { ArkadButton } from '../components/Buttons';
import { ArkadText } from '../components/StyledText';

import { API } from '../api'
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation';

type ForgotPasswordScreenParams = {
  navigation: StackNavigationProp<
    AuthStackParamList,
    'ForgotPasswordScreen'
  >;
};

export default function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenParams) {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const forgotPassword = async () => {
    if (email.length === 0) return;

    setLoading(true);
    
    const success = await API.auth.forgotPassword(email.toLowerCase());

    setLoading(false);

    if (!success) {
      alert('Something went wrong, please try again later');
    }
    else {
      alert('If the email exists you will now recieve a link to reset your password. Please check your spam filter if you can\'t find it.');
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
          onChangeText={setEmail}
          onSubmitEditing={forgotPassword} />
        { loading
          ? <ActivityIndicator/>
          : <ArkadButton onPress={forgotPassword} style={{}}>
              <ArkadText text='Submit' style={{}}/>
          </ArkadButton>
        }
        <ArkadButton onPress={() => navigation.navigate('LoginScreen')} style={{}}>
          <ArkadText text='Back' style={{}}/>
        </ArkadButton>
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
});
