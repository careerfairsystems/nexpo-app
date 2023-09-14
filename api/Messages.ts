import { format } from "date-fns";
import { putAuth } from "./_HttpHelpers";

export interface Message {
  title: string;
  message: string;
  topic: string;
}

export const sendNotification = async (message: Message) => {
  await putAuth("/notification", message);
};

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
  
