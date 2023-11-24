import { post, postAuth } from "./_HttpHelpers";

export type RegisterUserDTO = {
  Token: string;
  Topic: string;
};

export const registerFirebase = async (dto: RegisterUserDTO): Promise<Response> => {
  // Corrected the endpoint to include the notifications path
  const response = await postAuth("/notification/register", dto);

  if (!response)
    return {status: 400, statusText: "Something went wrong"} as Response;

  return response;
};

