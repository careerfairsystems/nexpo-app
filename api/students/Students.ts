import { getAuth, putAuth } from '../http/_HttpHelpers';

export enum Guild {
  A, D, E, F, I, ING, K, M, V, W
}

export interface Student {
  id: number;
  guild: Guild | null;
  resumeEnUrl: string | null;
  resumeSvUrl: string | null;
  linkedIn: string | null;
  masterTitle: string | null;
  year: number | null;
  userId: number;
}

export interface UpdateStudentDto {
  guild?: Guild | null;
  linkedIn?: string | null;
  masterTitle?: string | null;
  year?: number | null;
}

/**
 * Get a specific student. Requires Administrator role or that a connection exists
 */
export const getStudent = async (studentId: number): Promise<Student> => {
  const response = await getAuth(`/students/${studentId}`);
  const json = await response.json();
  const student = json as Student;
  return student;
}

/**
 * Update a specific student. Requires Administrator role
 */
export const updateStudent = async (studentId: number, dto: UpdateStudentDto): Promise<Student> => {
  const response = await putAuth(`/students/${studentId}`, dto);
  const json = await response.json();
  const student = json as Student;
  return student;
}

/**
 * Get the currently signed in student
 */
export const getMe = async (): Promise<Student> => {
  const response = await getAuth('/students/me');
  const json = await response.json();
  const student = json as Student;
  return student;
}

/**
 * Update the signed in student
 */
export const updateMe = async (dto: UpdateStudentDto): Promise<Student> => {
  const response = await putAuth('/students/me', dto);
  const json = await response.json();
  const student = json as Student;
  return student;
}
