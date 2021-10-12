import { post } from '../http/_HttpHelpers';

export type SignUpUserDto = {
  email: string;
  firstName: string;
  lastName: string;
}

export type FinalizeSignUpDto = {
  token: string;
  password: string;
}

export const initialSignUp = async (dto: SignUpUserDto): Promise<boolean> => {
  const response = await post('/signup/initial', dto);
  return response.ok;
}

export const finalizeSignUp = async (dto: FinalizeSignUpDto): Promise<boolean> => {
  const response = await post('/signup/finalize', dto);
  return response.ok;
}
