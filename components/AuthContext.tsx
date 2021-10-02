import * as React from 'react';

type AuthenticationContext = {
  signIn: () => void;
  signOut: () => void;
}

const defaultAuthContext = {
  signIn: () => {
    console.error('Using AuthContext outside provider, check that a parent provides a real context');
  },
  signOut: () => {
    console.error('Using AuthContext outside provider, check that a parent provides a real context');
  }
}
export const AuthContext = React.createContext<AuthenticationContext>(defaultAuthContext);
