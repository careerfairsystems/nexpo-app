import { getAuth, putAuth } from "./_HttpHelpers";

export enum Programme {
  Fire_Protection_Engineering,
  Mechanical_Engineering_with_Industrial_Design,
  Electrical_Engineering,
  Environmental_Engineering,
  Mechanical_engineering,
  Engineering_Nanoscience,
  Engineering_Biotechnology,
  Industrial_Design,
  Architecture,
  Information_and_Communication_Engineering,
  Chemical_Engineering,
  Construction_and_Railway_Construction,
  Civil_Engineering,
  Construction_and_Architecture,
  Industrial_Economics_and_Management,
  Engineering_Mathematics,
  Biomedical_Engineering,
  Surveying,
  Computer_Science_Engineering,
  Engineering_Physics,
  Road_and_Traffic_Technology,
  Automation,
  Automotive,
  Risk_Safety_and_Crisis_Management,
}

export interface Student {
  id: number;
  programme: Programme | null;
  resumeEnUrl: string | null;
  resumeSvUrl: string | null;
  linkedIn: string | null;
  masterTitle: string | null;
  year: number | null;
  userId: number;
}

export interface UpdateStudentDto {
  programme?: Programme | null;
  linkedIn?: string | null;
  masterTitle?: string | null;
  year?: number | null;
}

/**
 * Get a specific student. Requires Administrator role or that a connection exists
 */
export const getStudent = async (studentId: number): Promise<Student> => {
  const response = await getAuth(`/students/${studentId}`);
  const json = await response?.json();
  const student = json as Student;
  return student;
};

/**
 * Update a specific student. Requires Administrator role
 */
export const updateStudent = async (studentId: number, dto: UpdateStudentDto): Promise<Student> => {
  const response = await putAuth(`/students/${studentId}`, dto);
  const json = await response?.json();
  const student = json as Student;
  return student;
};

/**
 * Get the currently signed in student
 */
export const getMe = async (): Promise<Student> => {
  const response = await getAuth("/students/me");
  const json = await response?.json();
  const student = json as Student;
  return student;
};

/**
 * Update the signed in student
 */
export const updateMe = async (dto: UpdateStudentDto): Promise<Student> => {
  const response = await putAuth("/students/me", dto);
  const json = await response?.json();
  const student = json as Student;
  return student;
};
