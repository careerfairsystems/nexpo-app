import { get, getAuth, putAuth } from "./HttpHelpers";
import { format } from "date-fns";
import { PublicCompanyDto } from "./Companies";

export interface SSTimeslot {
  id: number;
  start: Date;
  end: Date;
  location: string;
  studentId: number | null;
  companyId: number;
}
export const getTimeslot = async (timeslotId: number): Promise<SSTimeslot> => {
  const response = await getAuth(`/timeslots/${timeslotId}`);
  const json = await response.json();
  const Timeslots = json as SSTimeslot;
  return Timeslots;
};
export const bookTimeslot = async (timeslotId: number): Promise<SSTimeslot> => {
  const response = await putAuth(`/timeslots/book/${timeslotId}`, {});
  const json = await response.json();
  const timeslot = json as SSTimeslot;
  return timeslot;
}
export const unbookTimeslot = async (timeslotId: number): Promise<SSTimeslot> => {
  const response = await putAuth(`/timeslots/unbook/${timeslotId}`, {});
  const json = await response.json();
  const timeslot = json as SSTimeslot;
  return timeslot;
}
export const getTimeslotsByCompanyId = async (companyId: number): Promise<SSTimeslot[]> => {
  const response = await getAuth(`/timeslots/company/${companyId}`);
  const json = await response.json();
  const Timeslots = json as SSTimeslot[];
  return Timeslots;
};
export const getCompaniesWithTimeslots = async (): Promise<PublicCompanyDto[]> => {
  const response = await getAuth(`/timeslots/companies`);
  const json = await response.json();
  const companies = json as PublicCompanyDto[];
  return companies;
};

export function formatTime(start: Date, end: Date): string {
  try {
    const st = new Date(start.toString());
    const en = new Date(end.toString());
    const startString = format(st, "HH:mm");
    const endString = format(en, "HH:mm");
    const clock: string = `${startString} - ${endString}`;
    const dateString = format(st, "LLL d") + "  :  " + clock;
    return dateString;
  } catch (RangeError) {
    return "";
  }
}