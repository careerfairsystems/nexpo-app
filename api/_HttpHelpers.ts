import Constants from "expo-constants";
import { isAuthenticated, getJwt } from "./_AuthState";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

const backendUrl: string = Constants.manifest?.extra?.backendUrl;

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
  });
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
  });
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
  });
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
  });
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
  });
};

// Function to convert a data URI to a Blob
function dataURItoBlob(dataURI: string) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}

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
    if (Platform.OS !== "web") {
      const response = FileSystem.uploadAsync(apiUrl(endpoint), dataUri, {
        fieldName: "file",
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      });
      return response;
    } else {
      const formData = new FormData();
      const blob = dataURItoBlob(dataUri);

      console.log(blob)

      // Append the Blob to the formData
      formData.append('file', blob, '932.jpg'); // Adjust the file name as needed
    
      const response = await fetch(apiUrl(endpoint), {
        method: 'POST',
        headers: {
          },
        body: formData,
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    
      // Parse and return the response data
      const responseData = await response.json();
      return responseData;
    }
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
  });
};
