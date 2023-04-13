import * as SecureStore from 'expo-secure-store';
import { Role } from "./Role";

/**
 * A storage adapter that implements the same methods as SecureStore. This is
 * only used where SecureStore is not available (eg Web) and makes it run on
 * web targets during development.
 */
class LocalStorageAdapter {
  static getItemAsync = (key: string): Promise<string | null> => {
    return Promise.resolve(localStorage.getItem(key));
  }

  static setItemAsync = (key: string, value: string): Promise<void> => {
    return Promise.resolve(localStorage.setItem(key, value));
  }

  static deleteItemAsync = (key: string): Promise<void> => {
    return Promise.resolve(localStorage.removeItem(key));
  }
}

const SECURE_STORE_AUTH_JWT = 'SECURE_STORE_AUTH_JWT';
const SECURE_STORE_USER_ROLE = 'SECURE_STORE_USER_ROLE';

const getStore = async () => {
  if (await SecureStore.isAvailableAsync()) {
    return SecureStore;
  }
  else {
    return LocalStorageAdapter;
  }
}

export const setUserRole = async (role: Role): Promise<void> => {
  const store = await getStore();
  return await store.setItemAsync(SECURE_STORE_USER_ROLE, Role[role]);
}

export const getUserRole = async (): Promise<Role> => {
  const store = await getStore();
  const roleName = await store.getItemAsync(SECURE_STORE_USER_ROLE) || '';
  switch (roleName) {
    case 'Administrator': return Role.Administrator;
    case 'Student': return Role.Student;
    case 'CompanyRepresentative': return Role.CompanyRepresentative;
    case 'Volunteer': return Role.Volunteer;
    default: throw new Error(`Role of name "${roleName}" could not be parsed`);
  }
}

export const deleteUserRole = async (): Promise<void> => {
  const store = await getStore();
  return await store.deleteItemAsync(SECURE_STORE_USER_ROLE);
}

export const isAuthenticated = async (): Promise<boolean> => {
  const store = await getStore();
  const jwt = await store.getItemAsync(SECURE_STORE_AUTH_JWT);
  return jwt != null;
}

export const getJwt = async (): Promise<string> => {
  const store = await getStore();
  return await store.getItemAsync(SECURE_STORE_AUTH_JWT) || '';
}

export const setJwt = async (jwt: string): Promise<void> => {
  const store = await getStore();
  return store.setItemAsync(SECURE_STORE_AUTH_JWT, jwt);
}

export const deleteJwt = async (): Promise<void> => {
  const store = await getStore();
  return store.deleteItemAsync(SECURE_STORE_AUTH_JWT);
}
