import { format } from "date-fns";
import { getAuth, postAuth, putAuth, deleteAuth } from "./_HttpHelpers";

//
/* GET /api/Notifications: fetchar alla notiser
GET /api/Notifications/{id}: fetchar specifik notis från id
POST /api/Notifications: skapar ny notis
PUT /api/Notifications/{id}: uppdatera en existerande notis
DELETE /api/Notifications/{id}: radera notis
GET /api/Notifications/User/{userId}:fetcha alla notiser till särskild användare
POST /api/Notifications/Subscribe: Subscribar till en notis? ska vara till en topic
POST /api/Notifications/Unsubscribe: se ovan
POST /api/Notifications/Schedule: schemalägg notis */
export interface Message {
  id: number;
  title: string;
  message: string;
  notificationType: string;
  eventId: number | null;
}
export const getAllNotifications = async () => {
  const response = await getAuth('/notification');
  if(!response.ok) {
    throw new Error('Could not fetch all notifications: ' + response.status);
  }
  const responseBody = await response.json();
  return responseBody;
}; 

export const getNotification = async (id: number) => {
  const response = await getAuth(`/notification/${id}`);
  if (!response.ok) {
    throw new Error("Could not fetch notification: " + response.status);
  }
  const responseBody = await response.json();
  return responseBody;
};
export const createNotification = async (message: Message) => {
  const response = await postAuth("/notification", message);
  if (!response.ok) {
    throw new Error("Could not create notification: " + response.status);
  }
  const responseBody = await response.json();
  return responseBody;
};

export const updateNotification = async (message: Message) => {
  const response = await putAuth(`/notification/${message.id}`, message);
  if (!response.ok) {
    throw new Error("Could not update notification: " + response.status);
  }
  const responseBody = await response.json();
  return responseBody;
}
export const deleteNotification = async (id: number) => {
  const response = await deleteAuth(`/notification/${id}`);
  if (!response.ok) {
    throw new Error("Could not delete notification: " + response.status);
  }
  const responseBody = await response.json();
  return responseBody;
}
export const getUserNotifications = async (userId: number) => {
  const response = await getAuth(`/notification/user/${userId}`);
  if (!response.ok) {
    throw new Error("Could not fetch user notifications: " + response.status);
  }
  const responseBody = await response.json();
  return responseBody;
}

export const subscribeNotification = async (userId: number, topic: string) => {
  const response = await postAuth("/notification/subscribe", { userId, topic });
  if (!response.ok) {
    throw new Error("Could not subscribe to notification: " + response.status);
  }
  const responseBody = await response.json();
  return responseBody;
}

export const unsubscribeNotification = async (userId: number, topic: string) => {
  const response = await postAuth("/notification/unsubscribe", { userId, topic });
  if (!response.ok) {
    throw new Error("Could not unsubscribe from notification: " + response.status);
  }
  const responseBody = await response.json();
  return responseBody;
}

export const scheduleNotification = async (message: Message, time: Date) => {
  const response = await postAuth("/notification/schedule", { message, time });
  if (!response.ok) {
    throw new Error("Could not schedule notification: " + response.status);
  }
  const responseBody = await response.json();
  return responseBody;
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
  
