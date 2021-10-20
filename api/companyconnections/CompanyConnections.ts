import { deleteAuth, getAuth, postAuth, putAuth } from "../http/_HttpHelpers"

export interface StudentCompanyConnectionDto {
  id: number;
  companyId: number;
}

export interface CompanyCompanyConnectionDto {
  id: number;
  studentId: number;
  rating: number;
  comment: string;
}

export interface CreateCompanyConnectionDto {
  studentId: number;
  rating: number;
  comment: string;
}

export interface UpdateCompanyConnectionDto {
  rating: number;
  comment: string;
}

/**
 * Create a new connection
 */
export const createConnection = async (dto: CreateCompanyConnectionDto): Promise<CompanyCompanyConnectionDto> => {
  const response = await postAuth('/companyconnections', dto);
  const json = await response.json();
  const connection = json as CompanyCompanyConnectionDto;
  return connection;
}

/**
 * Get all conenctions as company
 */
export const getConenctionsAsCompany = async (): Promise<CompanyCompanyConnectionDto[]> => {
  const response = await getAuth('/companyconnections/company');
  const json = await response.json();
  const connections = json as CompanyCompanyConnectionDto[];
  return connections;
}

/**
 * Get all conenctions as company
 */
export const getConenctionsAsStudent = async (): Promise<StudentCompanyConnectionDto[]> => {
  const response = await getAuth('/companyconnections/student');
  const json = await response.json();
  const connections = json as StudentCompanyConnectionDto[];
  return connections;
}

/**
 * Update a company connection. Requires CompanyRepresentative role
 */
export const updateConnection = async (connectionId: number, dto: UpdateCompanyConnectionDto): Promise<CompanyCompanyConnectionDto> => {
  const response = await putAuth(`/companyconnections/${connectionId}`, dto);
  const json = await response.json();
  const connection = json as CompanyCompanyConnectionDto;
  return connection;
}

/**
 * Remove a company connection. Both Students and CompanyRepresentatives can do this
 */
export const removeConnection = async (connectionId: number): Promise<boolean> => {
  const response = await deleteAuth(`/companyconnections/${connectionId}`);
  return response.ok;
}
