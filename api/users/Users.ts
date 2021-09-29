import { getAuth } from '../http/HttpHelpers';

export type UserInformation = {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  phone_number: string,
  food_preferences: string,
}

export const getMe = async (): Promise<UserInformation> => {
  const response = await getAuth('/me');
  const json = await response.json();
  const userInformation = <UserInformation>json.data;
  return userInformation;
}
