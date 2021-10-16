import { deleteAuth, postAuthFile } from "../http/_HttpHelpers"


/**
 * Upload a new profile picture
 */
export const updateProfilePicture = async (fileUri: string): Promise<boolean> => {
  const response = await postAuthFile('/files/profile_picture', fileUri);
  return response.ok;
}

/**
 * Upload a new company logo
 */
export const updateCompanyLogo = async (fileUri: string): Promise<boolean> => {
  const response = await postAuthFile('/files/company_logo', fileUri);
  return response.ok;
}

/**
 * Upload a new english resume
 */
export const updateResumeEnglish = async (fileUri: string): Promise<boolean> => {
  const response = await postAuthFile('/files/resume_english', fileUri);
  return response.ok;
}

/**
 * Upload a new swedish resume
 */
export const updateResumeSwedish = async (fileUri: string): Promise<boolean> => {
  const response = await postAuthFile('/files/resume_swedish', fileUri);
  return response.ok;
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
