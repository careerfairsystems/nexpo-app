import { get, getAuth, postAuth, putAuth } from "../http/_HttpHelpers";
import { addDays, format, isAfter, subDays } from "date-fns";

export interface SSTimeslot {
  id: number;
  start: Date;
  end: Date;
  location: string;
  studentId: number | null;
  companyId: number;
}
export const getTimeslot = async (timeslotId: number): Promise<SSTimeslot> => {
  const response = await get(`/timeslots/${timeslotId}`);
  const json = await response.json();
  const Timeslots = json as SSTimeslot;
  return Timeslots;
};
export const updateTimeslot = async (timeslotId: number, studentId: number | null): Promise<SSTimeslot> => {
  const response = await putAuth(`/timeslots/${timeslotId}`, studentId);
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


export function formatTime(start: Date, end: Date): string {
  try {
    const st = new Date(start.toString());
    const en = new Date(end.toString());
    const clock: string = st.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) + " - " + en.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    const dateString = format(st, "LLL d") + "  :  " + clock;
    return dateString;
  } catch (RangeError) {
    return "";
  }
}