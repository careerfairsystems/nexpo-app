import Constants from 'expo-constants';
import { isAuthenticated, getJwt } from '../auth/AuthState';

const baseUrl: string = Constants.manifest.extra?.backendUrl;

export const post = (endpoint: string, body: any ) => {
  return fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });
} 

export const get = (endpoint: string) => {
  return fetch(`${baseUrl}${endpoint}`, {
    headers: {
      'Accept': 'application/json',
    }
  });
}

export const getAuth = async (endpoint: string) => {
  if (!await isAuthenticated()) {
    // TODO Raise some kind of exception
    console.error('getAuth: Not authenticated');
  }
  const jwt = await getJwt();
  return fetch(`${baseUrl}${endpoint}`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    }
  });
}
