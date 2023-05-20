import { format } from "date-fns";
import { getAuth, putAuth } from "./_HttpHelpers";

// export interface Message {
//   title: string;
//   content: string;
//   date: string;
//   time: string;
//   receiver: string;
//   sender: string;
// }

export interface Message { // Currently used as backend DTO is nit updated to the following above
  title: string;
  message: string;
  date: string;
}

export const sendMessage = async (message: Message) => {
  const response = await putAuth("/notification", message);
  return response;
};

export const getMessages = async () => {
  const response = await getAuth("/notification");
  const json = await response.json();
  const messages = json as Message[];
  return messages;
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
  
