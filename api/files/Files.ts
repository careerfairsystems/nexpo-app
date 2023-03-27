import { deleteAuth, postAuthFile } from "../http/_HttpHelpers"

export interface FileCreatedDto {
  url: string;
}

/**
 * Upload a new profile picture
 */
export const updateProfilePicture = async (dataUri: string): Promise<FileCreatedDto> => {
  const response = await postAuthFile('/files/profile_picture', dataUri);
  const json = await response.json();
  const dto = json as FileCreatedDto;
  return dto;
}

/**
 * Upload a new company logo
 */
export const updateCompanyLogo = async (dataUri: string): Promise<FileCreatedDto> => {
  const response = await postAuthFile('/files/company_logo', dataUri);
  const json = await response.json();
  const dto = json as FileCreatedDto;
  return dto;
}

/**
 * Upload a new english resume
 */
export const updateResumeEnglish = async (dataUri: string): Promise<FileCreatedDto> => {
  const response = await postAuthFile('/files/resume_english', dataUri);
  const json = await response.json();
  const dto = json as FileCreatedDto;
  return dto;
}

/**
 * Upload a new swedish resume
 */
export const updateResumeSwedish = async (dataUri: string): Promise<FileCreatedDto> => {
  const response = await postAuthFile('/files/resume_swedish', dataUri);
  const json = await response.json();
  const dto = json as FileCreatedDto;
  return dto;
}

/**
 * Remove the profile picture
 */
export const removeProfilePicture = async (): Promise<boolean> => {
  const response = await deleteAuth('/files/profile_picture');
  return response.ok;
}

/**
 * Remove the company logo
 */
export const removeCompanyLogo = async (): Promise<boolean> => {
  const response = await deleteAuth('/files/company_logo');
  return response.ok;
}

/**
 * Remove the english resume
 */
export const removeResumeEnglish = async (): Promise<boolean> => {
  const response = await deleteAuth('/files/resume_english');
  return response.ok;
}

/**
 * Remove the swedish resume
 */
export const removeResumeSwedish = async (): Promise<boolean> => {
  const response = await deleteAuth('/files/resume_swedish');
  return response.ok;
}
