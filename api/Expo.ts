import { post, postAuth } from "./_HttpHelpers";

export type RegisterUserDTO = {
  Token: string;
  Topic: string;
};

export const registerExpo = async (dto: RegisterUserDTO): Promise<Response> => {
  // Corrected the endpoint to include the notifications path
  const response = await postAuth("/notification/register", dto);
  return response;
};

