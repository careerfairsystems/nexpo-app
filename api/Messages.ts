import { format } from "date-fns";
import { getAuth, postAuth, putAuth } from "./_HttpHelpers";

export interface Message {
  title: string;
  message: string;
  topic: string;
}

export const sendNotification = async (message: Message) => {
  try {
    const response = await putAuth("/notification", message);
    if (!response.ok) {
      throw new Error('Server responded with an error: ' + response.status);
    }
    // Log the full response body for debugging
    const responseBody = await response.json();
    console.log("Server response body:", responseBody);
    console.log("Notification sent to server successfully");
  } catch (error) {
    console.error("Failed to send notification", error);
  }
};




export const getNotifications = async (): Promise<Message[]> => {
  const response = await getAuth('/notification');
  const json = await response?.json();
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
  
