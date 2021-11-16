import * as AuthState from './_AuthState';
import { post } from '../http/_HttpHelpers';
import { getMe, Role } from '../users';

export const login = async (email: string, password: string): Promise<boolean> => {
  const result = await post('/session/signin', { email, password });

  if (!result.ok) return false;

  const jwt = (await result.json()).token;
  await AuthState.setJwt(jwt);

  const user = await getMe();
  await AuthState.setUserRole(user.role);

  return true;
}
  
export const isAuthenticated = (): Promise<boolean> => {
  return AuthState.isAuthenticated();
}

export const getJwt = (): Promise<string> => {
  return AuthState.getJwt();
}

export const getUserRole = (): Promise<Role> => {
  return AuthState.getUserRole();
}

export const logout = async (): Promise<void> => {
  await AuthState.deleteJwt();
  await AuthState.deleteUserRole();
}

export const forgotPassword = async (email: string): Promise<boolean> => {
  const response = await post('/session/forgot_password', { email });
  return response.ok;
}

export const resetPassword = async (token: string, password: string): Promise<boolean> => {
  const response = await post('/session/reset_password', { token, password });
  return response.ok;
}
