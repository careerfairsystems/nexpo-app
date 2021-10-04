import { deleteAuth, getAuth, putAuth } from '../http/HttpHelpers';

export interface ListedEvent {
  start: string,
  name: string,
  location: string,
  id: number,
  end: string,
  date: string,
  capacity: number,
  tickets: number,
}

export interface SingleEvent {
  tickets: number,
  start: string,
  name: string,
  location: string,
  id: number,
  event_info: {
    capacity: number,
    language: string,
    id: number,
    host: string,
    description: string
  },
  end: string,
  date: string,
}

export function fillMissingAttributes(event: SingleEvent) {
  if(event.date == undefined) {
    event.date = "asd"
  }
  
}

export const getAllEvents = async (): Promise<ListedEvent[]> => {
  const response = await getAuth('/events');
  const json = await response.json();
  const events = <ListedEvent[]>json.data;
  return events;
}

export const getSingleEvent = async (id: number): Promise<SingleEvent> => {
  const response = await getAuth('/event/' + id);
  const json = await response.json();
  const event = <SingleEvent>json.data;
  return event;
}