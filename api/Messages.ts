import { format } from "date-fns";
import { getAuth, putAuth } from "./_HttpHelpers";

export interface Message {
  title: string;
  message: string;
  topic: string;
}

export const sendNotification = async (message: Message) => {
  await putAuth("/notification", message);
};

export const getNotifications = async (): Promise<Message[]> => {
  const response = await getAuth('/notification');
  const json = await response.json();
  const messages = json as Message[];
  return messages;
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
  
