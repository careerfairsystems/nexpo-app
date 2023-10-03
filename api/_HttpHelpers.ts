import Constants from "expo-constants";
import { isAuthenticated, getJwt } from "./_AuthState";
import * as FileSystem from "expo-file-system";

const backendUrl: string = Constants.manifest?.extra?.backendUrl;

/**
 * Check status code on response object before returning and gracefully
 * exit if code is not 2xx
 * @param response fetch response object
 * @returns response if 2xx status, undefined otherwise
 */
const statusCodeCallback = (response: Response): Response | undefined => {
  if (response.ok)
    return response;

  console.error(`Something went wrong, status: ${response.statusText} (${response.status})`)
}

/**
 * Return the full url to a api endpoint
 * @param endpoint the endpoint to reach
 */
const apiUrl = (endpoint: string): string => {
  return `${backendUrl}${endpoint}`;
};

/**
 * Make a GET request to the api
 * @param endpoint the endpoint to reach
 */
export const get = (endpoint: string) => {
  return fetch(apiUrl(endpoint), {
    headers: {
      Accept: "application/json",
    },
  }).then(statusCodeCallback);
};

/**
 * Make a POST request to the api
 * @param endpoint the endpoint to reach
 * @param body the body to send
 */
export const post = (endpoint: string, body: any) => {
  return fetch(apiUrl(endpoint), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then(statusCodeCallback);
};

/**
 * Make an authenticated GET request to the api
 * @param endpoint the endpoint to reach
 */
export const getAuth = async (endpoint: string) => {
  if (!(await isAuthenticated())) {
    // TODO Raise some kind of exception
    console.error("getAuth: Not authenticated");
  }
  const jwt = await getJwt();
  return fetch(apiUrl(endpoint), {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(statusCodeCallback);
};

/**
 * Make an authenticated PUT request to the api
 * @param endpoint the endpoint to reach
 * @param body the body to send
 */
export const putAuth = async (endpoint: string, body: any) => {
  if (!(await isAuthenticated())) {
    // TODO Raise some kind of exception
    console.error("putAuth: Not authenticated");
  }
  const jwt = await getJwt();
  return fetch(apiUrl(endpoint), {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(body),
  }).then(statusCodeCallback);
};

/**
 * Make an authenticated POST request to the api
 * @param endpoint the endpoint to reach
 * @param body the body to send
 */
export const postAuth = async (endpoint: string, body: any) => {
  if (!(await isAuthenticated())) {
    // TODO Raise some kind of exception
    console.error("postAuth: Not authenticated");
  }
  const jwt = await getJwt();
  return fetch(apiUrl(endpoint), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(body),
  }).then(statusCodeCallback);
};

/**
 *
 * @param endpoint
 * @returns
 */
export const postAuthFile = async (endpoint: string, dataUri: string) => {
  if (!(await isAuthenticated())) {
    console.error("postAuthFile: Not authenticated");
  }
  try {
    const response = FileSystem.uploadAsync(apiUrl(endpoint), dataUri, {
      fieldName: "file",
      httpMethod: "POST",
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    });
    return response;
  } catch (error) {
    console.log(error);
    return "something went wrong";
  }
};

/**
 * Make an authenticated DELETE request to the api
 * @param endpoint the endpoint to reach
 */
export const deleteAuth = async (endpoint: string) => {
  if (!(await isAuthenticated())) {
    // TODO Raise some kind of exception
    console.error("deleteAuth: Not authenticated");
  }
  const jwt = await getJwt();
  return fetch(apiUrl(endpoint), {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(statusCodeCallback);
};
