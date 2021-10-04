import { apiUrl, getAuth } from '../http/HttpHelpers';

export interface Company {
  id: number,
  name: string,
  description: string
  website: string,
  logo_url: string,
  top_students: string[],
  student_session_days: string,
  host_phone_number: string,
  host_name: string,
  host_mail: string,
}

export const getAll = async (): Promise<Company[]> => {
  const response = await getAuth('/companies');
  const json = await response.json();
  const companies = json.data as Company[];
  return companies;
}

export const getCompany = async (companyId: number): Promise<Company> => {
  // No the most beautiful way but this is how the backend works, you can only get all companies
  const companies = await getAll();
  const company = companies.find(c => c.id === companyId) as NonNullable<Company>;
  return company;
}

export const getLogo = (companyId: number): string => {
  return apiUrl(`/company/logo/${companyId}`);
}
