import { post } from "./_HttpHelpers";

export type RegisterUserDTO = {
  token: string;
  topic: string;
};

export const registerFirebase = async (dto: RegisterUserDTO): Promise<Response> => {
  const response = await post("/register", dto);

  if (!response)
    return {status: 400, statusText: "Something went wrong"} as Response;
  
  return response;
};
