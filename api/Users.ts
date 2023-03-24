import { Linking } from 'react-native';
import { Role } from './Role';
import { getFromS3 } from './S3bucket';
import { getAuth, putAuth, deleteAuth } from './_HttpHelpers';
export interface User {
  id: number;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
  phoneNr: string | null;
  foodPreferences: string | null;
  hasProfilePicture: boolean | null;
  companyId: number | null;
  hasCv: boolean | null;
  profilePictureUrl: string | null;
}

export interface UpdateUserDto {
  firstName?: string | null;
  lastName?: string | null;
  phoneNr?: string | null;
  foodPreferences?: string | null;
  password?: string | null;
  hasCv?: boolean | null;
  profilePictureUrl?: string | null;
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
export const downloadFile = async (userId: number, fileType: string) => {
  try {
    const Uri = await getFromS3(userId.toString(), fileType)
    Linking.canOpenURL(Uri).then((supported) => {
      return Linking.openURL(Uri);
    });
  }
  catch (error) {
    console.log(error);
    alert('No CV found');
  }
}