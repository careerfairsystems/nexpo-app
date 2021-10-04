import { deleteAuth, getAuth, putAuth } from '../http/HttpHelpers';
import { Ticket } from '../tickets';

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

export const getRegisteredEvents = async (tickets: Ticket[]): Promise<ListedEvent[]> => {
  const events: ListedEvent[] = await getAllEvents();
  const regEvents: ListedEvent[] = [];

  if(tickets == undefined || events == undefined) {
    return regEvents;
  }

  for(let i1 = 0; i1 < tickets.length; i1++) {
    for(let i2 = 0; i2 < events.length; i2++) {
      if(tickets[i1].event_id == events[i2].id) {
        regEvents.push(events[i2]);
      }
    }
  }
  return regEvents;
}