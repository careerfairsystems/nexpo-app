import { getAuth, putAuth } from '../http/_HttpHelpers';
import { StudentSessionTimeslot } from '../studentsessions';
import { User } from '../users';

export interface PublicCompanyDto {
  id: number;
  name: string;
  description: string | null;
  didYouKnow: string | null;
  website: string | null;
  logoUrl: string | null;
}

export interface Company extends PublicCompanyDto {
  hostName: string | null;
  hostEmail: string | null;
  hostPhone: string | null;
  representatives: User[] | null;
  studentSessionTimeslots: StudentSessionTimeslot[] | null;
}

export interface UpdateCompanySelfDto {
  description?: string | null;
  didyouknow?: string | null;
  website?: string | null;
}

export interface UpdateCompanyDto extends UpdateCompanySelfDto {
  hostName?: string | null;
  hostEmail?: string | null;
  hostPhone?: string | null;
}

/**
 * Get all companies
 */
export const getAll = async (): Promise<PublicCompanyDto[]> => {
  const response = await getAuth('/companies');
  const json = await response.json();
  const companies = json as PublicCompanyDto[];
  return companies;
}

/**
 * Get a single company
 */
export const getCompany = async (companyId: number): Promise<PublicCompanyDto> => {
  const response = await getAuth(`/companies/${companyId}`);
  const json = await response.json();
  const company = json as PublicCompanyDto;
  return company;
}

/**
 * Update a company. Requires Administrator role
 */
export const updateCompany = async (companyId: number, dto: UpdateCompanyDto): Promise<Company> => {
  const response = await putAuth(`/companies/${companyId}`, dto);
  const json = await response.json();
  const company = json as Company;
  return company;
}

/**
 * Get the currently signed in company
 */
export const getMe = async (): Promise<Company> => {
  const response = await getAuth('/companies/me');
  const json = await response.json();
  const company = json as Company;
  return company;
}

/**
 * Update the signed in company
 */
export const updateMe = async (dto: UpdateCompanySelfDto): Promise<Company> => {
  const response = await putAuth('/companies/me', dto);
  const json = await response.json();
  const company = json as Company;
  return company;
}

export const filterData = (query: string, data: PublicCompanyDto[] | null) => {
  if(!data) return null;
  if (!query) {
    return data;
  } else {
    return data.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()));
  }
};
