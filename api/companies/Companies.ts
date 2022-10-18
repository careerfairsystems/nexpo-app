import { getAuth, putAuth } from '../http/_HttpHelpers';
import { Guild } from '../students';
import { SSTimeslot } from '../studentsessions';
import { User } from '../users';

export enum Degree {
  Bachelor, Master, PhD
}

export enum Position {
  Thesis, TraineeEmployment, Internship, SummerJob, ForeignOppurtunity, PartTime
}

export enum Industry {

  ElectricityEnergyPower, Environment, BankingFinance, Union, Investment, Insurance, Recruitment, Construction, Architecture,
  GraphicDesign, DataIT, FinanceConsultancy, Telecommunication, Consulting, Management, Media, Industry, NuclearPower, LifeScience,
  MedicalTechniques, PropertyInfrastructure, Research, Coaching
}

export interface PublicCompanyDto {
  id: number;
  name: string;
  description: string | null;
  didYouKnow: string | null;
  website: string | null;
  logoUrl: string | null;
  desiredDegress: Degree[] | null;
  desiredGuilds: Guild[] | null;
  positions: Position[] | null;
  industries: Industry[] | null;
}

export interface Company extends PublicCompanyDto {
  hostName: string | null;
  hostEmail: string | null;
  hostPhone: string | null;
  representatives: User[] | null;
  ssTimeslots: SSTimeslot[] | null;
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

export const filterData = (query: string, data: PublicCompanyDto[] | null, filterPos: number[] | null, filterInd: number[] | null) => {
  if(!data) return null;
  else if((!filterPos || filterPos.length <= 0) && (!filterInd || filterInd.length <= 0) && !query) return data; //nothing to filter
  else if((!filterInd || filterInd.length <= 0) && query && (!filterPos || filterPos.length <= 0)) { //only filter on query
    return data.filter((d) => (d.name.toLowerCase().includes(query.toLowerCase())));
  }
  else if(filterPos && filterPos.length > 0 && !query && (!filterInd || filterInd.length <= 0)) { //only filter on positions
    return data.filter((d) => (d.positions && d.positions.some((r) => filterPos.includes(r))));
  }
  else if(filterInd && filterInd.length > 0 && !query && (!filterPos || filterPos.length <= 0)) { //only filter on industries
    return data.filter((d) => (d.industries && d.industries.some((r) => filterInd.includes(r))));
  }
  else {
    return data.filter((d) => (d.name.toLowerCase().includes(query.toLowerCase()))
    && (d.positions && filterPos && filterPos.length > 0 && d.positions.some((r) => filterPos.includes(r)))
    && (d.industries && filterInd && filterInd.length > 0 && d.industries.some((r) => filterInd.includes(r))))
  }
}