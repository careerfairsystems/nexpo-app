import React, { useEffect, useState } from 'react';
import { Image, ActivityIndicator, StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { TextInput } from '../components/TextInput';

import { ArkadButton } from '../components/Buttons';
import { ArkadText } from '../components/StyledText';

import { API } from '../api'
import { AuthContext } from '../components/AuthContext';

export default function LoginScreen() {
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
    
    const success = await API.auth.login(email, password);

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
          : <ArkadButton onPress={login} style={{}}>
              <ArkadText text='Login' style={{}}/>
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
