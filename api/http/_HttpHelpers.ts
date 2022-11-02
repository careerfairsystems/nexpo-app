import Constants from 'expo-constants';
import { isAuthenticated, getJwt } from '../auth/_AuthState';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';


const backendUrl: string = Constants.manifest?.extra?.backendUrl;

/**
 * Return the full url to a api endpoint
 * @param endpoint the endpoint to reach
 */
const apiUrl = (endpoint: string): string => {
  return `${backendUrl}${endpoint}`
}

/**
 * Make a GET request to the api
 * @param endpoint the endpoint to reach
 */
export const get = (endpoint: string) => {
  return fetch(apiUrl(endpoint), {
    headers: {
      'Accept': 'application/json',
    }
  });
}

/**
 * Make a POST request to the api
 * @param endpoint the endpoint to reach
 * @param body the body to send
 */
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

/**
 * Make an authenticated GET request to the api
 * @param endpoint the endpoint to reach
 */
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

/**
 * Make an authenticated PUT request to the api
 * @param endpoint the endpoint to reach
 * @param body the body to send
 */
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

/**
 * Make an authenticated POST request to the api
 * @param endpoint the endpoint to reach
 * @param body the body to send
 */
export const postAuth = async (endpoint: string, body: any) => {
  if (!await isAuthenticated()) {
    // TODO Raise some kind of exception
    console.error('postAuth: Not authenticated');
  }
  const jwt = await getJwt();
  return fetch(apiUrl(endpoint), {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify(body)
  });
}

/**
 * 
 * @param endpoint 
 * @returns 
 */
export const postAuthFile = async (endpoint: string, dataUri: string) => {
  if (!await isAuthenticated()) {
    // TODO Raise some kind of exception
    console.error('postAuthFile: Not authenticated');
  }
  const jwt = await getJwt();

  const data = new FormData();
  const blob = await (await fetch(dataUri)).blob();
  data.append('file', blob);

  //'Authorization': `Bearer ${jwt}`,
  return fetch(apiUrl(endpoint), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
    body: data,
  });
}
export const postAuthFile2 = async (endpoint: string, b: Blob) => {
  if (!await isAuthenticated()) {
    // TODO Raise some kind of exception
    console.log('postAuthFile: Not authenticated')
    console.error('postAuthFile: Not authenticated');
  }
  
  const jwt = await getJwt();

  //console.log("uri")
  //'Content-Type': 'application/pdf',
  const data = new FormData();
  data.append('file', b);
  return fetch('https://nexpo.arkadtlth.se/api/awss3/-3.pdf', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${jwt}`
    },
    body: data,
  });
}

export const postAuthFile3 = async (endpoint: string, dataUri: string) => {
  if (!await isAuthenticated()) {
    // TODO Raise some kind of exception
    console.error('postAuthFile: Not authenticated');
  }
  const jwt = await getJwt();

  const data = new FormData();
  const blob = await (await fetch(dataUri)).blob();
  data.append('file', blob )

  //'Authorization': `Bearer ${jwt}`,
  return fetch('https://nexpo.arkadtlth.se/api/awss3/-3.pdf', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
    body: data,
  });
}

/**
 * Make an authenticated DELETE request to the api
 * @param endpoint the endpoint to reach
 */
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
