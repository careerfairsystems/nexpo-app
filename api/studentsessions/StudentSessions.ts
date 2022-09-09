import { get, putAuth } from "../http/_HttpHelpers";
import { addDays, format, isAfter, subDays } from "date-fns";

export interface StudentSessionTimeslot {
  id: number;
  start: Date;
  end: Date;
  location: string;
  studentId: number | null;
  companyId: number;
}

export const getAllTimeslots = async (): Promise<StudentSessionTimeslot[]> => {
  const response = await get("/events");
  const json = await response.json();
  const Timeslots = json as StudentSessionTimeslot[];
  return Timeslots;
};
export const getTimeslot = async (timeslotId: number): Promise<StudentSessionTimeslot> => {
  const response = await get(`/events/${timeslotId}`);
  const json = await response.json();
  const Timeslots = json as StudentSessionTimeslot;
  return Timeslots;
};
export const updateTimeslot = async (timeslotId: number, studentId: number | null): Promise<StudentSessionTimeslot> => {
  const response = await putAuth(`/timeslot/${timeslotId}`, studentId);
  const json = await response.json();
  const timeslot = json as StudentSessionTimeslot;
  return timeslot;
}
export const getTimeslotsByCompanyId = async (companyId: number): Promise<StudentSessionTimeslot[]> => {
  const response = await get(`/StudentSessionTimeslots/${companyId}`);
  const json = await response.json();
  const Timeslots = json as StudentSessionTimeslot[];
  return Timeslots;
};

export function formatTime(start: Date, end: Date): string {
  try {
    const clock: string = start.toLocaleTimeString + " - " + end.toLocaleTimeString
    const dateString = format(start, "LLL d") + "  :  " + clock;
    dateString + "  :  " + clock;
    return dateString;
  } catch (RangeError) {
    return "";
  }
}