import { format } from "date-fns";

export type Message = {
    id: number;
    title: string;
    content: string;
    date: string;
    time: string;
    sender: string;
}

export function formatTime(date: string, time: string): string {
    if (date == "") {
      return "";
    }
    var d: Date = new Date(date);
    try {
      const dateString = format(d, "LLL d") + "  :  " + time;
      return dateString;
    } catch (RangeError) {
      return "";
    }
  }
  
