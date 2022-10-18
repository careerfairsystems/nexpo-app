import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import FinalizeSignUpScreen from './FinalizeSignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import ResetPasswordScreen from './ResetPasswordScreen';


export type AuthStackParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  FinalizeSignUpScreen: {
    token: string;
  };
  ForgotPasswordScreen: undefined;
  ResetPasswordScreen: {
    token: string;
  };
};
const AuthStack = createStackNavigator<AuthStackParamList>();
export function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="LoginScreen">
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }} />
      <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: 'Sign up' }} />
      <AuthStack.Screen name="FinalizeSignUpScreen" component={FinalizeSignUpScreen} options={{ title: 'Finalize signup' }} />
      <AuthStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ title: 'Forgot password' }} />
      <AuthStack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{ title: 'Reset password' }} />
    </AuthStack.Navigator>
  );
}
