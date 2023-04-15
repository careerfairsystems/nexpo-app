import * as AuthState from "./_AuthState";
import { post } from "./_HttpHelpers";
import { getMe } from "./Users";
import { Role } from "./Role";

export const login = async (email: string, password: string): Promise<Response> => {
  const result = await post("/session/signin", { email, password });

  if (!result.ok) return result;

  const jwt = (await result.json()).token;
  await AuthState.setJwt(jwt);

  const user = await getMe();
  await AuthState.setUserRole(user.role);

  return result;
};

export const isAuthenticated = (): Promise<boolean> => {
  return AuthState.isAuthenticated();
};

export const getJwt = (): Promise<string> => {
  return AuthState.getJwt();
};

export const getUserRole = (): Promise<Role> => {
  return AuthState.getUserRole();
};

export const logout = async (): Promise<void> => {
  await AuthState.deleteJwt();
  await AuthState.deleteUserRole();
};

export const forgotPassword = async (email: string): Promise<boolean> => {
  const response = await post("/session/forgot_password", { email });
  return response.ok;
};

export const resetPassword = async (token: string, password: string): Promise<boolean> => {
  const response = await post("/session/reset_password", { token, password });
  return response.ok;
};
