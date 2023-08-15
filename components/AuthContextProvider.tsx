import { API } from 'api/API';
import React, { useState } from 'react';

type Props = {
  children?: React.ReactNode;
}

type AuthenticationDispatchContext = React.Dispatch<React.SetStateAction<boolean>>;
const defaultAuthDispatchContext = () => {console.error("Using AuthDispatchContext outside provider, check that a parent provides a real context")};

const AuthContext = React.createContext<boolean>(false); // possibly throw an error here
const AuthDispatchContext = React.createContext<AuthenticationDispatchContext>(defaultAuthDispatchContext);

function AuthContextProvider({ children }: Props) {
    const [isSignedIn, setSignedIn] = useState<boolean>(false)

    React.useEffect(() => {
      const bootstrap = async () => {
        const authenticated = await API.auth.isAuthenticated();
        setSignedIn(authenticated);
      };
  
      bootstrap();
    }, []);

    return (
        <AuthContext.Provider value={isSignedIn}>
          <AuthDispatchContext.Provider value={setSignedIn}>
            {children}
          </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthDispatchContext, AuthContextProvider };