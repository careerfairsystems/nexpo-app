import { post } from "./_HttpHelpers";

export type RegisterUserDTO = {
  token: string;
  topic: string;
};

export const registerFirebase = async (dto: RegisterUserDTO): Promise<Response> => {
  const response = await post("/register", dto);
  return response;
};
