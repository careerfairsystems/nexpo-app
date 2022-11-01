import { getAuth, putAuth } from '../http/_HttpHelpers'; 

export enum SwedishProgramme {
  Brandingenjör,
  Maskinteknik_Teknisk_Design,
  Elektroteknik,
  Ekosystemteknik,
  Maskinteknik,
  Nanoveteknik,
  Bioteknik,
  Industridesign,
  Arkitekt,
  Informations_och_Kommunikationsteknik,
  Kemiteknik,
  Byggteknik_med_Järnvägsteknik,
  Väg_och_vatttenbyggnad,
  Byggteknik_med_arkitektur,
  Industriell_ekonomi,
  Teknisk_Matematik,
  Medicinteknik,
  Lantmäteri,
  Datateknik,
  Teknisk_Fysik,
  Byggteknik_med_väg_och_trafikteknik
}
export enum Programme {
  Fire_engineer,
  Mechanical_engineering_with_technical_design,
  Electrical_engineering,
  Ecological_engineering,
  Mechanical_engineering,
  Engineering_Nanoscience,
  Engineering_Biotechnology,
  Industrial_design,
  Architecture,
  Engineering_Information_and_comunication,
  Chemical_engineering,
  Construction_and_Railway_construction,
  Road_and_Water_construction,
  Construction_and_architecture,
  Industrial_economics,
  Engineering_Mathematics,
  Medical_engineering,
  Land_surveying,
  Computer_Software_engineering,
  Engineering_Physcics,
  Construction_and_road
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
