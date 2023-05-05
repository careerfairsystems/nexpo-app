import { format } from "date-fns";
import { postAuth } from "./_HttpHelpers";

export interface Message {
  title: string;
  content: string;
  date: string;
  time: string;
  receiver: string;
  sender: string;
}

export const sendMessage = async (message: Message) => {
  await postAuth("/messages", message);
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
  
