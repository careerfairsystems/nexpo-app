import { getAuth } from '../http/_HttpHelpers';

export interface Company {
  id: number,
  name: string,
  description: string
  website: string,
  logoUrl: string
}

export const getAll = async (): Promise<Company[]> => {
  const response = await getAuth('/companies');
  const json = await response.json();
  const companies = json as Company[];
  return companies;
}

export const getCompany = async (companyId: number): Promise<Company> => {
  const response = await getAuth(`/companies/${companyId}`);
  const json = await response.json();
  const company = json as Company;
  return company;
}
