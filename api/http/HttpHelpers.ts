import Constants from 'expo-constants';
import { isAuthenticated, getJwt } from '../auth/AuthState';

const baseUrl: string = Constants.manifest.extra?.backendUrl;

export const apiUrl = (endpoint: string): string => {
  return `${baseUrl}${endpoint}`
}

export const get = (endpoint: string) => {
  return fetch(apiUrl(endpoint), {
    headers: {
      'Accept': 'application/json',
    }
  });
}

export const post = (endpoint: string, body: any) => {
  return fetch(apiUrl(endpoint), {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });
}

export const getAuth = async (endpoint: string) => {
  if (!await isAuthenticated()) {
    // TODO Raise some kind of exception
    console.error('getAuth: Not authenticated');
  }
  const jwt = await getJwt();
  return fetch(apiUrl(endpoint), {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    }
  });
}

export const putAuth = async (endpoint: string, body: any) => {
  if (!await isAuthenticated()) {
    // TODO Raise some kind of exception
    console.error('putAuth: Not authenticated');
  }
  const jwt = await getJwt();
  return fetch(apiUrl(endpoint), {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify(body)
  });
}

export const deleteAuth = async (endpoint: string) => {
  if (!await isAuthenticated()) {
    // TODO Raise some kind of exception
    console.error('deleteAuth: Not authenticated');
  }
  const jwt = await getJwt();
  return fetch(apiUrl(endpoint), {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    }
  });
}
