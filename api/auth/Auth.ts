import * as AuthState from './_AuthState';
import { post } from '../http/_HttpHelpers';

export const login = async (email: string, password: string): Promise<boolean> => {
  const result = await post('/session/signin', { email, password });

  if (!result.ok) return false;

  const jwt = (await result.json()).token;
  await AuthState.setJwt(jwt);

  return true;
}
  
export const isAuthenticated = (): Promise<boolean> => {
  return AuthState.isAuthenticated();
}

export const getJwt = (): Promise<string> => {
    return AuthState.getJwt();
  }

export const logout = (): Promise<void> => {
  return AuthState.deleteJwt();
}
