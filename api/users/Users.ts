import { Linking } from 'react-native';
import { API } from '../API';
import { getAuth, putAuth, deleteAuth } from '../http/_HttpHelpers';

export interface User {
  id: number;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
  phoneNr: string | null;
  foodPreferences: string | null;
  profilePictureUrl: string | null;
  companyId: number | null;
  hasCv: boolean | null;
}

export enum Role {
  Administrator,
  Student,
  CompanyRepresentative,
}

export interface UpdateUserDto {
  firstName?: string | null;
  lastName?: string | null;
  phoneNr?: string | null;
  foodPreferences?: string | null;
  password?: string | null;
  hasCv?: boolean | null;
}

/**
 * Get all users. Requires Administrator role
 */
export const getAllUsers = async (): Promise<User[]> => {
  const response = await getAuth('/users');
  const json = await response.json();
  const users = json as User[];
  return users;
}

/**
 * Get a single user. Requires Administrator role or CompanyRepresentative if a student has conencted with the company
 */
export const getUser = async (userId: number): Promise<User> => {
  const response = await getAuth(`/users/${userId}`);
  const json = await response.json();
  const user = json as User;
  return user;
}

/**
 * Get a single user. Requires Administrator role
 */
export const updateUser = async (userId: number, dto: UpdateUserDto): Promise<User> => {
  const response = await putAuth(`/users/${userId}`, dto);
  const json = await response.json();
  const user = json as User;
  return user;
}

/**
 * Remove a single user. Requires Administrator role
 */
export const removeUser = async (userId: number): Promise<boolean> => {
  const response = await deleteAuth(`/users/${userId}`);
  return response.ok;
}

/**
 * Get the currently signed in user
 */
export const getMe = async (): Promise<User> => {
  const response = await getAuth('/users/me');
  const json = await response.json();
  const user = json as User;
  return user;
}

/**
 * Update the currently signed in user
 */
export const updateMe = async (dto: UpdateUserDto): Promise<User> => {
  const response = await putAuth('/users/me', dto);
  const json = await response.json();
  const user = json as User;
  return user;
}

/**
 * Remove the currently signed in user
 */
export const removeMe = async (): Promise<boolean> => {
  const response = await deleteAuth('/users/me');
  return response.ok;
}

/**
 * Download user CV
 */
export const downloadCV = async (userId: number) => {
  try {
    const Uri = await API.s3bucket.getFromS3(userId.toString())
    Linking.canOpenURL(Uri).then((supported) => {
      return Linking.openURL(Uri);
    });
  }
  catch (error) {
    console.log(error);
    alert('No CV found');
  }
}