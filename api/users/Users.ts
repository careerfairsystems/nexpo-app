import { getAuth } from '../http/HttpHelpers';

export type User = {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  phoneNr?: string,
  foodPreferences?: string,
}

export const getMe = async (): Promise<User> => {
  const response = await getAuth('/users/me');
  const json = await response.json();
  const user = json as User;
  return user;
}
