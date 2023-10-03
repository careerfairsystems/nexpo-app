import { getAuth, postAuth, putAuth } from "./_HttpHelpers";
import { Programme } from "./Students";

export interface SSApplication {
  id: number;
  motivation: string;
  status: number;
  studentId: number;
  companyId: number;
  booked: boolean;
}

export interface SSApplicationDto {
  id: number;
  motivation: string;
  status: number;
  studentId: number;
  companyId: number;
  booked: boolean;
  studentFirstName: string;
  studentLastName: string;
  studentYear: number;
  studentProgramme: Programme;
}
export interface UpdateApplicationDto {
  status: number;
}
export interface ApplicationAcceptedDto {
  accepted: boolean;
  booked: boolean;
}
export const getApplications = async (): Promise<SSApplicationDto[]> => {
  const response = await getAuth(`/applications/my/company`);
  const json = await response?.json();
  const Applications = json as SSApplicationDto[];
  return Applications;
};
export const getApplicationAccepted = async (
  companyId: number
): Promise<ApplicationAcceptedDto> => {
  const response = await getAuth(`/applications/accepted/${companyId}`);
  const json = await response?.json();
  const accepted = json as ApplicationAcceptedDto;
  return accepted;
};
export const getStudentApplications = async (): Promise<SSApplication[]> => {
  const response = await getAuth(`/applications/my/student`);
  const json = await response?.json();
  const Applications = json as SSApplication[];
  return Applications;
};
export const getApplication = async (applicationId: number): Promise<SSApplication> => {
  const response = await getAuth(`/applications/${applicationId}`);
  const json = await response?.json();
  const Applications = json as SSApplication;
  return Applications;
};
export const sendApplication = async (companyId: number, msg: string) => {
  await postAuth(`/applications/company/${companyId}`, { motivation: msg });
};
export const changeApplication = async (applicationId: number, status: UpdateApplicationDto) => {
  await putAuth(`/applications/${applicationId}`, status);
};

/**
 * Returns the application for a given student.
 */
export const getApplicationForStudent = async (
  studentId: number
): Promise<SSApplication | undefined> => {
  const response = await getAuth(`/applications/my/company`);
  const json = await response?.json();
  const applications = json as SSApplication[];
  const application = applications.find(
    (application: SSApplication) => application.studentId === studentId
  );
  return application;
};
