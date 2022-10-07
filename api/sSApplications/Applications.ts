import { getAuth, postAuth, putAuth } from "../http/_HttpHelpers";


export interface SSApplication {
  id: number;
  motivation: string;
  status: number;
  studentId: number;
  companyId: number;
  booked: boolean;
}
export interface UpdateApplicationDto {
  status: number;
}
export interface ApplicationAcceptedDto {
  accepted: boolean;
  booked: boolean;
}
export const getApplications = async (): Promise<SSApplication[]> => {
  const response = await getAuth(`/applications/my/company`);
  const json = await response.json();
  const Applications = json as SSApplication[];
  return Applications;
}
export const getApplicationAccepted = async (companyId: number): Promise<ApplicationAcceptedDto> => {
  const response = await getAuth(`/applications/accepeted/${companyId}`);
  const json = await response.json();
  const accepted = json as ApplicationAcceptedDto;
  return accepted;
}
export const getStudentApplications = async (): Promise<SSApplication[]> => {
  const response = await getAuth(`/applications/my/student`);
  const json = await response.json();
  const Applications = json as SSApplication[];
  return Applications;
}
export const getApplication = async (applicationId: number): Promise<SSApplication> => {
  const response = await getAuth(`/applications/${applicationId}`);
  const json = await response.json();
  const Applications = json as SSApplication;
  return Applications;
}
export const sendApplication = async (companyId: number, msg: string) => {
  await postAuth(`/applications/company/${companyId}`, {motivation: msg});
};
export const changeApplication = async(applicationId: number, status: UpdateApplicationDto) => {
  await putAuth(`/applications/${applicationId}`, status);
}
