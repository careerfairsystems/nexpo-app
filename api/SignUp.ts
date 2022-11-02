import { post } from './HttpHelpers';

export type SignUpUserDto = {
  email: string;
  firstName: string;
  lastName: string;
}

export type FinalizeSignUpDto = {
  token: string;
  password: string;
}

export const initialSignUp = async (dto: SignUpUserDto): Promise<Response> => {
  const response = await post('/signup/initial', dto);
  return response;
}

export const finalizeSignUp = async (dto: FinalizeSignUpDto): Promise<boolean> => {
  const response = await post('/signup/finalize', dto);
  return response.ok;
}
