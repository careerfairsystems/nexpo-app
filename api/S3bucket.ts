import { deleteAuth, getAuth, postAuthFile } from "./_HttpHelpers";

export interface FileCreatedDto {
  url: string;
}

export const postToS3 = async (
  dataUri: string,
  userId: string,
  fileType: string
): Promise<String> => {
  const response = await postAuthFile(`/awss3/${userId + fileType}`, dataUri);
  return JSON.stringify(response);
};

export const deleteOnS3 = async (userId: string, fileType: string): Promise<boolean> => {
  const response = await deleteAuth(`/awss3/${userId + fileType}`);
  return response.ok;
};

export const getFromS3 = async (userId: string, fileType: string): Promise<string> => {
  const response = await getAuth(`/awss3/${userId + fileType}`);
  return response.url;
};
