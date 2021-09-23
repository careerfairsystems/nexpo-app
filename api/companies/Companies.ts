import { getAuth } from '../http/HttpHelpers';

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
  const companies = <Company[]>json.data;
  return companies;
}
