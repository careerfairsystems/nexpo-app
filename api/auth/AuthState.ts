import * as SecureStore from 'expo-secure-store';

const SECURE_STORE_AUTH_JWT = 'SECURE_STORE_AUTH_JWT';

export const isAuthenticated = async (): Promise<boolean> => {
  const jwt = await SecureStore.getItemAsync(SECURE_STORE_AUTH_JWT);
  return jwt != null;
}

export const getJwt = async (): Promise<string> => {
  return await SecureStore.getItemAsync(SECURE_STORE_AUTH_JWT) || '';
}

export const setJwt = (jwt: string): Promise<void> => {
  return SecureStore.setItemAsync(SECURE_STORE_AUTH_JWT, jwt);
}

export const deleteJwt = (): Promise<void> => {
  return SecureStore.deleteItemAsync(SECURE_STORE_AUTH_JWT);
}
