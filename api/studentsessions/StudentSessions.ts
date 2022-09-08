import { get } from "../http/_HttpHelpers";
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